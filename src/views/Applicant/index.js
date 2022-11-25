import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_APPLICANTS,
   SET_SEARCHED_APPLICANTS,
} from "./redux/types";

import {
   GetList,
} from "store/actions/helpers/displayAction";

import {
   TempApply,
   AddApplicant,
} from './redux/actions';

// core components
import ApplicantMainTable from "./components/ApplicantMainTable.js";
import ApplicantHeader from "./components/ApplicantHeader.js";
import ApplicantForm from "./components/ApplicantForm.js";
import ApplicantAddForm from "./components/ApplicantAddForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Applicant extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         addModal: false,

      }

      this.toggleModal = this.toggleModal.bind(this);
      this.toggleAddModal = this.toggleAddModal.bind(this);

      props.GetList("user/get", SET_APPLICANTS, 1, 10, { userType: "1" });

   }

   toggleModal() {
      this.setState({
         modal: !this.state.modal
      })
   }

   toggleAddModal() {
      this.setState({
         addModal: !this.state.addModal
      })
   }

   render() {

      return (
         <div className="custom-content">
            <ApplicantHeader />

            <InfoModal
               size={"80%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Applicant"}
               form={<ApplicantForm />}
               // buttons={[{
               //    type: "Apply", disable: false, callback: () => {
               //       this.props.TempApply()
               //    }
               //  }]}
               buttons={[]}
            />

            <InfoModal
               size={"40%"}
               modal={this.state.addModal}
               toggle={this.toggleAddModal}
               title={"Add Applicant"}
               form={<ApplicantAddForm />}
               buttons={[{
                  type: "Add", disable: false, callback: () => {
                     this.props.AddApplicant(() => {
                        this.toggleAddModal();
                     })
                  }
                }]}
            />

            <ApplicantMainTable
               toggleModal={this.toggleModal}
               toggleAddModal={this.toggleAddModal}
               title={"Applicants"}
               filter={{ userType: "1" }}
               reducers={{ get: SET_APPLICANTS, search: SET_SEARCHED_APPLICANTS }}
               toggle={() => {
                  this.toggleModal("update")
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
   GetList,
   TempApply,
   AddApplicant,
})(Applicant);
