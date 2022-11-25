import React, { Component } from "react";
import { connect } from 'react-redux';

import { SR } from "config";

// reactstrap components
import {
   SET_PERSONNELS,
} from "../Personnel/redux/types";

import {
   GetList,
} from "store/actions/helpers/displayAction";

// core components
import RandRMainTable from "./components/RandRMainTable.js";
import RandRHeader from "./components/RandRHeader.js";

class RandR extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,

      }

      props.GetList("user/get", SET_PERSONNELS, 1, 100000, { userType: "0" });
      this.toggleModal = this.toggleModal.bind(this);
   }

   toggleModal() {
      this.setState({
         modal: !this.state.modal
      })
   }

   render() {

      console.log(SR.data.row);
      var employees = {};

      SR.data.row.map((row, i) => {



         if (employees.hasOwnProperty("emp-" + row.emp_id)) {
            employees["emp-" + row.emp_id].sr.push(row)
         } else {
            employees["emp-" + row.emp_id] = {
               owner: {},
               sr: [row]
            };
         }

      });

      this.props.Personnel.toDisplay.map((per) => {

         if (employees.hasOwnProperty("emp-" + per.userID * 1)) {
            employees["emp-" + per.userID * 1] = {
               ...employees["emp-" + per.userID * 1],
               owner: {
                  id: per._id,
                  name: per.name
               },
               name: per.username
            }
         }

      })
      console.log("====================================");
      console.log(Object.keys(employees));
      console.log(employees);

      return (
         <div className="custom-content">
            <RandRHeader />

            {/* <RandRMainTable
               toggleModal={this.toggleModal}
               title={"Rewards and Recognitions"}
               filter={{}}
               reducers={{ get: SET_JOB_POSTS, search: SET_SEARCHED_JOB_POSTS }}
               toggle={() => {
                  this.toggleModal("update")
               }}
            /> */}
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Personnel: state.Personnel,
})

export default connect(mapStateToProps, {
   GetList,
})(RandR);
