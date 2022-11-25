
import React, { useState } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

import {
    SetValue,
} from 'store/actions/helpers/displayAction';

import {
    SET_ITEM_TYPE_VALUE,
} from '../redux/types';

import {
    Row,
    Col,
    Form,
} from "reactstrap";

import LabelInput from 'components/Helpers/LabelInput';

const ItemTypeForm = (props) => {
    console.log(props);
    const { values } = props.ItemType;

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
                                <Col lg="6">
                                    <LabelInput
                                        label={"ItemType"}
                                        prop={"itemName"}
                                        value={values.itemName}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_ITEM_TYPE_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="6">
                                    <LabelInput
                                        label={"ItemType"}
                                        prop={"price"}
                                        value={values.price}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_ITEM_TYPE_VALUE);
                                        }}
                                    />
                                </Col>
                                <Col lg="12">
                                    <LabelInput
                                        label={"ItemType"}
                                        prop={"description"}
                                        value={values.description}
                                        type="text"
                                        req={1}
                                        placeholder=""
                                        onChange={(e) => {
                                            props.SetValue(e, SET_ITEM_TYPE_VALUE);
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
    ItemType: state.ItemType
})

export default connect(mapStateToProps, {
    SetValue,
})(ItemTypeForm);