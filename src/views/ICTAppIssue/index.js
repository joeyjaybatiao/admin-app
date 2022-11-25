import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_ICT_APP_ISSUES,
   SET_SEARCHED_ICT_APP_ISSUES,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddICTAppIssue,
   UpdateICTAppIssue,
} from "./redux/actions";

// core components
import ICTAppIssueMainTable from "./components/ICTAppIssueMainTable.js";
import ICTAppIssueHeader from "./components/ICTAppIssueHeader.js";
import ICTAppIssueForm from "./components/ICTAppIssueForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class ICTAppIssue extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("ict/app-issue/get", SET_ICT_APP_ISSUES, 1, 10, undefined, { name: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      var condition = !this.props.CheckFields(this.props.ICTAppIssue.values, []);

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"ICTAppIssue"}
               form={<ICTAppIssueForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddICTAppIssue(this.toggleModal) },
                  disable: condition,
               }:{
                  type: "Update",
                  callback: this.props.UpdateICTAppIssue,
                  disable: condition,
                  size: 3,
               }]}
            />

            <ICTAppIssueHeader />

            <ICTAppIssueMainTable
               title={"ICTAppIssues"}
               filter={{}}
               reducers={{ get: SET_ICT_APP_ISSUES, search: SET_SEARCHED_ICT_APP_ISSUES }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   ICTAppIssue: state.ICTAppIssue,
})

export default connect(mapStateToProps, {
   GetList,
   AddICTAppIssue,
   UpdateICTAppIssue,
   CheckFields,
})(ICTAppIssue);
