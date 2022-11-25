import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
} from "reactstrap";

import { SERVER_URI } from 'config';
import {
    UpdateApplicantRating,
} from '../../redux/actions';

const RatingForm = (props) => {
    const appID = (props.applicant.hasOwnProperty("applicant")) ? props.applicant.applicant._id : "";
    const [ratings, setRatings] = useState((props.applicant.hasOwnProperty("ratings")) ? { ...props.applicant.ratings } : {
        js: {
            r: 0,
            w: 0,
        },
        bei: {
            r: 0,
            w: 0,
        },
        essay: {
            r: 0,
            w: 0,
        },
        studies: 0,
        honor: 0,
        awards: 0,
        work: 0,
    });

    const ArrangeRatings = (props, val) => {
        props = props.split(".");
        var r = { ...ratings };

        if (props.length == 1) {
            r[props[0]] = val * 1;
        } else if (props.length == 2) {
            r[props[0]][props[1]] = val * 1;
        }
        setRatings(r);
    }

    const GetGrandTotal = ({ js, bei, essay, studies, honor, awards, work }) => {
        return (js.r * js.w) + (bei.r * bei.w) + (essay.r * essay.w) + studies + honor + awards + work;
    }

    const Rank = (arr) => {
        const sorted = [...new Set(arr)].sort((a, b) => b - a);
        const rank = new Map(sorted.map((x, i) => [x, i + 1]));
        return arr.map((x) => rank.get(x));
    }

    var ids = [], scores = [];
    props.JobPost.values.applicants.map((app) => {
        if (app.status == "selected" || app.status == "top" || app.status == "exam-passer") {
            ids.push(app.applicant._id);
            if (app.applicant._id == appID) {
                app.ratings = ratings
            }
            scores.push((app.ratings) ? GetGrandTotal(app.ratings) : 0);
        }
    })

    var rank = Rank(scores);

    return (
        <div id="comp-ass-rating">
            <Row className='car-total'>
                <Col md="4">
                    <Card className="shadow">
                        <CardHeader>
                            Grand Total
                        </CardHeader>
                        <CardBody>
                            {GetGrandTotal(ratings)}
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="shadow">
                        <CardHeader>
                            Equivalent Rating (%)
                        </CardHeader>
                        <CardBody>
                            {GetGrandTotal(ratings) * 100}
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="shadow">
                        <CardHeader>
                            Ranking
                        </CardHeader>
                        <CardBody>
                            {rank[ids.indexOf(appID)]}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <br />
            <hr />
            <Row>
                <Col md="4">
                    <Card className="shadow">
                        <CardHeader>
                            Job Simulation (20%)
                        </CardHeader>
                        <CardBody className="car-numbers">
                            <Row>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Rating
                                        </CardHeader>
                                        <CardBody>
                                            <input onChange={(e) => {
                                                ArrangeRatings("js.r", e.target.value);
                                            }} type="number" value={ratings.js.r} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Weight
                                        </CardHeader>
                                        <CardBody>
                                            <input onChange={(e) => {
                                                ArrangeRatings("js.w", e.target.value);
                                            }} type="number" value={ratings.js.w} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Total
                                        </CardHeader>
                                        <CardBody>
                                            {(ratings.js.r * 1) * (ratings.js.w * 1)}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            Behavioral Event Interview (30%)
                        </CardHeader>
                        <CardBody className="car-numbers">
                            <Row>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Rating
                                        </CardHeader>
                                        <CardBody>
                                            <input onChange={(e) => {
                                                ArrangeRatings("bei.r", e.target.value);
                                            }} type="number" value={ratings.bei.r} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Weight
                                        </CardHeader>
                                        <CardBody>
                                            <input onChange={(e) => {
                                                ArrangeRatings("bei.w", e.target.value);
                                            }} type="number" value={ratings.bei.w} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Total
                                        </CardHeader>
                                        <CardBody>
                                            {(ratings.bei.r * 1) * (ratings.bei.w * 1)}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            Essay (20%)
                        </CardHeader>
                        <CardBody className="car-numbers">
                            <Row>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Rating
                                        </CardHeader>
                                        <CardBody>
                                            <input onChange={(e) => {
                                                ArrangeRatings("essay.r", e.target.value);
                                            }} type="number" value={ratings.essay.r} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Weight
                                        </CardHeader>
                                        <CardBody>
                                            <input onChange={(e) => {
                                                ArrangeRatings("essay.w", e.target.value);
                                            }} type="number" value={ratings.essay.w} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="shadow">
                                        <CardHeader>
                                            Total
                                        </CardHeader>
                                        <CardBody>
                                            {(ratings.essay.r * 1) * (ratings.essay.w * 1)}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="car-2nd-part">
                <Col md="3">
                    <Card className="shadow">
                        <CardHeader>
                            Post graduate studies
                            <p>(10%)</p>
                        </CardHeader>
                        <CardBody>
                            <input onChange={(e) => {
                                ArrangeRatings("studies", e.target.value);
                            }} type="number" value={ratings.studies} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3">
                    <Card className="shadow">
                        <CardHeader>
                            Honor Graduate
                            <p>(2.5%)</p>
                        </CardHeader>
                        <CardBody>
                            <input onChange={(e) => {
                                ArrangeRatings("honor", e.target.value);
                            }} type="number" value={ratings.honor} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3">
                    <Card className="shadow">
                        <CardHeader>
                            Awards Received
                            <p>(2.5%)</p>
                        </CardHeader>
                        <CardBody>
                            <input onChange={(e) => {
                                ArrangeRatings("awards", e.target.value);
                            }} type="number" value={ratings.awards} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3">
                    <Card className="shadow">
                        <CardHeader>
                            Relevant Work Experience
                            <p>(15% max)</p>
                        </CardHeader>
                        <CardBody>
                            <input onChange={(e) => {
                                ArrangeRatings("work", e.target.value);
                            }} type="number" value={ratings.work} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <br />
            <Col className="download-button" sm="12" style={{ display: "flex", justifyContent: "end", padding: 0, marginTop: "15px" }}>
                <button id="applicants-react-to-excel-button" style={{ marginLeft: "10px" }} class="button-download" type="button"
                    onClick={() => {
                        props.UpdateApplicantRating(ratings, props.JobPost.values._id, appID)
                    }}
                >Save</button>
            </Col>
        </div>
    );
}

const mapStateToProps = (state) => ({
    JobPost: state.JobPost
})

export default connect(mapStateToProps, {
    UpdateApplicantRating,
})(RatingForm);
