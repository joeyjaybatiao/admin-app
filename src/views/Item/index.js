import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_ITEMS,
   SET_SEARCHED_ITEMS,
} from "./redux/types";

import {
   SET_PERSONNELS
} from '../Personnel/redux/types';

import {
   SET_OFFICES
} from '../Office/redux/types';

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddItem,
   UpdateItem,
} from "./redux/actions";

// core components
import ItemMainTable from "./components/ItemMainTable.js";
import ItemHeader from "./components/ItemHeader.js";
import ItemForm from "./components/ItemForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class Item extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("item/get", SET_ITEMS, 1, 10, undefined, { name: 1 });

      // props.GetList("user/get", SET_PERSONNELS, 1, 100000000000, { userType: "0" });
      // props.GetList("office/get", SET_OFFICES, 1, 100000000000, undefined, { officeID: 1 });

   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      var condition = !this.props.CheckFields(this.props.Item.values, []);
      console.log(this.props.Item);
      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Item"}
               form={<ItemForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddItem(this.toggleModal) },
                  disable: condition,
               }:{
                  type: "Update",
                  callback: this.props.UpdateItem,
                  disable: condition,
                  size: 3,
               }]}
            />

            <ItemHeader />

            <ItemMainTable
               title={"Items"}
               filter={{}}
               reducers={{ get: SET_ITEMS, search: SET_SEARCHED_ITEMS }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Item: state.Item,
})

export default connect(mapStateToProps, {
   GetList,
   AddItem,
   UpdateItem,
   CheckFields,
})(Item);
