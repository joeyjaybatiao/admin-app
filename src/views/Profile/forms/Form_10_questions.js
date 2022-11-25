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
import { SaveInfoUpdates, } from '../redux/actions';

const Form_10_questions = (props) => {
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
                                34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be apppointed,
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"a.	within the third degree?"}
                                            prop={"pds.questions.consanguinity.third"}
                                            value={props.pValues.pds.questions.consanguinity.third}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"b.	within the fourth degree (for Local Government Unit - Career Employees)?"}
                                            prop={"pds.questions.consanguinity.fourth"}
                                            value={props.pValues.pds.questions.consanguinity.fourth}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
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

                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                35.
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"a. Have you ever been found guilty of any administrative offense?"}
                                            prop={"pds.questions.adminOffense"}
                                            value={props.pValues.pds.questions.adminOffense}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"b. Have you been criminally charged before any court?"}
                                            prop={"pds.questions.charged"}
                                            value={props.pValues.pds.questions.charged}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
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

                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                36.
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?"}
                                            prop={"pds.questions.convicted"}
                                            value={props.pValues.pds.questions.convicted}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
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

                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                37.
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?"}
                                            prop={"pds.questions.separated"}
                                            value={props.pValues.pds.questions.separated}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
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

                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                38.
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?"}
                                            prop={"pds.questions.candidate"}
                                            value={props.pValues.pds.questions.candidate}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?"}
                                            prop={"pds.questions.resigned"}
                                            value={props.pValues.pds.questions.resigned}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
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

                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                39.
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"Have you acquired the status of an immigrant or permanent resident of another country?"}
                                            prop={"pds.questions.immigrant"}
                                            value={props.pValues.pds.questions.immigrant}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
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

                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"a. Are you a member of any indigenous group?"}
                                            prop={"pds.questions.RAs.member"}
                                            value={props.pValues.pds.questions.RAs.member}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"b. Are you a person with disability?"}
                                            prop={"pds.questions.RAs.pwd"}
                                            value={props.pValues.pds.questions.RAs.pwd}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
                                            req={1}
                                            placeholder=""
                                            onChange={(e) => {
                                                props.SetValue(e, SET_PROFILE_DATA);
                                            }}
                                        />
                                    </Col>
                                    <Col lg="12">
                                        <LabelInput
                                            label={"b. Are you a solo parent?"}
                                            prop={"pds.questions.RAs.soloParent"}
                                            value={props.pValues.pds.questions.RAs.soloParent}
                                            type="select"
                                            options={[{ value: "", text: "" }, { value: "y", text: "YES" }, { value: "n", text: "NO" }]}
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
})(Form_10_questions);
