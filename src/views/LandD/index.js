import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_JOB_POSTS,
   SET_SEARCHED_JOB_POSTS,
} from "./redux/types";
// core components
import LandDMainTable from "./components/LandDMainTable.js";
import LandDHeader from "./components/LandDHeader.js";

class LandD extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,

      }

      this.toggleModal = this.toggleModal.bind(this);
   }

   toggleModal() {
      this.setState({
         modal: !this.state.modal
      })
   }

   render() {

      return (
         <div className="custom-content">
            <LandDHeader/>

            <LandDMainTable
               toggleModal={this.toggleModal}
               title={"Learning And Development"}
               filter={{}}
               reducers={{ get: SET_JOB_POSTS, search: SET_SEARCHED_JOB_POSTS }}
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
})(LandD);
