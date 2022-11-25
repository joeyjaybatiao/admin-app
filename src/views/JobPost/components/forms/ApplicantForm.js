import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import { FaFileAlt } from "react-icons/fa";

import FileUpload from 'components/Helpers/FileUpload';
import LabelInput from 'components/Helpers/LabelInput';
import InfoModal from 'components/Helpers/InfoModal';
import DataTable from "components/Helpers/DataTable-temp";
import { ArrangeName, ArrangeDate, } from 'store/actions/helpers/displayAction.js';
import { OnBoardApplicant, } from '../../redux/actions';
import { SERVER_URI } from "config";


const ApplicantForm = (props) => {
    const [certModal, toggleCertModal] = useState(false);
    const [selectedFile, toggleSelectedFile] = useState(false);
    const { values } = props.JobPost;
    var info = values.applicants.filter((applicant, i) => applicant.applicant._id == props.JobPost.selectedApplicant)[0];
    var { files } = info.applicant;
    var avatar = {}, pds = {}, appLetter = {}, tor = {}, cav = {}, diploma = {}, eligibility = {}, certificate = [];
    for (let x = 0; x < files.length; x++) {

        if (files[x].status == "current") {
            if (files[x].type == "avatar") avatar = files[x];
            else if (files[x].type == "pds") pds = files[x];
            else if (files[x].type == "app-letter") appLetter = files[x];
            else if (files[x].type == "cav") cav = files[x];
            else if (files[x].type == "diploma") diploma = files[x];
            else if (files[x].type == "eligibility") eligibility = files[x];
            else if (files[x].type == "tor") tor = files[x];
            else if (files[x].type == "certificate") certificate.push(files[x]);
        }

    }

    var tempAvatar = info.applicant.pds.personalInfo.sex;
    var showOnboarding = false;
    tempAvatar = (tempAvatar == "Female") ? "female-temp.png" : "male-temp.png";


    if (values.stage == "selected" && info.status == "selected") {
        showOnboarding = true;
    }

    var FileUploaded = (file, type, name) => {
        return (file.hasOwnProperty("path") && file.path != "")
            ? (<Col lg="3">
                <Col lg="12">
                    <h3 className="mb-0">{name}</h3>
                </Col>

                <Col lg="12"><br />
                    <FaFileAlt
                        className='clickable'
                        style={{ width: "180px", height: "180px", marginBottom: "20px", color: "#2684c6" }}
                        onClick={() => {
                            window.open(SERVER_URI + "files/" + type + "/" + file.path);
                        }}
                    />
                </Col>

            </Col>)
            : ""
    }

    return (
        <div id="applicant-form-div">
            <InfoModal
                size={"50%"}
                modal={certModal}
                toggle={() => {
                    toggleCertModal(!certModal)
                }}
                title={""}
                form={
                    <Row>
                        <Col md="12">
                            <div id="file-viewer">
                                <div id="document-area">
                                    <div
                                        style={{
                                            padding: "10px"
                                        }}
                                    >
                                        <img
                                            style={{ width: "100%" }}
                                            alt={"Certificate"}
                                            className="navbar-brand-img"
                                            src={SERVER_URI + "files/certificate/" + selectedFile}
                                            
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
                buttons={[]}
            />
            <div className="row">
                <div className="col-md-4 photo-div">

                    <div className="userAvatar"
                        style={{
                            backgroundImage: `url(${SERVER_URI + "images/users/" + ((avatar.path && avatar.path != "") ? avatar.path : tempAvatar)})`
                        }}
                    >
                    </div>
                </div>
                <div className="col-md-8">
                    <Form>
                        <div>
                            <Row>
                                <Col sm="7">
                                    <LabelInput
                                        label={"First Name"}
                                        value={info.applicant.name.first}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                        }}
                                    />
                                    <LabelInput
                                        label={"Middle Name"}
                                        value={info.applicant.name.mid}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                        }}
                                    />
                                    <LabelInput
                                        label={"Last Name"}
                                        value={info.applicant.name.last}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                        }}
                                    />
                                </Col>
                                <Col sm="5">
                                    <LabelInput
                                        label={"Birth Date"}
                                        value={(info.applicant.pds.personalInfo.birth.date != null) ? props.ArrangeDate(info.applicant.pds.personalInfo.birth.date, false) : ""}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                        }}
                                    />
                                    <LabelInput
                                        label={"Sex"}
                                        value={info.applicant.pds.personalInfo.sex}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                        }}
                                    />
                                    <LabelInput
                                        label={"Civil Status"}
                                        value={info.applicant.pds.personalInfo.cStatus}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                        }}
                                    />
                                </Col>


                            </Row>

                        </div>
                    </Form>

                </div>
            </div>
            <br />
            <Row className="align-items-center">
                {FileUploaded(pds, "pds", "PDS")}
                {FileUploaded(appLetter, "app-letter", "Application Letter")}
                {FileUploaded(diploma, "diploma", "Diploma")}
                {FileUploaded(tor, "tor", "Transcript of Record (TOR)")}
                {FileUploaded(cav, "cav", "Certification, Authentication, and Verification (CAV)")}
                {FileUploaded(eligibility, "eligibility", "Eligibility")}

                <Col lg="12" className="certificates">
                    <h3 className="mb-0">Other Documents</h3>
                </Col>
                {
                    certificate.map((cert) => {
                        return (
                            <Col lg="3" className="certificate"
                                onClick={() => {
                                    toggleSelectedFile(cert.path);
                                    toggleCertModal(!certModal);
                                }}
                            >
                                <Col lg="12">
                                    <h5 className="mb-0 certificate-name">{cert.name}</h5>
                                </Col>
                                <Col lg="12">
                                    <div className="userAvatar cert"
                                        style={{
                                            backgroundImage: `url(${SERVER_URI + "files/certificate/" + cert.path})`
                                        }}
                                    >
                                    </div>
                                </Col>

                            </Col>
                        );
                    })
                }

                {
                    (showOnboarding)
                        ? <Col className="download-button" md="12" style={{ display: "flex", justifyContent: "end", padding: 0, marginTop: "15px" }}>

                            <button id="applicants-react-to-excel-button" style={{ marginLeft: "10px" }} class="button-download mt-4" type="button"
                                onClick={() => {
                                    console.log(info);
                                    props.OnBoardApplicant(info.applicant._id);
                                }}
                            >Onboard</button>

                        </Col>
                        : ""
                }
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({
    JobPost: state.JobPost
})

export default connect(mapStateToProps, {
    ArrangeName,
    ArrangeDate,
    OnBoardApplicant,
})(ApplicantForm);
