import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_JOB_POSTS,
   SET_SEARCHED_JOB_POSTS,
} from "./redux/types";
// core components
import PMMainTable from "./components/PMMainTable.js";
import PMHeader from "./components/PMHeader.js";

class PM extends Component {

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
            <PMHeader/>

            <PMMainTable
               toggleModal={this.toggleModal}
               title={"Performance Management"}
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
})(PM);
