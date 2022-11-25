import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_ITEM_TYPES,
   SET_SEARCHED_ITEM_TYPES,
} from "./redux/types";

import {
   GetList,
   CheckFields,
} from "store/actions/helpers/displayAction";
import {
   AddItemType,
   UpdateItemType,
} from "./redux/actions";

// core components
import ItemTypeMainTable from "./components/ItemTypeMainTable.js";
import ItemTypeHeader from "./components/ItemTypeHeader.js";
import ItemTypeForm from "./components/ItemTypeForm.js";
import InfoModal from "components/Helpers/InfoModal.js";

class ItemType extends Component {

   constructor(props) {
      super(props);

      this.state = {
         modal: false,
         modalType: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

      props.GetList("item-type/get", SET_ITEM_TYPES, 1, 10, undefined, { name: 1 });


   }

   toggleModal(type) {
      this.setState({
         modal: !this.state.modal,
         modalType: type,
      })
   }

   render() {

      var condition = !this.props.CheckFields(this.props.ItemType.values, []);

      return (
         <div className="custom-content">
            <InfoModal
               size={"40%"}
               modal={this.state.modal}
               toggle={this.toggleModal}
               title={"Item Type"}
               form={<ItemTypeForm/>}
               buttons={[(this.state.modalType == "add")?{
                  type: "Add",
                  callback: () => { this.props.AddItemType(this.toggleModal) },
                  disable: condition,
               }:{
                  type: "Update",
                  callback: this.props.UpdateItemType,
                  disable: condition,
                  size: 3,
               }]}
            />

            <ItemTypeHeader />

            <ItemTypeMainTable
               title={"Item Types"}
               filter={{}}
               reducers={{ get: SET_ITEM_TYPES, search: SET_SEARCHED_ITEM_TYPES }}
               toggle={(type) => {
                  this.toggleModal(type)
               }}
            />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   ItemType: state.ItemType,
})

export default connect(mapStateToProps, {
   GetList,
   AddItemType,
   UpdateItemType,
   CheckFields,
})(ItemType);
