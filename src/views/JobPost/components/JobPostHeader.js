import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import {

} from 'store/actions/helpers/displayAction';

import {
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const JobPostHeader = (props) => {
  console.log(props.JobPost.count);
  return (

    <Fragment>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Job Posted
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          { props.JobPost.count }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Ongoing Selection
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">4</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Applicants
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">538</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Fragment>
  );
}


const mapStateToProps = (state) => ({
  JobPost: state.JobPost
})

export default connect(mapStateToProps, {

})(JobPostHeader);
