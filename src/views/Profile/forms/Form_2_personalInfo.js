import React from "react";
import { connect } from 'react-redux';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import LabelInput from 'components/Helpers/LabelInput';
import { SetValue } from 'store/actions/helpers/displayAction.js';
import { GetDate } from 'store/actions/helpers/dateAction.js';
import { SaveInfoUpdates } from '../redux/actions';
import { SET_PROFILE_DATA } from '../redux/types';

const Form_2_personalInfo = (props) => {
    return (
        <>
            <Col id="form-container" className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">Personal Information</h3>
                            </Col>
                            <Col className="text-right" xs="4">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        props.SaveInfoUpdates();
                                    }}
                                    size="sm"
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                User information
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"First Name"}
                                            prop={"name.first"}
                                            value={props.pValues.name.first}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Middle Name"}
                                            prop={"name.mid"}
                                            value={props.pValues.name.mid}
                                            type="text"
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Last Name"}
                                            prop={"name.last"}
                                            value={props.pValues.name.last}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>

                                    <Col lg="3">
                                        <LabelInput
                                            label={"Date of Birth"}
                                            prop={"pds.personalInfo.birth.date"}
                                            value={props.GetDate(new Date(props.pValues.pds.personalInfo.birth.date || ""))}
                                            type="date"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Place of Birth"}
                                            prop={"pds.personalInfo.birth.place"}
                                            value={props.pValues.pds.personalInfo.birth.place}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Citizenship"}
                                            prop={"pds.personalInfo.citizenship.type"}
                                            value={props.pValues.pds.personalInfo.citizenship.type}
                                            type="select"
                                            options={[{ value: "Filipino", text: "Filipino" }, { value: "Dual Citizenship", text: "Dual Citizenship" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>

                                    <Col lg="3">
                                        <LabelInput
                                            label={"Sex"}
                                            prop={"pds.personalInfo.sex"}
                                            value={props.pValues.pds.personalInfo.sex}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "Female", text: "Female" }, { value: "Male", text: "Male" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>


                                    <Col lg="3">
                                        <LabelInput
                                            label={"Civil Status"}
                                            prop={"pds.personalInfo.cStatus"}
                                            value={props.pValues.pds.personalInfo.cStatus}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "Single", text: "Single" }, { value: "Married", text: "Married" }, { value: "Widowed", text: "Widowed" }, { value: "Separated", text: "Separated" }, { value: "Other/s", text: "Other/s" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Height(m)"}
                                            prop={"pds.personalInfo.height"}
                                            value={props.pValues.pds.personalInfo.height}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Weight(kg)"}
                                            prop={"pds.personalInfo.weight"}
                                            value={props.pValues.pds.personalInfo.weight}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>

                                    <Col lg="3">
                                        <LabelInput
                                            label={"Blood Type"}
                                            prop={"pds.personalInfo.blood"}
                                            value={props.pValues.pds.personalInfo.blood}
                                            type="select"
                                            options={[{ value: "", text: "" },
                                            { value: "A+", text: "A+" }, { value: "A-", text: "A-" },
                                            { value: "B+", text: "B+" }, { value: "B-", text: "B-" },
                                            { value: "O+", text: "O+" }, { value: "O-", text: "O-" },
                                            { value: "AB+", text: "AB+" }, { value: "AB-", text: "AB-" },
                                            ]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                Residential Address
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="4">
                                        <LabelInput
                                            label={"House/Block/Lot No."}
                                            prop={"pds.personalInfo.address.0.block"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].block:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            label={"Street"}
                                            prop={"pds.personalInfo.address.0.street"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].street:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            label={"Subdivision/Village"}
                                            prop={"pds.personalInfo.address.0.village"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].village:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md="6">
                                        <LabelInput
                                            label={"Barangay"}
                                            prop={"pds.personalInfo.address.0.brgy"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].brgy:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>

                                    <Col md="6">
                                        <LabelInput
                                            label={"City/Municipality"}
                                            prop={"pds.personalInfo.address.0.cm"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].cm:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Province"}
                                            prop={"pds.personalInfo.address.0.province"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].province:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Zip code"}
                                            prop={"pds.personalInfo.address.0.zipcode"}
                                            value={(props.pValues.pds.personalInfo.address.hasOwnProperty("0"))?props.pValues.pds.personalInfo.address[0].zipcode:""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                Permanent Address
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="4">
                                        <LabelInput
                                            label={"House/Block/Lot No."}
                                            prop={"pds.personalInfo.address.1.block"}
                                            value={props.pValues.pds.personalInfo.address.hasOwnProperty("1") ? props.pValues.pds.personalInfo.address[1].block : ""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            label={"Street"}
                                            prop={"pds.personalInfo.address.1.street"}
                                            value={props.pValues.pds.personalInfo.address.hasOwnProperty("1") ? props.pValues.pds.personalInfo.address[1].street : ""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <LabelInput
                                            label={"Subdivision/Village"}
                                            prop={"pds.personalInfo.address.1.village"}
                                            value={props.pValues.pds.personalInfo.address.hasOwnProperty("1") ? props.pValues.pds.personalInfo.address[1].village : ""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md="6">
                                        <LabelInput
                                            label={"Barangay"}
                                            prop={"pds.personalInfo.address.1.brgy"}
                                            value={props.pValues.pds.personalInfo.address.hasOwnProperty("1") ? props.pValues.pds.personalInfo.address[1].brgy : ""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>

                                    <Col md="6">
                                        <LabelInput
                                            label={"City/Municipality"}
                                            prop={"pds.personalInfo.address.1.cm"}
                                            value={props.pValues.pds.personalInfo.address.hasOwnProperty("1") ? props.pValues.pds.personalInfo.address[1].cm : ""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Province"}
                                            prop={"pds.personalInfo.address.1.province"}
                                            value={props.pValues.pds.personalInfo.address.hasOwnProperty("1") ? props.pValues.pds.personalInfo.address[1].province : ""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Zip code"}
                                            prop={"pds.personalInfo.address.1.zipcode"}
                                            value={props.pValues.pds.personalInfo.address.hasOwnProperty("1") ? props.pValues.pds.personalInfo.address[1].zipcode : ""}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                IDs
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"GSIS ID No."}
                                            prop={"pds.personalInfo.ids.gsis"}
                                            value={props.pValues.pds.personalInfo.ids.gsis}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Pag-ibig No."}
                                            prop={"pds.personalInfo.ids.pagibig"}
                                            value={props.pValues.pds.personalInfo.ids.pagibig}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Philhealth No."}
                                            prop={"pds.personalInfo.ids.philhealth"}
                                            value={props.pValues.pds.personalInfo.ids.philhealth}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"SSS No."}
                                            prop={"pds.personalInfo.ids.sss"}
                                            value={props.pValues.pds.personalInfo.ids.sss}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"TIN No."}
                                            prop={"pds.personalInfo.ids.tin"}
                                            value={props.pValues.pds.personalInfo.ids.tin}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Agency Employee No."}
                                            prop={"pds.personalInfo.ids.agency"}
                                            value={props.pValues.pds.personalInfo.ids.agency}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>

                            </div>
                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                Other Government Issued ID (i.e, Passport, GSIS, SSS, PRC, Driver's License, etc.)
                            </h6>
                            <div className="pl-lg-4">
                            <Row>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Government Issued ID"}
                                            prop={"pds.personalInfo.ids.other.name"}
                                            value={props.pValues.pds.personalInfo.ids.other.name}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"ID/License/Passport No."}
                                            prop={"pds.personalInfo.ids.other.number"}
                                            value={props.pValues.pds.personalInfo.ids.other.number}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Date of Issuance"}
                                            prop={"pds.personalInfo.ids.other.date"}
                                            value={props.GetDate(new Date(props.pValues.pds.personalInfo.ids.other.date || ""))}
                                            type="date"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <LabelInput
                                            label={"Place of Issuance"}
                                            prop={"pds.personalInfo.ids.other.place"}
                                            value={props.pValues.pds.personalInfo.ids.other.place}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>

                            </div>


                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                Contact Details
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Email"}
                                            prop={"pds.personalInfo.contact.email"}
                                            value={props.pValues.pds.personalInfo.contact.email}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Mobile Number"}
                                            prop={"pds.personalInfo.contact.mobile"}
                                            value={props.pValues.pds.personalInfo.contact.mobile}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="4">
                                        <LabelInput
                                            label={"Telephone Number"}
                                            prop={"pds.personalInfo.contact.telephone"}
                                            value={props.pValues.pds.personalInfo.contact.telephone}
                                            type="text"
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </div>

                        </Form>

                    </CardBody>
                </Card>
            </Col>

        </>
    );
};

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    pValues: state.Profile.values
})

export default connect(mapStateToProps, {
    SetValue,
    GetDate,
    SaveInfoUpdates,
})(Form_2_personalInfo);
