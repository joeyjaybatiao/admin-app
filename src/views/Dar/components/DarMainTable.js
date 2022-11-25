import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Container, Row, Col, Badge, Button, } from "reactstrap";


import { FaRegEdit, FaRegCalendarPlus, FaClipboardList } from "react-icons/fa";

import {
   ArrangeDate,
   ArrangeName,
   GetList,
   CheckFields,
   GetDetail,
} from 'store/actions/helpers/displayAction';

import {
   SetDarDetail,
   SetDarDefault,
   AddDar,
   UpdateDar,
   SetDarProps,
} from '../redux/actions';

import {
   SET_DARS_APPEND,
} from "../redux/types";


import DataTable from "components/Helpers/DataTable.js";
import InfoModal from "components/Helpers/InfoModal.js";
import DarForm from "./DarForm.js";


const CustomCard = ({ children, mt, id, cl = 12, className, style, key }) => {
   return (
      <Col xl={cl} id={id} style={{ marginTop: mt, ...style }} className={className} key={key}>
         <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
               {children}
            </CardBody>
         </Card>
      </Col>
   )
}

const Accomplishment = ({ num, task, date, toggleModal, SetDarDetail, key}) => {
   return (
      <CustomCard cl="4" key={key}>
         <div className='dar-content'>
            <FaRegEdit onClick={() => {
               // props.SetDarProps("date", new Date(today.date))
               console.log("************************************");
               console.log(num);
               toggleModal();
               SetDarDetail({ ...task, date: date }, num);
            }} />

            <Badge color="primary">#{num + 1} | {task.percentage}%</Badge> <br /> <br />

            <span className='text-muted'>Deliverable</span>
            <p>{task.deliverable}</p><br />

            <span className='text-muted'>Outcome</span>
            <p>{task.outcome}</p><br />

            <span className='text-muted'>Remarks</span>
            <p>{task.remarks}</p>

         </div>
      </CustomCard>
   )
}

