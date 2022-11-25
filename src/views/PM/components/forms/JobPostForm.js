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
    Row,
    Col,
} from "reactstrap";

const JobPostForm = (props) => {
    return (
        <>
            <Col className="order-xl-1" xl="12">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">Hiring Detail</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <div className="pl-lg-12">
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-username"
                                            >
                                                Position Title
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-username"
                                                type="text"
                                                // value={props.data.position}
                                                value={"Information System Analyst I"}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-email"
                                            >
                                                Plantilla No.
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-email"
                                                type="text"
                                                value="ODGB-INFOISA1-16-2020"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-username"
                                            >
                                                Place of Assignment
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-username"
                                                type="text"
                                                value="NEDA Caraga - ORD"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-email"
                                            >
                                                Salary Grade
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-email"
                                                type="text"
                                                value="SG-12 | ₱26,564.00"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-username"
                                            >
                                                Date Posted
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-username"
                                                type="text"
                                                value="August 11, 2021"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-email"
                                            >
                                                Date Close
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-email"
                                                type="text"
                                                value="September 11, 2021"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </div>
                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">
                                Requirements
                            </h6>
                            <Row>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Eligibility
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-username"
                                            rows="3"
                                            type="textarea"
                                            value="CS Professional Second Level Eligibility"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Educational Attainment
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-username"
                                            rows="3"
                                            type="textarea"
                                            value="Bachelors Degree relevant to the job"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Training
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-username"
                                            rows="3"
                                            type="textarea"
                                            value="None required"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Competency
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-username"
                                            rows="3"
                                            type="textarea"
                                            value="Agility; Collaboration and Promoting Inclusion; Delivering Excellent Results; Engaging Stakeholders; Strategic and Systems Thinking; Solving Problems to Achieve Results; Documenting and Facilitating Meetings; Technical/Resolution Writing; and Events Organizing"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Instructions/Remarks
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-username"
                                            rows="3"
                                            type="textarea"
                                            value="Interested and qualified applicants should signify their interest in writing. Attach the following documents to the application letter and send to the address below not later than July 5, 2021. "
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Documents:
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="input-username"
                                            rows="5"
                                            type="textarea"
                                            value="1. Fully accomplished Personal Data Sheet (PDS) with recent passport-sized picture (CS Form No. 212,
                                                Revised 2017) which can be downloaded at www.csc.gov.ph;
                                                2. Performance rating in the last rating period (if applicable);
                                                3. Photocopy of certificate of eligibility/rating/license; and
                                                4. Photocopy of Transcript of Records."
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Form>

                    </CardBody>
                </Card>
            </Col>

        </>
    );
};

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(JobPostForm);
