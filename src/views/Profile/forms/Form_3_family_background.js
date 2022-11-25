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
import { UpdateChildren, SaveInfoUpdates } from '../redux/actions';

const Form_4_educational_background = (props) => {
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
                                Spouse
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Surname Name"}
                                            prop={"pds.family.spouse.last"}
                                            value={props.pValues.pds.family.spouse.last}
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
                                            label={"First Name"}
                                            prop={"pds.family.spouse.first"}
                                            value={props.pValues.pds.family.spouse.first}
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
                                            label={"Middle Name"}
                                            prop={"pds.family.spouse.mid"}
                                            value={props.pValues.pds.family.spouse.mid}
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
                                            label={"Extension Name"}
                                            prop={"pds.family.spouse.ext"}
                                            value={props.pValues.pds.family.spouse.ext}
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
                                            label={"Occupation"}
                                            prop={"pds.family.spouse.occupation.name"}
                                            value={props.pValues.pds.family.spouse.occupation.name}
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
                                            label={"Employer/Business Name"}
                                            prop={"pds.family.spouse.occupation.employer"}
                                            value={props.pValues.pds.family.spouse.occupation.employer}
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
                                            label={"Business Address"}
                                            prop={"pds.family.spouse.occupation.address"}
                                            value={props.pValues.pds.family.spouse.occupation.address}
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
                                            label={"Telephone No."}
                                            prop={"pds.family.spouse.occupation.telephone"}
                                            value={props.pValues.pds.family.spouse.occupation.telephone}
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

                            <h6 className="heading-small text-muted mb-4">
                                Father
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Surname Name"}
                                            prop={"pds.family.father.last"}
                                            value={props.pValues.pds.family.father.last}
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
                                            label={"First Name"}
                                            prop={"pds.family.father.first"}
                                            value={props.pValues.pds.family.father.first}
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
                                            label={"Middle Name"}
                                            prop={"pds.family.father.mid"}
                                            value={props.pValues.pds.family.father.mid}
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
                                            label={"Extension Name"}
                                            prop={"pds.family.father.ext"}
                                            value={props.pValues.pds.family.father.ext}
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


                            <h6 className="heading-small text-muted mb-4">
                                Mother
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="3">
                                        <LabelInput
                                            label={"Surname Name"}
                                            prop={"pds.family.mother.last"}
                                            value={props.pValues.pds.family.mother.last}
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
                                            label={"First Name"}
                                            prop={"pds.family.mother.first"}
                                            value={props.pValues.pds.family.mother.first}
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
                                            label={"Middle Name"}
                                            prop={"pds.family.mother.mid"}
                                            value={props.pValues.pds.family.mother.mid}
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
                                            label={"Extension Name"}
                                            prop={"pds.family.mother.ext"}
                                            value={props.pValues.pds.family.mother.ext}
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

                            <h6 className="heading-small text-muted mb-4">
                                Children
                                <Col className="text-right" xs="12">
                                    <Button
                                        color="primary"
                                        onClick={(e) => props.UpdateChildren()}
                                        size="sm"
                                    >
                                        Add Child
                                    </Button>
                                </Col>
                            </h6>
                            <div className="pl-lg-4">
                                {
                                    props.pValues.pds.family.children.map((child, i) => {

                                        return (
                                            <Row style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)", marginBottom: "10px", paddingBottom: "10px" }}>
                                                <Col lg="6">
                                                    <LabelInput
                                                        label={"Name"}
                                                        prop={"pds.family.children." + i + ".name"}
                                                        value={child.name}
                                                        type="text"
                                                        req={1}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            props.SetValue(e, SET_PROFILE_DATA);
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg="5">
                                                    <LabelInput
                                                        label={"Date of Birth"}
                                                        prop={"pds.family.children." + i + ".dob"}
                                                        value={props.GetDate(new Date(child.dob || ""))}
                                                        type="date"
                                                        req={1}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            props.SetValue(e, SET_PROFILE_DATA);
                                                        }}
                                                    />
                                                </Col>

                                                <Col lg="1">
                                                    <Button
                                                        color="primary"
                                                        onClick={(e) => props.UpdateChildren('-', i)}
                                                        size="sm"
                                                    >
                                                        X
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
    UpdateChildren,
})(Form_4_educational_background);
