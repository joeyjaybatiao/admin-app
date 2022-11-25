import React from 'react';
import { Card, CardBody, CardHeader, Container, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';
import { withRouter } from "react-router-dom";

import { ArrangeName } from 'store/actions/helpers/displayAction';

function StaffDashboard(props) {
    var ls = JSON.parse(localStorage.getItem("nro13-info"));
    var profilePic = localStorage.getItem("nro13-pp");

    return (
        <>
            <div id="staff-dashboard" className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container id="profile-container" className="mt--7" fluid>
                    <Row>
                        <Col className="mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <div className="avatar-thumbnail-profile rounded-circle clickable"
                                                style={{
                                                    backgroundImage: `url(${(profilePic != null)
                                                        ? SERVER_URI + "images/users/" + profilePic
                                                        : SERVER_URI + "images/users/male-temp.png"
                                                        })`,

                                                }}
                                                onClick={() => {
                                                    props.history.push("/my-profile");
                                                }}
                                            >
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="text-center">
                                        <h3>
                                            {props.ArrangeName(ls.name, 3)}
                                            <span className="font-weight-light">, 24</span>
                                        </h3>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    Profile: state.Profile,
})

export default withRouter(connect(mapStateToProps, {
    ArrangeName,
})(StaffDashboard));
