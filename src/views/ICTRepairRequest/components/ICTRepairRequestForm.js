
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

import {
    SetValue,
} from 'store/actions/helpers/displayAction';

import {
    SET_ICT_REPAIR_REQUEST_VALUE,
} from '../redux/types';

import {
    Row,
    Col,
    Form,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';

const ICTRepairRequestForm = (props) => {
    console.log(props);
    const { values } = props.ICTRepairRequest;

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
                                <Col lg="12">
                                    <LabelInput
                                        label={"ICTRepairRequest"}
                                        prop={"name"}
                                        value={values.name}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_ICT_REPAIR_REQUEST_VALUE);
                                        }}
                                    />
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
    ICTRepairRequest: state.ICTRepairRequest
})

export default connect(mapStateToProps, {
    SetValue,
})(ICTRepairRequestForm);