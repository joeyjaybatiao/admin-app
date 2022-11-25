
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
} from "reactstrap";

import {
    SET_APPLICANT_VALUE,
} from '../redux/types';

import LabelInput from 'components/Helpers/LabelInput';


const ApplicantAddForm = (props) => {
    const { values } = props.Applicant;

    console.log("------!!---------------------------");
    console.log(values);

    return (
        <>
            <Row className="pt-3 pl-3 pr-3">

                <Col md="11">
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Applicant information
                        </h6>
                        <div className="pl-lg-4">
                            <Row>

                                <Col lg="6">
                                    <LabelInput
                                        label={"Email"}
                                        prop={"pds.personalInfo.contact.email"}
                                        value={values.pds.personalInfo.contact.email}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>

                            </Row>

                            <Row>
                                <Col lg="4">
                                    <LabelInput
                                        label={"First Name"}
                                        prop={"name.first"}
                                        value={values.name.first}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_APPLICANT_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="4">
                                    <LabelInput
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
                                        label={"Last Name"}
                                        prop={"name.last"}
                                        value={values.name.last}
                                        type="text"
                                        req={1}
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
})(ApplicantAddForm);