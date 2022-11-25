import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Button,
} from "reactstrap";
import { FaFilter, FaFileUpload, } from 'react-icons/fa';

import DataTable from "components/Helpers/DataTable-temp";
import InfoModal from "components/Helpers/InfoModal";
import {
    ConfirmAction,
} from 'store/actions/helpers/alertAction';
import { ArrangeName, GetAge, ArrangeAddress, } from 'store/actions/helpers/displayAction.js';
import {
    ArrangeEducation, ArrangeTrianing, ArrangeExperience, ArrangeEligibility, UpdateRemarksLocal, UpdateJobPost, UpdateStatus, SetSelectedApplicant, UpdateJobPostStage,
    AddApplicant, TempUpdateJobPost, GetApplicantsWhoApply, SetApplicantAppliedToJP,
} from '../../redux/actions';
import ReactToExcel from 'react-html-table-to-excel';
import UploadNotice from './UploadNotice';
import RatingForm from './RatingForm';
import AddApplicantForm from './AddApplicantForm';


class ApplicantsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sort: {
                name: "Applicant",
                type: "up",
                prop: "name.last"
            },
            timer: null,

            modalNotice: false,
            modalRating: false,
            currApplicant: null,
            modalAddApplicant: false,

            modalAppliedApplicantTemp: false,
            applicantTempID: null,

            nav: 1,

            headers: {
                Applicant: { active: true, add: 10, add2: 1, active: true, prio: 6, width: 9 },
                Age: { active: true, add: 10, add2: 1, active: true, prio: 8, width: 4 },
                Gender: { active: true, add: 10, add2: 1, active: true, prio: 9, width: 5 },
                Eligibility: { active: true, add: 10, add2: 1, active: true, prio: 2, width: 8 },
                Education: { active: true, add: 10, add2: 1, active: true, prio: 1, width: 11 },
                "Relevant Training": { active: true, add: 10, add2: 1, active: true, prio: 3, width: 15 },
                "Relevant Experience": { active: true, add: 10, add2: 1, active: true, prio: 4, width: 15 },
                "Position applied": { active: true, add: 10, add2: 1, active: true, prio: 10, width: 9 },
                "Contact Info": { active: true, add: 10, add2: 1, active: true, prio: 7, width: 8 },
                Remarks: { active: true, add: 10, add2: 1, active: true, prio: 5, width: 9 },
            },
            modalTitles: ["Invitation to the NEDA Technical Entrance Examination", "Invitation to the NEDA JS and BEI", "Invitation to the NEDA JS and BEI", "Invitation to the NEDA Final Interview", "Letter of Appointment", "Letter of Appointment"],
            modalTypes: ["ntee", "jsbei", "jsbei", "final", "appointment", "appointment"],
            stages: ["submitted", "qualified", "exam", "comparative", "final", "selected", "selected"],
            modalTitle: "",
            modalType: "",
            excessWidth: 0,
            actives: 10,
        };


        this.SortTable = this.SortTable.bind(this);
        this.GetTableHeader = this.GetTableHeader.bind(this);
        this.GetObjValue = this.GetObjValue.bind(this);
        this.SaveUpdatedRemarks = this.SaveUpdatedRemarks.bind(this);
        this.SetTimer = this.SetTimer.bind(this);
        this.ToggleNav = this.ToggleNav.bind(this);
        this.NavItem = this.NavItem.bind(this);
        this.UpdateHeaders = this.UpdateHeaders.bind(this);
        this.ToggleUploadNoticeModal = this.ToggleUploadNoticeModal.bind(this);
        this.ToggleRatingModal = this.ToggleRatingModal.bind(this);
        this.ToggleAddApplicantModal = this.ToggleAddApplicantModal.bind(this);
        this.ToggleAppliedApplicantTemp = this.ToggleAppliedApplicantTemp.bind(this);

        props.GetApplicantsWhoApply(props.JobPost.values._id);
    }

    UpdateHeaders(text, bool) {


        this.setState({
            headers: {
                ...this.state.headers,
                [text]: {
                    ...this.state.headers[text],
                    active: bool
                }
            },
            excessWidth: this.state.excessWidth - ((!bool) ? -this.state.headers[text].width : this.state.excessWidth),
            actives: this.state.actives + ((bool) ? 1 : -1),
        })
    }

    ToggleAppliedApplicantTemp(applicant, index) {
        this.setState({
            modalAppliedApplicantTemp: !this.state.modalAppliedApplicantTemp,
            applicantTempID: { ...applicant, index: index }
        })
    }

    ToggleAddApplicantModal(applicant) {
        this.setState({
            modalAddApplicant: !this.state.modalAddApplicant,
        })
    }

    ToggleRatingModal(applicant) {
        this.setState({
            modalRating: !this.state.modalRating,
            currApplicant: applicant,
        })
    }

    ToggleUploadNoticeModal(applicant, title, modalType) {
        this.setState({
            modalNotice: !this.state.modalNotice,
            currApplicant: applicant,
            modalTitle: title,
            modalType: modalType,
        })
    }

    ToggleNav(e) {
        this.setState({
            nav: e.target.attributes.ariaControls.value * 1
        })
    }

    SetTimer() {
        this.setState({
            timer: setTimeout((e) => {
                this.SaveUpdatedRemarks()
            }, 3000)
        })
    }

    SaveUpdatedRemarks() {
        this.props.UpdateJobPost(this.props.JobPost.values);
    }

    GetObjValue(obj, prop) {
        console.log(prop);
        prop = prop.split(".");

        var nextInd = prop.shift();
        console.log("___________________________");
        console.log(prop);
        console.log(obj);
        console.log(nextInd);

        if (prop.length > 0) {
            return this.GetObjValue(obj[nextInd], prop.join("."));
        } else {
            return (nextInd == "date") ? new Date(obj[nextInd]) : (obj[nextInd] == null) ? "" : obj[nextInd];
        }
    }


    SortTable(e) {
        var cond = (this.state.sort.type == "up") ? 1 : -1
        var sorted = [...this.props.JobPost.values.applicants];
        // sorted.sort((a, b) => {
        //     var a = this.GetObjValue(a.applicant, this.state.sort.prop);
        //     var b = this.GetObjValue(b.applicant, this.state.sort.prop);


        //     if (a < b) {
        //         return cond * -1;
        //     }
        //     if (a > b) {
        //         return cond;
        //     }


        //     return 0;
        // });

        return sorted;
    }

    GetTableHeader(name, width, prop = "none") {
        var exc = this.state.excessWidth / this.state.actives;

        return (
            <td style={{ width: (width + exc) + "%" }} className="td-header clickable" onClick={(e) => {

                if (e.target.nodeName == "TD") {
                    var type = "up";

                    if (e.target.children.length > 0) {
                        type = (e.target.children[0].className == "ni ni-bold-up") ? "down" : "up";
                    }

                    this.setState({
                        sort: {
                            name: e.target.innerHTML.split("<")[0],
                            type: type,
                            prop: prop,
                        }
                    });

                }

            }}>
                {name}
                {
                    (this.state.sort.name == name)
                        ? <i className={"ni ni-bold-" + this.state.sort.type} onClick={(e) => {

                            this.setState({
                                sort: {
                                    name: e.target.parentNode.innerText,
                                    type: (e.target.className == "ni ni-bold-up") ? "down" : "up",
                                    prop: prop,
                                }
                            })

                        }}></i>
                        : ""
                }
            </td>
        )
    }

    NavItem(text, val) {
        return (
            <li className="nav-item">
                <a className={"clickable nav-link mb-0 px-0 py-1 " + ((this.state.nav == val) ? "active" : "")} role="tab" ariaControls={val} ariaSelected={(this.state.nav == val) ? "true" : "false"}
                    onClick={this.ToggleNav}
                >
                    {text}
                </a>
            </li>

        );
    }

    GetGrandTotal({ js, bei, essay, studies, honor, awards, work }) {
        return (js.r * js.w) + (bei.r * bei.w) + (essay.r * essay.w) + studies + honor + awards + work;
    }

    Rank(arr) {
        const sorted = [...new Set(arr)].sort((a, b) => b - a);
        const rank = new Map(sorted.map((x, i) => [x, i + 1]));
        return arr.map((x) => rank.get(x));
    }


    render() {
        console.log("AAAAAA");
        console.log(this.props.JobPost.values.applicants);
        var sortedApplicants = this.SortTable();
        var x_timer;

        var hKeys = Object.keys(this.state.headers);

        var colSpanMain = this.state.actives + 1;
        var colSpanF = (this.state.actives % 2 == 0) ? this.state.actives / 2 : ((this.state.actives + 1) / 2);
        var colSpanS = (this.state.actives % 2 == 0) ? this.state.actives / 2 : ((this.state.actives + 1) / 2);

        var isFinal = true;

        var { values, toAddApplicants } = this.props.JobPost;
        var coveredStage = this.state.nav <= (this.state.stages.indexOf(values.stage) + 1);

        //submitted, qualified, exam, comparative, final, selected
        if (this.state.nav == 1 && (!values.hasOwnProperty("stage") || (values.hasOwnProperty("stage") && values.stage == "submitted"))) isFinal = false;
        else if (this.state.nav == 2 && values.stage == "qualified") isFinal = false;
        else if (this.state.nav == 3 && values.stage == "exam") isFinal = false;
        else if (this.state.nav == 4 && values.stage == "comparative") isFinal = false;
        else if (this.state.nav == 5 && values.stage == "final") isFinal = false;
        else if (this.state.nav == 6 && values.stage == "selected") isFinal = false;


        if (this.state.nav == 4 || this.state.nav == 5) { //if comparative assessment na
            var { applicants } = this.props.JobPost.values;
            var rankedApplicants = [], tempRank = [];
            var ids = [], scores = [], rank;
            applicants.map(app => {
                if (app.status == "selected" || app.status == "top" || app.status == "exam-passer") {
                    rankedApplicants.push(app);
                    ids.push(app.applicant._id);
                    scores.push((app.ratings) ? this.GetGrandTotal(app.ratings) : 0);
                }
            });

            rank = this.Rank(scores);

            var idsWRank = [];

            ids.map((id, i) => {

                idsWRank.push(rank[i] + "|-|" + id);
            });

            idsWRank = idsWRank.sort();
            idsWRank.map((id, i) => {
                id = id.split("|-|");
                rankedApplicants.map((app) => {
                    if (id[1] == app.applicant._id) {
                        tempRank[i] = {
                            ...app,
                            rank: id[0] * 1
                        };
                    }
                })
            })

            sortedApplicants = tempRank;

        }

        var allUploaded = true;

        var counter = 0;
        console.log("________________________!!!!!!!!!!!!");
        console.log(this.props.JobPost.tempApplicants);

        var temp1, temp2, temp3;
        return (
            <div id="application-form-div">

                {
                    (this.props.JobPost.tempApplicants.length > 0)
                        ? <InfoModal
                            size={"50%"}
                            modal={this.state.modalAppliedApplicantTemp}
                            toggle={this.ToggleAppliedApplicantTemp}
                            title={"Applicants Related"}
                            form={
                                <Fragment>
                                    <div style={{ width: "100%" }}>
                                        <table style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.props.JobPost.tempApplicants.map((a, i) => {
                                                        temp1 = false;
                                                        temp3 = false;
                                                        if (this.state.applicantTempID) {
                                                            a.appliedJobs.map((aj) => {
                                                                if (typeof aj.date == "string" && typeof this.state.applicantTempID.date == "string") {
                                                                    if (aj.date.split(".")[0] == this.state.applicantTempID.date.split(".")[0]) {
                                                                        temp1 = true;
                                                                        temp2 = a;
                                                                    }

                                                                }
                                                            });
                                                        }

                                                        console.log("**********************+++++++++++++++++++++++++++++");
                                                        console.log(sortedApplicants);
                                                        console.log(a);

                                                        sortedApplicants.map((sa) => {
                                                            if (sa.applicant.hasOwnProperty("_id") && sa.applicant._id == a._id) {
                                                                temp3 = true;
                                                            }
                                                        })

                                                        return (!temp3)?(
                                                            <tr key={i + "JPTA"} className={temp1 ? "clickable" : ""}
                                                                style={temp1 ? { backgroundColor: "yellow" } : {}}
                                                                onClick={(e) => {
                                                                    if (temp1) {
                                                                        console.log(a._id);
                                                                    }
                                                                }}
                                                            >
                                                                <td>{i + 1}</td>
                                                                <td>{a.name.last + ", " + a.name.first}</td>
                                                                <td>
                                                                    <Button
                                                                        onClick={(e) => {
                                                                            console.log("#########");
                                                                            console.log();
                                                                            this.props.SetApplicantAppliedToJP(a, this.state.applicantTempID);
                                                                        }}
                                                                    >
                                                                        Assign
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ):""
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </Fragment>
                            }
                            buttons={[]}
                        />
                        : ""
                }


                <InfoModal
                    size={"80%"}
                    modal={this.state.modalNotice}
                    toggle={this.ToggleUploadNoticeModal}
                    title={this.state.modalTitle || ""}
                    form={<UploadNotice applicant={this.state.currApplicant} type={this.state.modalType} />}
                    buttons={[]}
                />

                <InfoModal
                    size={"30%"}
                    modal={this.state.modalAddApplicant}
                    toggle={this.ToggleAddApplicantModal}
                    title={"Add Applicant"}
                    form={<AddApplicantForm />}
                    buttons={[{
                        type: "Add",
                        // disable: !(toAddApplicants.applicants.length > 0 && toAddApplicants.memo != "" && toAddApplicants.file != null),
                        callback: () => {
                            this.props.AddApplicant();
                        }
                    }]}
                />

                <InfoModal
                    size={"80%"}
                    modal={this.state.modalRating}
                    toggle={this.ToggleRatingModal}
                    title={"Scores (" + ((this.state.currApplicant != null && this.state.currApplicant.hasOwnProperty("applicant")) ? this.props.ArrangeName(this.state.currApplicant.applicant.name) : "") + ")"}
                    form={<RatingForm applicant={this.state.currApplicant} />}
                    buttons={[]}
                />

                <Row className="nav-area">
                    <Col lg="10">
                        <div className="nav-wrapper position-relative end-0">
                            <ul className="nav nav-pills nav-fill p-1" role="tablist">

                                {this.NavItem("Submitted", 1)}
                                {this.NavItem("Qualified", 2)}
                                {this.NavItem("Exam Passer", 3)}
                                {this.NavItem("Comparative Assesement", 4)}
                                {this.NavItem("Final Interview", 5)}
                                {this.NavItem("Selected", 6)}
                            </ul>
                        </div>
                    </Col>
                    <Col lg="2" id="afd-filter">
                        <div style={{ marginTop: "-25px" }}>
                            <button id="applicants-react-to-excel-button"
                                onClick={this.ToggleAddApplicantModal}
                            >Add Applicant</button>
                        </div>

                        <UncontrolledDropdown style={{ marginTop: "-25px" }}>
                            <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="lg"
                                color=""
                            >
                                <FaFilter className="clickable" style={{ color: "black" }} />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                {
                                    hKeys.map((k) => {
                                        return (
                                            <p>
                                                <span>{k}</span>
                                                <input type="checkbox" checked={this.state.headers[k].active}
                                                    onChange={(e) => {
                                                        this.UpdateHeaders(k, e.target.checked);
                                                    }}
                                                ></input>
                                            </p>
                                        )
                                    })
                                }

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>

                </Row>

                <table id="applicants-form-div-table">
                    <tbody>
                        <tr>
                            <td colSpan={colSpanMain} style={{ height: "18.75pt", width: "100%" }}>Minimum Requirements for {this.props.JobPost.values.position}</td>
                            {
                                (this.state.nav == 4 || this.state.nav == 5)
                                    ? <td className="print-hide" rowSpan="4" style={{ textAlign: "center" }}> Rating </td>
                                    : ""
                            }
                            {
                                (this.props.JobPost.values.status == "selection" && coveredStage && this.state.nav < 6)
                                    ? <td className="print-hide" rowSpan="4" style={{ textAlign: "center" }}> Status </td>
                                    : ""
                            }
                            {
                                (this.props.JobPost.values.status == "selection" && coveredStage)
                                    ? <td className="print-hide" rowSpan="4" style={{ textAlign: "center" }}> File </td>
                                    : ""
                            }

                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={colSpanF}>Education&nbsp;&nbsp; :&nbsp;&nbsp; {this.props.JobPost.values.other.education.join(", ")}</td>
                            <td colSpan={colSpanS}>Experience&nbsp;&nbsp; :&nbsp;&nbsp; {this.props.JobPost.values.other.wEx}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={colSpanF}>Training&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{this.props.JobPost.values.other.training}</td>
                            <td colSpan={colSpanS}>Eligibility&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{this.props.JobPost.values.other.eligibility}</td>
                        </tr>
                        <tr>
                            <td style={{ width: "2%" }}></td>
                            {(this.state.headers["Applicant"].active) ? this.GetTableHeader("Applicant", 9, "name.last") : ""}
                            {(this.state.headers["Age"].active) ? this.GetTableHeader("Age", 4, "pds.personalInfo.birth.date") : ""}
                            {(this.state.headers["Gender"].active) ? this.GetTableHeader("Gender", 5, "pds.personalInfo.sex") : ""}
                            {(this.state.headers["Eligibility"].active) ? this.GetTableHeader("Eligibility", 8, "name.last") : ""}
                            {(this.state.headers["Education"].active) ? this.GetTableHeader("Education", 11, "name.last") : ""}
                            {(this.state.headers["Relevant Training"].active) ? this.GetTableHeader("Relevant Training", 15, "name.last") : ""}
                            {(this.state.headers["Relevant Experience"].active) ? this.GetTableHeader("Relevant Experience", 15, "name.last") : ""}
                            {(this.state.headers["Position applied"].active) ? this.GetTableHeader("Position applied", 9, "name.last") : ""}
                            {(this.state.headers["Contact Info"].active) ? this.GetTableHeader("Contact Info", 8, "name.last") : ""}
                            {(this.state.headers["Remarks"].active) ? this.GetTableHeader("Remarks", 9, "name.last") : ""}
                        </tr>

                        {/* DATA HERE */}
                        {
                            sortedApplicants.map((applicant, i) => {

                                var uploaded = false;
                                if (true) {
                                    applicant.filesFromNEDA.map((file) => {
                                        if (file.status == "current" && file.name == this.state.modalTypes[this.state.nav - 1]) {
                                            uploaded = true;
                                        }
                                    })
                                }

                                if (!uploaded) {
                                    allUploaded = false;
                                }

                                var condition = true;
                                var styleCond = (applicant.hasOwnProperty("status") && applicant.status == "qualified");
                                var curr = "", prev = "", status = "";
                                if (this.state.nav == 1) { // ALL
                                    condition = true;
                                    status = (applicant.status != "unqualified" || !applicant.hasOwnProperty("status")) ? "Qualified" : "";
                                    curr = "qualified";
                                    prev = "unqualified";
                                } else if (this.state.nav == 2) { // Qualified
                                    condition = (applicant.hasOwnProperty("status") && applicant.status != "unqualified");
                                    status = (applicant.status != "unqualified" && applicant.status != "qualified") ? "Passed" : "";
                                    curr = "exam-passer";
                                    prev = "qualified";
                                } else if (this.state.nav == 3) { // Exam Passer
                                    condition = (applicant.hasOwnProperty("status") && applicant.status != "unqualified" && applicant.status != "qualified");
                                    status = (applicant.status != "unqualified" && applicant.status != "qualified") ? "Passed" : "";
                                    curr = "exam-passer";
                                    prev = "qualified";
                                } else if (this.state.nav == 4) { // Exam Passer, here mag input sa r atings
                                    condition = (applicant.status != "unqualified" && applicant.status != "qualified");
                                    status = (applicant.status != "unqualified" && applicant.status != "qualified" && applicant.status != "exam-passer") ? "Top" : "";
                                    curr = "top";
                                    prev = "exam-passer";
                                } else if (this.state.nav == 5) { // Top
                                    condition = (applicant.status != "unqualified" && applicant.status != "qualified" && applicant.status != "exam-passer");
                                    status = (applicant.status == "selected") ? "Selected" : "";
                                    curr = "selected";
                                    prev = "top";
                                } else if (this.state.nav == 6) { // Selected
                                    condition = (applicant.status == "selected");
                                    curr = "selected";
                                    prev = "selected";
                                }

                                if (condition) {
                                    counter++;
                                }

                                if (!applicant.hasOwnProperty("applicant") || (applicant.hasOwnProperty("applicant") && applicant.applicant == null)) {
                                    applicant["applicant"] = {
                                        username: "",
                                        password: "",

                                        name: {
                                            first: "",
                                            mid: "",
                                            last: "",
                                            ext: "",
                                        },

                                        designation: "",
                                        status: "",
                                        office: null,
                                        role: null,

                                        pds: {
                                            personalInfo: {
                                                birth: {
                                                    date: null,
                                                    place: "",
                                                },
                                                citizenship: {
                                                    type: "",
                                                    by: "",
                                                    details: "",
                                                },
                                                sex: "",
                                                cStatus: "",
                                                address: [
                                                    {
                                                        block: "",
                                                        street: "",
                                                        village: "",
                                                        brgy: "",
                                                        cm: "",
                                                        province: "",
                                                        zipcode: "",
                                                    }
                                                ],
                                                height: 0,//meter
                                                weight: 0,//kg
                                                blood: "",
                                                contact: {
                                                    telephone: "",
                                                    mobile: "",
                                                    email: "",
                                                },
                                                ids: {
                                                    gsis: "",
                                                    pagibig: "",
                                                    philhealth: "",
                                                    sss: "",
                                                    tin: "",
                                                    agency: "",
                                                    other: {
                                                        name: "",
                                                        number: "",
                                                        date: null,
                                                        place: "",
                                                    },
                                                }
                                            },

                                            family: {
                                                spouse: {
                                                    first: "",
                                                    mid: "",
                                                    last: "",
                                                    ext: "",
                                                    occupation: {
                                                        name: "",
                                                        employer: "",
                                                        address: "",
                                                        telephone: "",
                                                    },
                                                },
                                                children: [{
                                                    name: "",
                                                    dob: null,
                                                }],
                                                father: {
                                                    first: "",
                                                    mid: "",
                                                    last: "",
                                                    ext: "",
                                                },
                                                mother: {
                                                    first: "",
                                                    mid: "",
                                                    last: "",
                                                },
                                            },

                                            education: [{
                                                level: "",
                                                school: "",
                                                degree: "",
                                                period: {
                                                    from: null,
                                                    to: null,
                                                },
                                                unitsEarned: "",
                                                yearGraduated: "",
                                                academicHonor: "",
                                            }],

                                            eligibility: [{
                                                name: "",
                                                rating: "",
                                                exam: {
                                                    date: null,
                                                    place: "",
                                                },
                                                license: {
                                                    number: "",
                                                    validity: null,
                                                }
                                            }],

                                            workExperience: [{
                                                inclusive: {
                                                    from: null,
                                                    to: null,
                                                },
                                                position: "",
                                                office: "",
                                                salary: {
                                                    grade: "",
                                                    amount: "",
                                                },
                                                appointment: "",
                                                isGovService: null, // 1 yes, 0 no
                                            }],

                                            voluntary: [{
                                                name: "",
                                                inclusive: {
                                                    from: null,
                                                    to: null,
                                                },
                                                hours: 0,
                                                position: "",
                                            }],

                                            trainings: [{
                                                name: "",
                                                inclusive: {
                                                    from: null,
                                                    to: null,
                                                },
                                                hours: 0,
                                                type: "",
                                                conductedBy: "",
                                            }],

                                            others: {
                                                skillsHobbies: [{
                                                    name: "",
                                                }],
                                                recognition: [{
                                                    name: ""
                                                }],
                                                membership: [{
                                                    name: ""
                                                }],
                                            },

                                            questions: { // 1 yes, 0 no
                                                consanguinity: {
                                                    third: "",
                                                    fourth: "",
                                                },
                                                adminOffense: "",
                                                charged: "",
                                                convicted: "",
                                                separated: "",
                                                candidate: "",
                                                resigned: "",
                                                immigrant: "",
                                                RAs: {
                                                    member: "",
                                                    pwd: "",
                                                    soloParent: "",
                                                },
                                            },

                                            references: [{
                                                name: "",
                                                address: "",
                                                telephone: "",
                                            }],

                                        },
                                        files: [{
                                            type: "",//profile pic, pds, etc.
                                            status: "",//current, deleted, previous
                                            dateUploaded: null,
                                            name: "",
                                            path: "",
                                        }],

                                        userID: "",
                                    };
                                }


                                return (condition) ? (
                                    <tr className={"val clickable" + ((styleCond) ? " selected" : "")}
                                        onClick={(e) => {
                                            if (e.target.className != "remarks-td" && e.target.className != "edit-area" && e.target.className != "print-hide" && e.target.nodeName != "path" && e.target.nodeName != "svg") {
                                                this.props.toggleApplicant();
                                                this.props.SetSelectedApplicant(applicant.applicant._id);
                                            }
                                        }}
                                    >
                                        <td valign="top" onClick={() => {
                                            // this.props.TempUpdateJobPost(applicant.applicant._id); //Delete Applicant
                                            this.ToggleAppliedApplicantTemp(applicant, i);

                                        }}>{counter}</td>
                                        {(this.state.headers["Applicant"].active)
                                            ? <td valign="top">{this.props.ArrangeName(applicant.applicant.name)}</td>
                                            : ""}
                                        {(this.state.headers["Age"].active)
                                            ? <td valign="top">{this.props.GetAge(applicant.applicant.pds.personalInfo.birth.date)}</td>
                                            : ""}
                                        {(this.state.headers["Gender"].active)
                                            ? <td valign="top">{applicant.applicant.pds.personalInfo.sex}</td>
                                            : ""}
                                        {(this.state.headers["Eligibility"].active)
                                            ? <td valign="top">{this.props.ArrangeEligibility(applicant.applicant.pds.eligibility)}</td>
                                            : ""}
                                        {(this.state.headers["Education"].active)
                                            ? <td valign="top">{this.props.ArrangeEducation(applicant.applicant.pds.education)}</td>
                                            : ""}
                                        {(this.state.headers["Relevant Training"].active)
                                            ? <td valign="top">{this.props.ArrangeTrianing(applicant.applicant.pds.trainings)}</td>
                                            : ""}
                                        {(this.state.headers["Relevant Experience"].active)
                                            ? <td valign="top">{this.props.ArrangeExperience(applicant.applicant.pds.workExperience)}</td>
                                            : ""}
                                        {(this.state.headers["Position applied"].active)
                                            ? <td valign="top">{this.props.JobPost.values.position}</td>
                                            : ""}
                                        {(this.state.headers["Contact Info"].active)
                                            ? <td valign="top">
                                                <p>{applicant.applicant.pds.personalInfo.contact.email}</p>
                                                <p>{applicant.applicant.pds.personalInfo.contact.mobile}</p>
                                                <p>{this.props.ArrangeAddress(applicant.applicant.pds.personalInfo.address[0])}</p>
                                            </td>
                                            : ""}
                                        {(this.state.headers["Remarks"].active)
                                            ? <td valign="top" className="remarks-td">
                                                <textarea spellcheck="false" value={applicant.remarks} className="edit-area" style={{ minHeight: "200px" }}
                                                    onChange={(e) => {
                                                        clearTimeout(this.state.timer);
                                                        if (e.type == "change") {
                                                            this.props.UpdateRemarksLocal(e.target.value, applicant.applicant._id);
                                                        }


                                                    }}
                                                    onKeyUp={(e) => {
                                                        clearTimeout(this.state.timer);
                                                        if (e.type == "keyup") {
                                                            this.SetTimer();
                                                        }
                                                    }}
                                                >
                                                </textarea>

                                            </td>
                                            : ""}
                                        {
                                            (this.state.nav == 4 || this.state.nav == 5)
                                                ? <td className="print-hide" style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
                                                    onClick={(e) => {
                                                        this.ToggleRatingModal(applicant)
                                                    }}
                                                >
                                                    {applicant.rank}
                                                </td>
                                                : ""
                                        }
                                        {
                                            (this.props.JobPost.values.status == "selection" && coveredStage && this.state.nav < 6)
                                                ? <td className="print-hide" style={{ textAlign: "center" }}
                                                    onClick={(e) => {
                                                        if (!isFinal) {

                                                            clearTimeout(this.state.timer);
                                                            if (e.target.className == "print-hide") {
                                                                this.SetTimer();
                                                                this.props.UpdateStatus(applicant.applicant._id, (e.target.innerText == "") ? curr : prev);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {status}
                                                </td>
                                                : ""
                                        }
                                        {
                                            (this.props.JobPost.values.status == "selection" && coveredStage)
                                                ? <td className="print-hide" style={{ textAlign: "center" }}
                                                    onClick={(e) => {
                                                        this.ToggleUploadNoticeModal(applicant, this.state.modalTitles[this.state.nav - 1], this.state.modalTypes[this.state.nav - 1])
                                                    }}
                                                >
                                                    {
                                                        (status != "" || this.state.nav == 6)
                                                            ? <FaFileUpload className="svg-icon-upload"
                                                                style={uploaded ? { color: "green" } : {}}
                                                                onClick={() => {
                                                                    this.ToggleUploadNoticeModal(applicant, this.state.modalTitles[this.state.nav - 1], this.state.modalTypes[this.state.nav - 1])
                                                                }} />
                                                            : ""
                                                    }

                                                </td>
                                                : ""
                                        }

                                    </tr>
                                ) : ""
                            })
                        }

                    </tbody>
                </table>

                <Col className="download-button" sm="12" style={{ display: "flex", justifyContent: "end", padding: 0, marginTop: "15px" }}>
                    <ReactToExcel
                        id="applicants-react-to-excel-button"
                        table="applicants-form-div-table"
                        filename="Applicants"
                        sheet="sheet 1"
                        buttonText={"Download (xlxs)"}
                    />
                    {
                        (coveredStage && this.state.nav < 6)
                            ? <button id="applicants-react-to-excel-button" style={{ marginLeft: "10px" }} disabled={(isFinal)} class="button-download" type="button"
                                onClick={() => {
                                    this.props.ConfirmAction(() => {
                                        console.log(this.state.stages[this.state.nav]);
                                        this.props.UpdateJobPostStage(values._id, this.state.stages[this.state.nav]);
                                    }, "Save Final List?");
                                }}
                            >Final</button>
                            : ""
                    }
                </Col>

            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    JobPost: state.JobPost
})

export default connect(mapStateToProps, {
    ArrangeName,
    GetAge,
    ArrangeAddress,
    ConfirmAction,
    ArrangeEducation,
    ArrangeTrianing,
    ArrangeExperience,
    ArrangeEligibility,
    UpdateRemarksLocal,
    UpdateJobPost,
    UpdateStatus,
    SetSelectedApplicant,
    UpdateJobPostStage,
    AddApplicant,
    TempUpdateJobPost,
    GetApplicantsWhoApply,
    SetApplicantAppliedToJP,
})(ApplicantsForm);
