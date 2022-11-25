
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';
import { FaFileAlt } from "react-icons/fa";
import {
    GetDate,
} from 'store/actions/helpers/dateAction';
import {
    SetValue,
    ArrangeAmount,
    ArrangeDate,
} from 'store/actions/helpers/displayAction';

import {
    Row,
    Col,
    Form,
    Button,
    UncontrolledCollapse,
} from "reactstrap";

import {
    SET_APPLICANT_VALUE,
} from '../redux/types';

import LabelInput from 'components/Helpers/LabelInput';
import InfoModal from 'components/Helpers/InfoModal';


const ApplicantForm = (props) => {
    const [certModal, toggleCertModal] = useState(false);
    const [selectedFile, toggleSelectedFile] = useState(false);
    const { values, offices, roles, tempAvatar } = props.Applicant;
    var profilePic = null;
    var { files } = values;
    console.log(files);
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

    values.files.map((file, i) => {
        if (file.type == "avatar" && file.status == "current") {
            profilePic = file.path;
        }
    })

    console.log(values);

    var FileUploaded = (file, type, name) => {
        console.log("------------------------------------------------");
        console.log(file);

        if (file.hasOwnProperty("path") && file.path != "") {
            var ext = file.path.split(".")
            return (<Col lg="2" className="file-uploaded-thumb">
                <Col lg="12"
                    className='clickable'
                    onClick={() => {
                        window.open(SERVER_URI + "files/" + type + "/" + file.path);
                    }}
                >
                    <h3 className="heading-small text-muted mt-1">{name}</h3>
                    <br />
                    <span>{ext[ext.length - 1].toUpperCase()}</span>
                    {/* <FaFileAlt
                    
                /> */}
                </Col>

            </Col>);
        } else {
            return "";
        }

    }

    return (
        <>
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
            <Row className="pt-3 pl-3 pr-3">
                <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
                    <div className="avatar-thumbnail-profile"
                        style={{
                            // backgroundImage: `url(${SERVER_URI + "images/users/male-temp.png"})`,
                            backgroundImage: `url(${(tempAvatar.base64 != "")
                                ? tempAvatar.base64
                                : SERVER_URI + "images/users/" + (
                                    (profilePic != null)
                                        ? profilePic
                                        : (values.pds.personalInfo.sex == "")
                                            ? "male-temp.png"
                                            : (((values.pds.personalInfo.sex == null) ? "" : values.pds.personalInfo.sex).toLowerCase() + "-temp.png")
                                )
                                })`,
                            width: "280px",
                            height: "280px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            // props.toggleProfilePic();
                        }}
                    >
                    </div>
                </Col>
                <Col md="8">
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Applicant information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="4">
                                    <LabelInput
                                        className="uneditable"
                                        label={"First Name"}
                                        prop={"name.first"}
                                        value={values.name.first}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="4">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Middle Name"}
                                        prop={"name.mid"}
                                        value={values.name.mid}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="4">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Last Name"}
                                        prop={"name.last"}
                                        value={values.name.last}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Date of Birth"}
                                        prop={"pds.personalInfo.birth.date"}
                                        value={props.GetDate(new Date(values.pds.personalInfo.birth.date || ""))}
                                        type="date"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Sex"}
                                        prop={"pds.personalInfo.sex"}
                                        value={values.pds.personalInfo.sex}
                                        type="select"
                                        options={[{ value: "", text: "" }, { value: "Female", text: "Female" }, { value: "Male", text: "Male" }]}
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Email"}
                                        prop={"pds.personalInfo.contact.email"}
                                        value={values.pds.personalInfo.contact.email}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Mobile Number"}
                                        prop={"pds.personalInfo.contact.mobile"}
                                        value={values.pds.personalInfo.contact.mobile}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <h6 className="heading-small text-muted mb-4">
                                Address
                            </h6>
                            <Row>
                                <Col md="4">
                                    <LabelInput
                                        className="uneditable"
                                        label={"House/Block/Lot No."}
                                        prop={"pds.personalInfo.address.0.block"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].block : ""}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col md="4">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Street"}
                                        prop={"pds.personalInfo.address.0.street"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].street : ""}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col md="4">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Subdivision/Village"}
                                        prop={"pds.personalInfo.address.0.village"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].village : ""}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>

                                <Col md="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Barangay"}
                                        prop={"pds.personalInfo.address.0.brgy"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].brgy : ""}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>

                                <Col md="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"City/Municipality"}
                                        prop={"pds.personalInfo.address.0.cm"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].cm : ""}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Province"}
                                        prop={"pds.personalInfo.address.0.province"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].province : ""}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        className="uneditable"
                                        label={"Zip code"}
                                        prop={"pds.personalInfo.address.0.zipcode"}
                                        value={values.pds.personalInfo.address.length > 0 ? values.pds.personalInfo.address[0].zipcode : ""}
                                        type="text"
                                        // req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Form>

                </Col>
            </Row>
            <br />


            <Row className="appl-from-toggle align-items-center pl-6 pr-6 mt-5">
                <Button color="primary" className="toggler" id="appl-docs-toggler">
                    Uploaded Documents
                </Button>
                <UncontrolledCollapse toggler="#appl-docs-toggler">
                    <br />
                    <h4 className="text-muted mb-4">
                        Documents
                    </h4>
                    <Row className="pl-2 pr-2 pb-5">
                        {FileUploaded(pds, "pds", "PDS")}
                        {FileUploaded(appLetter, "app-letter", "Application Letter")}
                        {FileUploaded(diploma, "diploma", "Diploma")}
                        {FileUploaded(tor, "tor", "Transcript of Record (TOR)")}
                        {FileUploaded(cav, "cav", "Certification, Authentication, and Verification (CAV)")}
                        {FileUploaded(eligibility, "eligibility", "Eligibility")}

                        <Col lg="12" className="certificates">
                            <h3 className="text-muted mb-0">Other Documents</h3>
                        </Col>
                        {
                            certificate.map((cert) => {
                                console.log("------------------------------------------------");
                                console.log(cert);
                                var ext = cert.path.split(".");
                                return (
                                    <Col lg="2" className="file-uploaded-thumb">
                                        <Col lg="12"
                                            className='clickable'
                                            onClick={() => {
                                                toggleSelectedFile(cert.path);
                                                toggleCertModal(!certModal);
                                            }}
                                        >
                                            <h3 className="heading-small text-muted mt-1">{cert.name}</h3>
                                            <br />
                                            <span>{ext[ext.length - 1].toUpperCase()}</span>

                                        </Col>

                                    </Col>
                                );
                            })
                        }
                    </Row>
                </UncontrolledCollapse>



            </Row>

            <Row className="appl-from-toggle align-items-center pl-6 pr-6 mt-2">
                <Button color="primary" className="toggler" id="appl-jobs-toggler">
                    Applied Jobs
                </Button>
                <UncontrolledCollapse toggler="#appl-jobs-toggler">
                    <br />
                    <h4 className="text-muted mb-4">
                        Jobs
                    </h4>
                    <Row className="pl-2 pr-2" id="appl-jobs-toggler-list">
                        {
                            values.appliedJobs.map((job) => {
                                return (
                                    <Col lg="6">
                                        <div>
                                            <strong> {job.job.position} </strong>
                                            <p> {job.job.poa} </p>
                                            <p> {"SG " + job.job.sg.grade + " | " + props.ArrangeAmount(job.job.sg.salary)} </p>
                                            <span> {"Applied on " + props.ArrangeDate(job.date)} </span>
                                        </div>
                                    </Col>

                                )
                            })
                        }
                    </Row>
                </UncontrolledCollapse>
            </Row>


        </>
    );
};

const mapStateToProps = (state) => ({
    Applicant: state.Applicant
})

export default connect(mapStateToProps, {
    GetDate,
    SetValue,
    ArrangeAmount,
    ArrangeDate,
})(ApplicantForm);