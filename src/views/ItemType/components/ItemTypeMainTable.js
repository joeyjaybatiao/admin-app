import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetItemTypeDetail,
  SetItemTypeDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const ItemTypeMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetItemTypeDefault();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "item-type/get", search: "item-type/get" }}
          dataBank = { props.ItemType }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "itemName", text: "Item"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                </tr>
              )
            },
            body: (itemType, i) => {
              return (
                <tr className="clickable" data-id={itemType._id} onClick={ async (e) => {

                  await props.SetItemTypeDetail(itemType._id);

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ itemType.itemName }</td>
                  <td scope="col">{ itemType.description }</td>
                  <td scope="col">{ itemType.price }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  ItemType: state.ItemType
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetItemTypeDetail,
  SetItemTypeDefault,
})(ItemTypeMainTable);
