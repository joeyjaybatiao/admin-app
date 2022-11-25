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
import { UpdateEligibility, SaveInfoUpdates } from '../redux/actions';

const Form_5_eligibility = (props) => {
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
                                        onClick={(e) => props.UpdateEligibility()}
                                        size="sm"
                                    >
                                        Add Eligibility
                                    </Button>
                                </Col>
                            </h6>
                            <div className="pl-lg-4">
                                {
                                    props.pValues.pds.eligibility.map((data, i) => {

                                        return (
                                            <Row style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)", marginBottom: "10px", paddingBottom: "10px" }}>
                                                <Col lg="9">
                                                    <LabelInput
                                                        label={"Career Service/RA 1080(Board/Bar) Under Sprecial Laws/CES?CSEE/Barangay Eligibility/Driver's License"}
                                                        prop={"pds.eligibility." + i + ".name"}
                                                        value={data.name}
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
                                                        label={"Rating"}
                                                        prop={"pds.eligibility." + i + ".rating"}
                                                        value={data.rating}
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
                                                        label={"Date of Examination/Conferment"}
                                                        prop={"pds.eligibility." + i + ".exam.date"}
                                                        value={props.GetDate(new Date(data.exam.date || ""))}
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
                                                        label={"Place of Examination/Conferment"}
                                                        prop={"pds.eligibility." + i + ".exam.place"}
                                                        value={data.exam.place}
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
                                                        label={"License No."}
                                                        prop={"pds.eligibility." + i + ".license.number"}
                                                        value={data.license.number}
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
                                                        label={"License - Date of Validity"}
                                                        prop={"pds.eligibility." + i + ".license.validity"}
                                                        value={props.GetDate(new Date(data.license.validity || ""))}
                                                        type="date"
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
                                                        onClick={(e) => props.UpdateEligibility('-', i)}
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
    UpdateEligibility,
    SaveInfoUpdates,
})(Form_5_eligibility);
