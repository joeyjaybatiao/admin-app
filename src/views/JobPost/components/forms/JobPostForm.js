import React, { Component } from "react";
import { connect } from 'react-redux';

import { COURSES } from 'config';

import {
    SET_JOB_POST_VALUE
} from '../../redux/types.js';
import LabelInput from 'components/Helpers/LabelInput';
import { SetValue, ArrangeAmount } from 'store/actions/helpers/displayAction.js';
import { GetDate, } from 'store/actions/helpers/dateAction.js';
import {
    UpdateEducList,
} from '../../redux/actions';

import { FaTimesCircle } from 'react-icons/fa';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Badge,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

class JobPostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        var courses = [{ text: "Select Basic Education/Degree/Course", value: "" }, { text: "Other", value: "other" }];
        console.log(this.props);
        var megerCourses = [...COURSES.College, ...COURSES.Master, ...COURSES.Doctor]
        megerCourses.map((c, i) => {
            courses.push({
                text: c,
                value: c,
            })
        })

        var sg = [{text: "", value: ""}];
        for (let x = 1; x < 34; x++) {
            sg.push({ text: x, value: x })
        }

        return (
            <>
                <Col className="jp-non-printable order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Hiring Detail</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <div className="pl-lg-12">
                                    <Row>
                                        <Col lg="6">
                                            <LabelInput
                                                label={"Position Title"}
                                                prop={"position"}
                                                value={this.props.jobValues.position}
                                                type="text"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                    this.props.SetValue(e, SET_JOB_POST_VALUE);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="6">
                                            <LabelInput
                                                label={"Plantilla No."}
                                                prop={"plantilla"}
                                                value={this.props.jobValues.plantilla}
                                                type="text"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                    this.props.SetValue(e, SET_JOB_POST_VALUE);
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <LabelInput
                                                label={"Place of Assignment"}
                                                prop={"poa"}
                                                value={this.props.jobValues.poa}
                                                type="text"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                    this.props.SetValue(e, SET_JOB_POST_VALUE);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <LabelInput
                                                label={"Salary Grade"}
                                                prop={"sg.grade"}
                                                value={this.props.jobValues.sg.grade}
                                                type="select"
                                                options={sg}
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                    this.props.SetValue(e, SET_JOB_POST_VALUE);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <LabelInput
                                                label={"Amount"}
                                                prop={"sg.salary"}
                                                value={this.props.jobValues.sg.salary}
                                                type="text"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                    this.props.SetValue(e, SET_JOB_POST_VALUE);
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <LabelInput
                                                label={"Date Posted"}
                                                prop={"date.post"}
                                                value={(this.props.jobValues.date.post.split("T").length == 2)?this.props.GetDate(new Date(this.props.jobValues.date.post || "")):this.props.jobValues.date.post}
                                                type="date"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                    this.props.SetValue(e, SET_JOB_POST_VALUE);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="6">
                                            <LabelInput
                                                label={"Date Close"}
                                                prop={"date.close"}
                                                value={(this.props.jobValues.date.close.split("T").length == 2)?this.props.GetDate(new Date(this.props.jobValues.date.close || "")):this.props.jobValues.date.close}
                                                type="date"
                                                req={1}
                                                placeholder=""
                                                onChange={(e) => {
                                                    this.props.SetValue(e, SET_JOB_POST_VALUE);
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                </div>
                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">
                                    Requirements
                                </h6>
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"Eligibility"}
                                            prop={"other.eligibility"}
                                            value={this.props.jobValues.other.eligibility}
                                            type="textarea"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                this.props.SetValue(e, SET_JOB_POST_VALUE);
                                            }}
                                        />
                                        <LabelInput
                                            label={"Educational Attainment"}
                                            prop={"other.education"}
                                            type="select"
                                            options={courses}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {

                                                if (e.target.value != "other") {
                                                    this.props.UpdateEducList(e.target.value);
                                                    this.setState({ other: false })
                                                } else {
                                                    this.setState({ other: true })
                                                }

                                            }}
                                        />
                                        {
                                            (this.state.other)
                                                ? <LabelInput
                                                    label={"Specify"}
                                                    prop={""}
                                                    type="text"
                                                    req={1}
                                                    placeholder=""
                                                    onKeyPress={(e) => {
                                                        if (e.key == "Enter") {
                                                            this.setState({ other: false })
                                                            this.props.UpdateEducList(e.target.value);
                                                        }
                                                    }}
                                                />
                                                : ""
                                        }
                                        <div className="educ-attainments-div">
                                            {
                                                this.props.jobValues.other.education.map((edu, i) => {
                                                    return (
                                                        <Badge style={{ marginRight: "10px" }} color="primary" pill>
                                                            <FaTimesCircle
                                                                className="filter-remove-icon"
                                                                onClick={() => {
                                                                    this.props.UpdateEducList(i);
                                                                }}
                                                            />
                                                            {edu}
                                                        </Badge>

                                                    )
                                                })
                                            }
                                        </div>


                                        <LabelInput
                                            label={"Work Experience"}
                                            prop={"other.wEx"}
                                            value={this.props.jobValues.other.wEx}
                                            type="textarea"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                this.props.SetValue(e, SET_JOB_POST_VALUE);
                                            }}
                                        />
                                        <LabelInput
                                            label={"Training"}
                                            prop={"other.training"}
                                            value={this.props.jobValues.other.training}
                                            type="textarea"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                this.props.SetValue(e, SET_JOB_POST_VALUE);
                                            }}
                                        />
                                        <LabelInput
                                            label={"Competency"}
                                            prop={"other.competency"}
                                            value={this.props.jobValues.other.competency}
                                            type="textarea"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                this.props.SetValue(e, SET_JOB_POST_VALUE);
                                            }}
                                        />
                                        <LabelInput
                                            label={"Instructions/Remarks"}
                                            prop={"other.remarks"}
                                            value={this.props.jobValues.other.remarks}
                                            type="textarea"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                this.props.SetValue(e, SET_JOB_POST_VALUE);
                                            }}
                                        />
                                        <LabelInput
                                            label={"Documents Required"}
                                            prop={"other.documentsRequired"}
                                            value={this.props.jobValues.other.documentsRequired}
                                            type="textarea"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                this.props.SetValue(e, SET_JOB_POST_VALUE);
                                            }}
                                        />
                                    </Col>
                                </Row>

                            </Form>

                        </CardBody>
                    </Card>
                </Col>

                <Col className="printable-form" xl="12">
                    <Col className="jp-form-header" xl="12">
                        <img
                            alt={"header-logo"}
                            className="navbar-brand-img"
                            src={require("assets/img/jobpost/header2.png").default}
                        />
                        {/* <span>Republic of the Philippines</span>
                    <hr />
                    <span>National Economic and Development Authority</span><br />
                    <span>Caraga Region XIII</span> */}
                    </Col>
                    <Col className="jp-content-header" xl="12">
                        <p>VACANCY ANNOUNCEMENT</p>
                        <span><strong>{this.props.jobValues.position.toUpperCase()}</strong></span><br />
                        <span>Salary Grade {this.props.jobValues.sg.grade}, {this.props.ArrangeAmount(this.props.jobValues.sg.salary)} per month</span><br />
                        <span>Plantilla No. {this.props.jobValues.plantilla.toUpperCase()}</span><br />
                    </Col>
                    <Row className="jp-content">
                        <Col className="jp-content-1" xl="6">
                            <strong><u>Minimum Requirements:</u></strong>
                            <table>
                                <tr>
                                    <td>Education :</td>
                                    <td>Bachelor's degree relevant to the job preferably {this.props.jobValues.other.education.join(", ")}</td>
                                </tr>
                                <tr>
                                    <td>Training :</td>
                                    <td>
                                        {this.props.jobValues.other.training}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Experience :</td>
                                    <td>{this.props.jobValues.other.wEx}</td>
                                </tr>

                                <tr>
                                    <td>Eligibility : </td>
                                    <td>{this.props.jobValues.other.eligibility}</td>
                                </tr>
                                <tr>
                                    <td>Others :</td>
                                    <td>{this.props.jobValues.other.remarks} </td>
                                </tr>
                            </table>
                        </Col>
                        <Col className="jp-content-2" xl="6">
                            <strong><u>Requirements:</u></strong><br />
                            <span>Fully accomplished PDS; Photocopy of authenticated Certificate of eligibility/rating/license whichever is applicable; Photocopy of Transcript of Records with CAV from CHED, if applicable and  certificate/s of relevant trainings, if any</span>
                            <br />
                            <br />
                            <br />
                            <span>Qualified applicants are encouraged to send their application through courier/email or hand in to </span>
                            <br />
                            <br />
                            <div className="email-details">
                                <h3>PRISCILLA R. SONIDO</h3>
                                <span>Regional Director</span><br />
                                <span>NEDA Caraga, J. Rosales Avenue, Butuan City</span><br />
                                <span><a>nro13@neda.gov.ph</a></span>
                            </div>
                            <br />
                            <h3>Deadline of Application: 23 January 2022</h3>
                        </Col>
                    </Row>
                    <Col className="jp-footer" xl="12">
                        <i>“We are an equal opportunity employer and all qualified applicants will receive consideration for employment without regard to race, color, <br />religion, sex, ethnic origin, disability, age, or any other characteristic protected by law”.</i>
                        <img
                            alt={"footer-logo"}
                            className="navbar-brand-img"
                            src={require("assets/img/jobpost/footer.png").default}
                        />
                    </Col>
                </Col>
            </>
        );
    };
};


const mapStateToProps = (state) => ({
    JobPost: state.JobPost,
    jobValues: state.JobPost.values,
})

export default connect(mapStateToProps, {
    SetValue,
    ArrangeAmount,
    UpdateEducList,
    GetDate,
})(JobPostForm);
