import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_JOB_POSTS,
   SET_SEARCHED_JOB_POSTS,
} from "./redux/types";
import {
   SaveJobPost,
   UpdateJobPost,
   SetJobPostDefault,
   UpdateJobPostStatus,
} from "./redux/actions";

import {
   CheckFields,
   GetList,
} from "store/actions/helpers/displayAction";


// core components
import UserHeader from "components/Headers/UserHeader.js";
import DataTable from "components/Helpers/DataTable.js";
import InfoModal from "components/Helpers/InfoModal.js";

import JobPostForm from "./components/forms/JobPostForm.js";
import JobPostForm2 from "./components/forms/JobPostForm2.js";
import ApplicantsForm from "./components/forms/ApplicantsForm.js";
import ApplicantForm from "./components/forms/ApplicantForm.js";

import JobPostMainTable from "./components/JobPostMainTable.js";
import JobPostHeader from "./components/JobPostHeader.js";

class JobPost extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalApplicants: false,
         modalApplicant: false,
      }

      this.toggleModal = this.toggleModal.bind(this);
      this.toggleApplicants = this.toggleApplicants.bind(this);
      this.toggleApplicant = this.toggleApplicant.bind(this);

      props.GetList("job-post/get", SET_JOB_POSTS, 1, 10, undefined, undefined);

   }

   toggleModal() {
      this.setState({
         modal: !this.state.modal
      })
   }

   toggleApplicants() {
      this.setState({
         modalApplicants: !this.state.modalApplicants
      })
   }

   toggleApplicant() {
      this.setState({
         modalApplicant: !this.state.modalApplicant
      })
   }

   render() {

      var isComplete = this.props.CheckFields(this.props.JobPost.values, ["jobPostID", "file", "createdAt", "applicants", "__v", "status", "stage"]);
      console.log(this.props.JobPost.values);
      console.log(isComplete);
      var jobPostButtons = [(this.props.JobPost.values.hasOwnProperty("_id"))
         ? {
            type: "Update", callback: () => {
               this.props.UpdateJobPost()
            }
         }
         : {
            type: "Save", disable: !isComplete, callback: () => {
               this.props.SaveJobPost(() => { this.props.SetJobPostDefault(); this.toggleModal() })
            }
         }];
      if (this.props.JobPost.values.status == "pending") {
         jobPostButtons.push({
            type: "Post", callback: () => {
               this.props.UpdateJobPostStatus(this.props.JobPost.values._id, "posted");
            }
         })
      }

      jobPostButtons.push({ type: "PRINT" });

      var applicantsButt = [{ type: "PRINT" }];

      if (this.props.JobPost.values.status == "posted") {
         applicantsButt.unshift({
            type: "TAG",
            callback: () => {
               this.props.UpdateJobPostStatus(this.props.JobPost.values._id, "selection");
            }
         })
      }

      return (
         <div className="custom-content" >
            <JobPostHeader />
            <InfoModal
               size={"70%"}
               modal={this.state.modalApplicant}
               toggle={this.toggleApplicant}
               title={"Applicant"}
               form={<ApplicantForm />}
               buttons={[]}
            />

            <InfoModal
               size={"70%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Job"}
               form={<JobPostForm data={this.state.data} />}
               buttons={jobPostButtons}
            />

            <InfoModal
               size={"98%"}
               modal={this.state.modalApplicants}
               toggle={this.toggleApplicants}
               title={"Applicants"}
               form={<ApplicantsForm toggleApplicant={this.toggleApplicant} />}
               buttons={applicantsButt}
            />

            <JobPostMainTable
               toggleModal={this.toggleModal}
               title={"Job Posts"}
               filter={{}}
               reducers={{ get: SET_JOB_POSTS, search: SET_SEARCHED_JOB_POSTS }}
               toggle={() => {
                  this.toggleModal("update")
               }}
               toggleApplicants={() => {
                  this.toggleApplicants()
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   JobPost: state.JobPost
})

export default connect(mapStateToProps, {
   SaveJobPost,
   UpdateJobPost,
   SetJobPostDefault,
   UpdateJobPostStatus,
   CheckFields,
   GetList,
})(JobPost);
