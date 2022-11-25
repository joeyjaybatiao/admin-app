import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Container, Row, Col, Badge, Button, } from "reactstrap";


import { FaRegEdit, FaRegCalendarPlus, } from "react-icons/fa";

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  CheckFields,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {

} from '../redux/actions';

import {
} from "../redux/types";


import DataTable from "components/Helpers/DataTable.js";
import InfoModal from "components/Helpers/InfoModal.js";
import TimestampForm from "./TimestampForm.js";

const CustomCard = ({ children, mt, id, cl, className, style }) => {
  return (
    <Col xl={cl} id={id} style={{ marginTop: mt, ...style }} className={className}>
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          {children}
        </CardBody>
      </Card>
    </Col>
  )
}

const TimestampPeriod = ({ type, time = { in: "", out: "" }, cl = 12 }) => {
  return (
    <CustomCard cl={cl} mt="10px" className="card-day ts-period">
      <CardTitle
        tag="h4"
        className="mb-0"
      >
        {type}
      </CardTitle>

      <Row>
        <CustomCard cl={6} mt="10px" className={"card-day ts-period-type" + (time.in ? " active" : "")}>
          <CardTitle
            tag="h4"
            className="mb-0"
          >
            in
          </CardTitle>

          <Row>
            {time.in || "-"}
          </Row>

        </CustomCard>
        <CustomCard cl={6} mt="10px" className={"card-day ts-period-type" + (time.out ? " active" : "")}>
          <CardTitle
            tag="h4"
            className="mb-0"
          >
            out
          </CardTitle>

          <Row>
            {time.out || "-"}
          </Row>

        </CustomCard>
      </Row>

    </CustomCard>
  )
}

const TimestampMainTable = (props) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    .map((month) => {
      return (
        <option value={month}>{month}</option>
      )
    });

  const days = (() => {
    var ds = [], i = 1;
    while (i <= 31) {
      ds.push(
        <option value={i + 1}>{i + 1}</option>
      )
      i++;
    }
    return ds;
  })();

  const [dayNumber, setDayNumber] = useState([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const currentDate = new Date();
  const yesterdDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // const today = GetDAR(currentDate);
  // const yester = GetDAR(yesterdDate);


  return (
    <Container id="timestamp" className="custom-data-table mt--7" fluid>

      <CustomCard cl={12} id="dar-main-custom-card" style={{ padding: 0 }}>

        <CardTitle
          tag="h3"
          className="mb-0"
        >
          Daily Timestamp
        </CardTitle>

        <div id='dar-filter-container'>
          <div id="dar-filter">
            <div id="df-selects">
              <select>
                <option value="">Year</option>
                <option value="2022">2022</option>
              </select>
              <select>
                <option value="">Month</option>
                {months}
              </select>
              <select>
                <option value="">Day</option>
                {days}
              </select>
            </div>
            <button className='button-orange-gradient btn btn-primary btn-md'>Filter</button>
          </div>
        </div>

        <Row style={{marginTop:"20px"}}>

            <CustomCard cl={3} mt="20px" className="card-day mb-4">
              <CardTitle
                tag="h4"
                className="mb-0"
              >
                <h2>TODAY</h2><em style={{ fontSize: "12px" }}>({props.ArrangeDate(currentDate, false)} - {dayOfWeek[currentDate.getDay()]})</em>
              </CardTitle>

              <Row>
                <TimestampPeriod type="AM" time={{ in: "08:33:123 AM", out: "12:03:123 PM" }} />
                <TimestampPeriod type="PM" time={{ in: "12:03:123 PM", out: "05:36:441 PM" }} />
                <TimestampPeriod type="OT" time={{ in: "", out: "" }} />
              </Row>

            </CustomCard>

            <CustomCard cl={3} mt="20px" className="card-day mb-4">
              <CardTitle
                tag="h4"
                className="mb-0"
              >
                <h2>YESTERDAY</h2><em style={{ fontSize: "12px" }}>({props.ArrangeDate(yesterdDate, false)} - {dayOfWeek[yesterdDate.getDay()]})</em>
              </CardTitle>

              <Row>
                <TimestampPeriod type="AM" time={{ in: "08:01:139 AM", out: "12:01:991 PM" }} />
                <TimestampPeriod type="PM" time={{ in: "12:01:991 PM", out: "05:56:611 PM" }} />
                <TimestampPeriod type="OT" time={{ in: "06:01:155 PM", out: "07:36:441 PM" }} />
              </Row>

            </CustomCard>

            {
              dayNumber.map((day) => {
                var dayTemp = new Date(new Date().getTime() - (24 * 60 * 60 * 1000 * day));
                // dayTask = GetDAR(dayTemp);

                return (
                  <CustomCard cl={3} mt="20px" className="card-day mb-4">
                    <CardTitle
                      tag="h4"
                      className="mb-0"
                    >
                      <h2>{props.ArrangeDate(dayTemp, false).toUpperCase()}</h2> {dayOfWeek[dayTemp.getDay()]}
                    </CardTitle>
                    <Row>
                      <TimestampPeriod type="AM" />
                      <TimestampPeriod type="PM" />
                      <TimestampPeriod type="OT" />
                    </Row>

                  </CustomCard>
                )
              })
            }

        </Row>


      </CustomCard>

      <Col xl="12" className='mt-3' style={{ textAlign: "center" }}>
        <Button onClick={() => {

        }}>Show More</Button>
      </Col>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  Timestamp: state.Timestamp
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  CheckFields,
  GetDetail,
})(TimestampMainTable);
