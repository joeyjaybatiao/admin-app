import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_ICT_REPAIR_REQUESTS,
   SET_SEARCHED_ICT_REPAIR_REQUESTS,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddICTRepairRequest,
   UpdateICTRepairRequest,
} from "./redux/actions";

// core components
import ICTRepairRequestMainTable from "./components/ICTRepairRequestMainTable.js";
import ICTRepairRequestHeader from "./components/ICTRepairRequestHeader.js";
import ICTRepairRequestForm from "./components/ICTRepairRequestForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class ICTRepairRequest extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("ict/repair-request/get", SET_ICT_REPAIR_REQUESTS, 1, 10, undefined, { name: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      var condition = !this.props.CheckFields(this.props.ICTRepairRequest.values, []);

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"ICT Repair Request"}
               form={<ICTRepairRequestForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddICTRepairRequest(this.toggleModal) },
                  disable: condition,
               }:{
                  type: "Update",
                  callback: this.props.UpdateICTRepairRequest,
                  disable: condition,
                  size: 3,
               }]}
            />

            <ICTRepairRequestHeader />

            <ICTRepairRequestMainTable
               title={"ICT Repair Requests"}
               filter={{}}
               reducers={{ get: SET_ICT_REPAIR_REQUESTS, search: SET_SEARCHED_ICT_REPAIR_REQUESTS }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   ICTRepairRequest: state.ICTRepairRequest,
})

export default connect(mapStateToProps, {
   GetList,
   AddICTRepairRequest,
   UpdateICTRepairRequest,
   CheckFields,
})(ICTRepairRequest);
