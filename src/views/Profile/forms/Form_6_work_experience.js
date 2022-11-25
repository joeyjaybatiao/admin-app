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
import { SET_PROFILE_DATA } from '../redux/types';
import { UpdateWorkExperience, SaveInfoUpdates, } from '../redux/actions';

const Form_6_work_experience = (props) => {
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
                                <Col className="text-right" xs="12">
                                    <Button
                                        color="primary"
                                        onClick={(e) => props.UpdateWorkExperience()}
                                        size="sm"
                                    >
                                        Add Work Experience
                                    </Button>
                                </Col>
                            </h6>
                            <div className="pl-lg-4">
                                {
                                    props.pValues.pds.workExperience.map((data, i) => {

                                        return (
                                            <Row style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)", marginBottom: "10px", paddingBottom: "10px" }}>
                                                <Col lg="6">
                                                    <LabelInput
                                                        label={"Inclusive Dates(From)"}
                                                        prop={"pds.workExperience." + i + ".inclusive.from"}
                                                        value={props.GetDate(new Date(data.inclusive.from || ""))}
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
                                                        label={"Inclusive Dates(To)"}
                                                        prop={"pds.workExperience." + i + ".inclusive.to"}
                                                        value={props.GetDate(new Date(data.inclusive.to || ""))}
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
                                                        label={"Position Title"}
                                                        prop={"pds.workExperience." + i + ".position"}
                                                        value={data.position}
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
                                                        label={"Department/Agency/Office/Company"}
                                                        prop={"pds.workExperience." + i + ".office"}
                                                        value={data.office}
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
                                                        label={"Monthly Salary"}
                                                        prop={"pds.workExperience." + i + ".salary.amount"}
                                                        value={data.salary.amount}
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
                                                        label={"Salary/Job Pay Grade"}
                                                        prop={"pds.workExperience." + i + ".salary.grade"}
                                                        value={data.salary.grade}
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
                                                        label={"Status of Appointment"}
                                                        prop={"pds.workExperience." + i + ".appointment"}
                                                        value={data.appointment}
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
                                                        label={"Government Service"}
                                                        prop={"pds.workExperience." + i + ".isGovService"}
                                                        value={data.isGovService}
                                                        type="select"
                                                        options={[{ value: "yes", text: "YES" }, { value: "no", text: "NO" }]}
                                                        req={1}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            props.SetValue(e, SET_PROFILE_DATA);
                                                        }}
                                                    />
                                                </Col>

                                                <Col xs="12" style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <Button
                                                        color="primary"
                                                        onClick={(e) => props.UpdateWorkExperience('-', i)}
                                                        size="sm"
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
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
    UpdateWorkExperience,
    SaveInfoUpdates,
})(Form_6_work_experience);
