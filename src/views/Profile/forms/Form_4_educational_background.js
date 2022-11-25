import React, { Component } from "react";
import { connect } from 'react-redux';
import { COURSES } from 'config';

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
import { UpdateEducation, SaveInfoUpdates, } from '../redux/actions';
class Form_2_educational_background extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: [],
        }
    }

    render() {
        console.log(this.props.pValues.pds.education);

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
                                            this.props.SaveInfoUpdates();
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
                                            onClick={(e) => this.props.UpdateEducation()}
                                            size="sm"
                                        >
                                            Add Education
                                        </Button>
                                    </Col>
                                </h6>
                                <div className="pl-lg-4">
                                    {
                                        this.props.pValues.pds.education.map((edu, i) => {
                                            var courses = [{ text: "Select Basic Education/Degree/Course", value: "" }];
                                            console.log(COURSES);

                                            var belong = (edu.degree == "")?true:false;

                                            COURSES[edu.level || "Elementary"].map((c, i) => {
                                                courses.push({
                                                    text: c,
                                                    value: c,
                                                })

                                                if (c == edu.degree) {
                                                    belong = true;
                                                }
                                            });

                                            courses.push({
                                                text: "Other",
                                                value: "Other",
                                            })

                                            return (
                                                <Row style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)", marginBottom: "10px", paddingBottom: "10px" }}>
                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Level"}
                                                            prop={"pds.education." + i + ".level"}
                                                            value={edu.level}
                                                            type="select"
                                                            options={[
                                                                { text: "Elementary", value: "Elementary" },
                                                                { text: "Secondary", value: "Secondary" },
                                                                { text: "College", value: "College" },
                                                                { text: "Post-Grad Diploma", value: "Diploma" },
                                                                { text: "Master", value: "Master" },
                                                                { text: "Doctor", value: "Doctor" },
                                                            ]}
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                this.props.SetValue(e, SET_PROFILE_DATA);
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Name of School"}
                                                            prop={"pds.education." + i + ".school"}
                                                            value={edu.school}
                                                            type="text"
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                this.props.SetValue(e, SET_PROFILE_DATA);
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Basic Education/Degree/Course"}
                                                            prop={"pds.education." + i + ".degree"}
                                                            value={edu.degree}
                                                            type="select"
                                                            options={courses}
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                var c = [...this.state.courses];
                                                                c[i] = e.target.value;

                                                                this.setState({
                                                                    courses: c
                                                                })

                                                                if (c[i] == "Other") {
                                                                    this.props.SetValue({
                                                                        target: {
                                                                            value: "",
                                                                            getAttribute: (p) => {
                                                                                return {"data-prop": "pds.education." + i + ".degree", "data-type":undefined, "data-case":undefined}[p];
                                                                            }
                                                                        },
                                                                        nativeEvent: {
                                                                            data: e.nativeEvent.data,
                                                                            ininputType: e.nativeEvent.inputType,
                                                                        }
                                                                    }, SET_PROFILE_DATA);
                                                                } else {
                                                                    this.props.SetValue(e, SET_PROFILE_DATA);
                                                                }
                                                            }}
                                                        />
                                                        {
                                                            (this.state.courses[i] == "Other" || !belong)
                                                                ? <LabelInput
                                                                    label={"Specify Education/Degree/Course"}
                                                                    prop={"pds.education." + i + ".degree"}
                                                                    value={edu.degree}
                                                                    type="text"
                                                                    req={1}
                                                                    placeholder=""
                                                                    onChange={(e) => {
                                                                        this.props.SetValue(e, SET_PROFILE_DATA);
                                                                    }}
                                                                />
                                                                : ""
                                                        }

                                                    </Col>


                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Period of Attendance(From)"}
                                                            prop={"pds.education." + i + ".period.from"}
                                                            value={this.props.GetDate(new Date(edu.period.from || ""))}
                                                            type="date"
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                this.props.SetValue(e, SET_PROFILE_DATA);
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Period of Attendance(To)"}
                                                            prop={"pds.education." + i + ".period.to"}
                                                            value={this.props.GetDate(new Date(edu.period.to || ""))}
                                                            type="date"
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                this.props.SetValue(e, SET_PROFILE_DATA);
                                                            }}
                                                        />
                                                    </Col>

                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Highest Level/Units Earned"}
                                                            prop={"pds.education." + i + ".unitsEarned"}
                                                            value={edu.unitsEarned}
                                                            type="text"
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                this.props.SetValue(e, SET_PROFILE_DATA);
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Year Graduated"}
                                                            prop={"pds.education." + i + ".yearGraduated"}
                                                            value={edu.yearGraduated}
                                                            type="text"
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                this.props.SetValue(e, SET_PROFILE_DATA);
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col lg="6">
                                                        <LabelInput
                                                            label={"Scholarship/Academic Honors Received"}
                                                            prop={"pds.education." + i + ".academicHonor"}
                                                            value={edu.academicHonor}
                                                            type="text"
                                                            req={1}
                                                            placeholder=""
                                                            onChange={(e) => {
                                                                this.props.SetValue(e, SET_PROFILE_DATA);
                                                            }}
                                                        />
                                                    </Col>

                                                    <Col xs="12" style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <Button
                                                            color="primary"
                                                            onClick={(e) => this.props.UpdateEducation('-', i)}
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
};

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    pValues: state.Profile.values
})

export default connect(mapStateToProps, {
    SetValue,
    GetDate,
    UpdateEducation,
    SaveInfoUpdates,
})(Form_2_educational_background);
