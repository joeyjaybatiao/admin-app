import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_TIMESTAMPS,
   SET_SEARCHED_TIMESTAMPS,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddTimestamp,
   UpdateTimestamp,
} from "./redux/actions";

// core components
import TimestampMainTable from "./components/TimestampMainTable.js";
import TimestampHeader from "./components/TimestampHeader.js";
import TimestampForm from "./components/TimestampForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Timestamp extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("timestamp/get", SET_TIMESTAMPS, 1, 10, undefined, { name: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      // var condition = !this.props.CheckFields(this.props.Timestamp.values, []);

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Timestamp"}
               form={<TimestampForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddTimestamp(this.toggleModal) },
                  disable: false,
               }:{
                  type: "Update",
                  callback: this.props.UpdateTimestamp,
                  disable: false,
                  size: 3,
               }]}
            />

            <TimestampHeader />

            <TimestampMainTable
               title={"Timestamps"}
               filter={{}}
               reducers={{ get: SET_TIMESTAMPS, search: SET_SEARCHED_TIMESTAMPS }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Timestamp: state.Timestamp,
})

export default connect(mapStateToProps, {
   GetList,
   AddTimestamp,
   UpdateTimestamp,
   CheckFields,
})(Timestamp);
