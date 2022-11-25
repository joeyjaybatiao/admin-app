
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

import {
    SetValue,
} from 'store/actions/helpers/displayAction';

import {
    SetDarProps,
} from '../redux/actions';

import {
    SET_DAR_VALUE,
} from '../redux/types';

import {
    Row,
    Col,
    Form,
    InputGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';

const DarForm = (props) => {
    const { values, darIndex } = props.Dar;
    return (
        <>
            <Row className="pt-3 pl-3 pr-3">
                <Col md="12">
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Details
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="4">
                                    <LabelInput
                                        label={"Date"}
                                        prop={"date"}
                                        value={values.date}
                                        type={"date"}
                                        req={(props.modalType == "add")?1:0}
                                        disabled={(props.modalType == "add")?false:true}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_DAR_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="12">
                                    <LabelInput
                                        label={"Deliverable"}
                                        prop={"deliverable"}
                                        value={values.deliverable}
                                        type="textarea"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_DAR_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="12">
                                    <LabelInput
                                        label={"Outcome"}
                                        prop={"outcome"}
                                        value={values.outcome}
                                        type="textarea"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_DAR_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="12">
                                    <LabelInput
                                        label={"Remarks"}
                                        prop={"remarks"}
                                        value={values.remarks}
                                        type="textarea"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_DAR_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="3">
                                    <label>Percentage</label>
                                    <InputGroup>
                                        <Input type="number" value={values.percentage} placeholder="1-100" onChange={(e) => {
                                            props.SetDarProps("percentage", e.target.value*1)
                                        }} />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText style={{ padding: "0.525rem 0.75rem" }}>%</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>

                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => ({
    Dar: state.Dar
})

export default connect(mapStateToProps, {
    SetValue,
    SetDarProps,
})(DarForm);