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

const JobPostForm2 = (props) => {
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
                                                value={""}
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
                                                value=""
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
                                                value=""
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
                                                value=""
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
                                                value=""
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
                                                value=""
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
                                            value=""
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
                                            value=""
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
                                            value=""
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
                                            value=""
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
                                            value=""
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
                                            value=""
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
})(JobPostForm2);