const DarMainTable = (props) => {
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

   const GetDAR = (day) => {
      var found = {};

      for (let x = 0, len = props.Dar.toDisplay.length; x < len; x++) {
         if (new Date(props.Dar.toDisplay[x].date).setHours(0, 0, 0, 0) === new Date(day).setHours(0, 0, 0, 0)) {
            found = props.Dar.toDisplay[x];
            break;
         }
      }

      return found;
   }

   const [modal, toggleModal] = useState(false);
   const [modalType, toggleModalType] = useState("add");
   const [dateInterval, setDateInterval] = useState(11);
   const [dayNumber, setDayNumber] = useState([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
   const currentDate = new Date();
   const yesterdDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
   const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const today = GetDAR(currentDate);
   const yester = GetDAR(yesterdDate);
   var dayTask = {};


   return (
      <Container className="custom-data-table mt--7" fluid>

         <InfoModal
            size={"30%"}
            modal={modal}
            toggle={() => {
               toggleModal(!modal);
            }}
            title={"Task"}
            form={<DarForm modalType={modalType} />}
            buttons={[
               (modalType == "add")
                  ? {
                     type: "Add",
                     callback: () => {
                        props.AddDar(() => {
                           toggleModal(!modal);
                        });
                     },
                     disable: !props.CheckFields(props.Dar.values, []),
                  }
                  : {
                     type: "Save",
                     callback: () => {
                        props.UpdateDar();
                     },
                     disable: !props.CheckFields(props.Dar.values, []),
                  }
            ]}
         />

         <CustomCard id="dar-main-custom-card" style={{ padding: 0 }} key={"dmcc-0"}>

            <CardTitle
               tag="h3"
               className="mb-0"
            >
               Daily Accomplishment Report
            </CardTitle>

            <div id='dar-filter-container'>
               <div id="dar-filter">
                  <input type="text" placeholder='Search Keyword'></input>
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

            <CustomCard mt="40px" className="card-day" key={"mcc-0"}>
               <CardTitle
                  tag="h4"
                  className="mb-0"
               >
                  Today - <em style={{ fontSize: "12px" }}>({props.ArrangeDate(currentDate, false)} - {dayOfWeek[currentDate.getDay()]})</em>
               </CardTitle>
               <FaRegCalendarPlus onClick={() => {
                  props.SetDarProps("date", currentDate)

                  toggleModal(!modal);
                  toggleModalType("add");

               }} /><br />

               <FaClipboardList style={{marginRight: "30px"}} onClick={() => {
                
               }} /><br />

               <Row>
                  {
                     (today.hasOwnProperty("accomplishments"))
                        ? today.accomplishments.map((task, i) => {
                           return (
                              <Accomplishment task={task} num={i} date={currentDate} key={"today-" + i}
                                 toggleModal={() => {
                                    toggleModal(!modal);
                                    toggleModalType("update");
                                 }}
                                 SetDarDetail={props.SetDarDetail}
                              />
                           )
                        })
                        : ""
                  }
               </Row>

            </CustomCard>

            <CustomCard mt="10px" className="card-day" key={"mcc-1"}>
               <CardTitle
                  tag="h4"
                  className="mb-0"
               >
                  Yesterday - <em style={{ fontSize: "12px" }}>({props.ArrangeDate(yesterdDate, false)} - {dayOfWeek[yesterdDate.getDay()]})</em>
               </CardTitle>
               <FaRegCalendarPlus onClick={() => {
                  props.SetDarProps("date", yesterdDate)

                  toggleModal(!modal);
                  toggleModalType("add");

               }} /><br />
               <Row>
                  {
                     (yester.hasOwnProperty("accomplishments"))
                        ? yester.accomplishments.map((task, i) => {
                           return (
                              <Accomplishment task={task} num={i} date={yesterdDate} key={"yesterday-" + i}
                                 toggleModal={() => {
                                    toggleModal(!modal);
                                    toggleModalType("update");
                                 }}
                                 SetDarDetail={props.SetDarDetail}
                              />
                           )
                        })
                        : ""
                  }
               </Row>

            </CustomCard>

            {
               dayNumber.map((day, i) => {
                  var dayTemp = new Date(new Date().getTime() - (24 * 60 * 60 * 1000 * day));
                  dayTask = GetDAR(dayTemp);

                  return (
                     <CustomCard mt="10px" className="card-day" key={"ccday-" + i}>
                        <CardTitle
                           tag="h4"
                           className="mb-0"
                        >
                           {props.ArrangeDate(dayTemp, false)} - {dayOfWeek[dayTemp.getDay()]}
                        </CardTitle>
                        <FaRegCalendarPlus onClick={() => {
                           props.SetDarProps("date", dayTemp)

                           toggleModal(!modal);
                           toggleModalType("add");

                        }} /><br />
                        <Row>
                           {
                              (dayTask.hasOwnProperty("accomplishments"))
                                 ? dayTask.accomplishments.map((task, i2) => {
                                    return (
                                       <Accomplishment task={task} num={i2} date={dayTemp} key={"sdates-" + i2}
                                          toggleModal={() => {
                                             toggleModal(!modal);
                                             toggleModalType("update");
                                          }}
                                          SetDarDetail={props.SetDarDetail}
                                       />
                                    )
                                 })
                                 : ""
                           }
                        </Row>

                     </CustomCard>
                  )
               })
            }


         </CustomCard>

         <Col xl="12" className='mt-3' style={{ textAlign: "center" }}>
            <Button onClick={() => {
               var lDate = new Date();
               lDate.setDate(lDate.getDate() - dateInterval);
               lDate.setHours(8, 0, 0, 0);

               var gDate = new Date();
               gDate.setDate(gDate.getDate() - (dateInterval + 10));
               gDate.setHours(8, 0, 0, 0);

               // var d2 = new Date();
               // d2.setDate(d2.getDate() - 11 - (dateInterval + 10));
               // d2.setHours(8, 0, 0, 0);

               props.GetList("dar/get-mine", SET_DARS_APPEND, 1, 10, { gDate: gDate, lDate: lDate }, { date: -1 })
                  .then(res => {
                     var temp = [];

                     for (let x = 2; x < (dateInterval + 11); x++) {
                        temp.push(x);
                     }
                     setDayNumber(temp);
                     setDateInterval(dateInterval + 10);

                  })

            }}>Show More</Button>
         </Col>
      </Container>
   );
}


const mapStateToProps = (state) => ({
   Dar: state.Dar
})

export default connect(mapStateToProps, {
   ArrangeDate,
   ArrangeName,
   GetList,
   CheckFields,
   GetDetail,
   SetDarDetail,
   SetDarDefault,
   AddDar,
   UpdateDar,
   SetDarProps,
})(DarMainTable);
