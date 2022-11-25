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
import { UpdateTraining, SaveInfoUpdates, } from '../redux/actions';

const Form_8_learning_and_development = (props) => {
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
                                        onClick={(e) => props.UpdateTraining()}
                                        size="sm"
                                    >
                                        Add L&D
                                    </Button>
                                </Col>
                            </h6>
                            <div className="pl-lg-4">
                                {
                                    props.pValues.pds.trainings.map((data, i) => {

                                        return (
                                            <Row style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)", marginBottom: "10px", paddingBottom: "10px" }}>
                                                <Col lg="12">
                                                    <LabelInput
                                                        label={"Title of Learning and Development Interventions/Training Programs"}
                                                        prop={"pds.trainings." + i + ".name"}
                                                        value={data.name}
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
                                                        label={"Inclusive Dates(From)"}
                                                        prop={"pds.trainings." + i + ".inclusive.from"}
                                                        value={props.GetDate(new Date(data.inclusive.from || ""))}
                                                        type="date"
                                                        req={1}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            props.SetValue(e, SET_PROFILE_DATA);
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg="4">
                                                    <LabelInput
                                                        label={"Inclusive Dates(To)"}
                                                        prop={"pds.trainings." + i + ".inclusive.to"}
                                                        value={props.GetDate(new Date(data.inclusive.to || ""))}
                                                        type="date"
                                                        req={1}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            props.SetValue(e, SET_PROFILE_DATA);
                                                        }}
                                                    />
                                                </Col>

                                                <Col lg="4">
                                                    <LabelInput
                                                        label={"Number of Hours"}
                                                        prop={"pds.trainings." + i + ".hours"}
                                                        value={data.hours}
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
                                                        label={"Type of L&D"}
                                                        prop={"pds.trainings." + i + ".type"}
                                                        value={data.type}
                                                        type="select"
                                                        options={[{ value: "managerial", text: "Managerial" }, { value: "Supervisory", text: "Supervisory" }, { value: "Technical", text: "Technical" }]}
                                                        req={1}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            props.SetValue(e, SET_PROFILE_DATA);
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg="8">
                                                    <LabelInput
                                                        label={"Position/Nature of Work"}
                                                        prop={"pds.trainings." + i + ".position"}
                                                        value={data.position}
                                                        type="text"
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
                                                        onClick={(e) => props.UpdateTraining('-', i)}
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
    UpdateTraining,
    SaveInfoUpdates,
})(Form_8_learning_and_development);
