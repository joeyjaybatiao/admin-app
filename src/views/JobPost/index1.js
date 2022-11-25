import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   Button,
   Card,
   CardHeader,
   CardBody,
   FormGroup,
   Form,
   Input,
   Container,
   Row,
   Col,
   Badge,
   Media,
   Table,
   DropdownItem,
   DropdownToggle,
   Progress,
   UncontrolledTooltip,
   CardFooter,
   DropdownMenu,
   UncontrolledDropdown,
   Pagination,
   PaginationItem,
   PaginationLink,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Header from "components/Headers/Header-wo.js";
import DataTable from "components/Helpers/DataTable-temp.js";
import InfoModal from "components/Helpers/InfoModal.js";

import JobPostForm from "./components/forms/JobPostForm.js";
import JobPostForm2 from "./components/forms/JobPostForm2.js";
import ApplicantsForm from "./components/forms/ApplicantsForm.js";

class JobPost extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modal2: false,
         modal3: false, //Applicants
         data: {},
      }

      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggleApplicants = this.toggleApplicants.bind(this); //Applicants
      this.setSelected = this.setSelected.bind(this);


   }

   toggle(type) {
      this.setState({
         ...this.state,
         modal: !this.state.modal,
      });
   }

   toggle2(type) {
      this.setState({
         ...this.state,
         modal2: !this.state.modal2,
      });
   }

   toggleApplicants(type) {
      this.setState({
         ...this.state,
         modal3: !this.state.modal3,
      });
   }

   setSelected(data) {
      console.log(data);
      this.setState({
         ...this.state,
         data: data,
      });
   }


   render() {

      var butts = [
      ];

      console.log(this.state);

      butts.push({
         type: "Save", disable: false, callback: () => {
            alert("");
         }
      });

      return (
         <div className="custom-content">
            <Header />

            <InfoModal
               size={"70%"}
               modal={this.state.modal}
               toggle={this.toggle}
               title={"Job"}
               form={<JobPostForm data={this.state.data} />}
               buttons={butts}
            />
            <InfoModal
               size={"70%"}
               modal={this.state.modal2}
               toggle={this.toggle2}
               title={"Job"}
               form={<JobPostForm2 data={this.state.data} />}
               buttons={butts}
            />
            <InfoModal
               size={"80%"}
               modal={this.state.modal3}
               toggle={this.toggleApplicants}
               title={""}
               form={<ApplicantsForm data={this.state.data} />}
               buttons={[{
                  type: "Download", disable: false, callback: () => {
                     alert("");
                  }
               }]}
            />

            <DataTable
               actions={{
                  add: this.toggle2,
               }}
               tableTemp={{
                  name: "Job Posts",
                  header: ["Position Title", "Plantilla No.", "Place of Assignment", "Posting Date", "Closing Date", ""],
                  data: [
                     ["Information System Analyst I", "ODGB-INFOISA1-16-2020", "NEDA Caraga", "October 01, 2021", "October 31, 2021"],
                     ["Information System Analyst II", "ODGB-INFOISA2-16-2020", "NEDA Caraga", "October 01, 2021", "October 31, 2021"],
                     ["Economic Development Specialist I", "ODGB-EDSI-16-2020", "NEDA Caraga", "October 01, 2021", "October 31, 2021"],
                     ["Economic Development Specialist II", "ODGB-EDS2-16-2020", "NEDA Caraga", "October 01, 2021", "October 31, 2021"],
                  ],
                  actions: [
                     {
                        name: "Show",
                        callback: (val, i) => {
                           var data = [
                              {
                                 jobPostID: "",
                                 position: "Information System Analyst I",
                                 poa: "NEDA Caraga",
                                 plantilla: "ODGB-INFOISA1-16-2020",
                                 sg: {
                                    grade: "",
                                    salary: 12000,
                                 },
                                 date: {
                                    post: "October 01, 2021",
                                    close: "October 31, 2021",
                                 },
                                 createdAt: null,
                                 file: "",

                                 other: {
                                    eligibility: "",
                                    education: "",
                                    training: "",
                                    wEx: "",
                                    competency: "",
                                    remarks: "",
                                    documentsRequired: [{
                                       list: ""
                                    }],
                                 },
                              },
                              {
                                 jobPostID: "",
                                 position: "Information System Analyst II",
                                 poa: "NEDA Caraga",
                                 plantilla: "ODGB-INFOISA2-16-2020",
                                 sg: {
                                    grade: "",
                                    salary: 12000,
                                 },
                                 date: {
                                    post: "October 01, 2021",
                                    close: "October 31, 2021",
                                 },
                                 createdAt: null,
                                 file: "",

                                 other: {
                                    eligibility: "",
                                    education: "",
                                    training: "",
                                    wEx: "",
                                    competency: "",
                                    remarks: "",
                                    documentsRequired: [{
                                       list: ""
                                    }],
                                 },
                              },
                              {
                                 jobPostID: "",
                                 position: "Economic Development Specialist I",
                                 poa: "NEDA Caraga",
                                 plantilla: "ODGB-EDSI-16-2020",
                                 sg: {
                                    grade: "",
                                    salary: 12000,
                                 },
                                 date: {
                                    post: "October 01, 2021",
                                    close: "October 31, 2021",
                                 },
                                 createdAt: null,
                                 file: "",

                                 other: {
                                    eligibility: "",
                                    education: "",
                                    training: "",
                                    wEx: "",
                                    competency: "",
                                    remarks: "",
                                    documentsRequired: [{
                                       list: ""
                                    }],
                                 },
                              },
                              {
                                 jobPostID: "",
                                 position: "Economic Development Specialist II",
                                 poa: "NEDA Caraga",
                                 plantilla: "ODGB-EDS2-16-2020",
                                 sg: {
                                    grade: "",
                                    salary: 12000,
                                 },
                                 date: {
                                    post: "October 01, 2021",
                                    close: "October 31, 2021",
                                 },
                                 createdAt: null,
                                 file: "",

                                 other: {
                                    eligibility: "",
                                    education: "",
                                    training: "",
                                    wEx: "",
                                    competency: "",
                                    remarks: "",
                                    documentsRequired: [{
                                       list: ""
                                    }],
                                 },
                              }
                           ]
                           this.setSelected(data[i]);
                           this.toggle();
                        }
                     },
                     {
                        name: "Applicants",
                        callback: this.toggleApplicants
                     }
                  ]
               }}
            />

         </div>
      );

   }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(JobPost);
