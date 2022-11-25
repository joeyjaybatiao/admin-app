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
import { UpdateVoluntaryWork, SaveInfoUpdates, } from '../redux/actions';

const Form_7_voluntary_work = (props) => {
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
                                        onClick={(e) => props.UpdateVoluntaryWork()}
                                        size="sm"
                                    >
                                        Add Voluntary Work
                                    </Button>
                                </Col>
                            </h6>
                            <div className="pl-lg-4">
                                {
                                    props.pValues.pds.voluntary.map((data, i) => {

                                        return (
                                            <Row style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)", marginBottom: "10px", paddingBottom: "10px" }}>
                                                <Col lg="12">
                                                    <LabelInput
                                                        label={"Name & Address of Organization (Write in full)"}
                                                        prop={"pds.voluntary." + i + ".name"}
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
                                                        prop={"pds.voluntary." + i + ".inclusive.from"}
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
                                                        prop={"pds.voluntary." + i + ".inclusive.to"}
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
                                                        prop={"pds.voluntary." + i + ".hours"}
                                                        value={data.hours}
                                                        type="text"
                                                        req={1}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            props.SetValue(e, SET_PROFILE_DATA);
                                                        }}
                                                    />
                                                </Col>

                                                <Col lg="12">
                                                    <LabelInput
                                                        label={"Position/Nature of Work"}
                                                        prop={"pds.voluntary." + i + ".position"}
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
                                                        onClick={(e) => props.UpdateVoluntaryWork('-', i)}
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
    UpdateVoluntaryWork,
    SaveInfoUpdates,
})(Form_7_voluntary_work);
