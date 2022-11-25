import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetItemDetail,
  SetItemDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const ItemMainTable = (props) => {
  return (

    <Fragment>

      <DataTable
        addData={() => {
          props.SetItemDefault();
          props.toggle("add");
        }}
        title={props.title}
        filter={props.filter}
        api={{ get: "item/get", search: "item/get" }}
        dataBank={props.Item}
        reducers={props.reducers}
        search={{
          options: [
            { value: "itemID", text: "Item ID" },
            { value: "propertyNo", text: "Property No" },
            { value: "itemType", text: "Item Type" },
            { value: "user", text: "User" },
          ],
          select: [], suggest: false,
        }}
        table={{
          head: () => {
            return (
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Property No.</th>
                <th scope="col">User(PAR)</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
              </tr>
            )
          },
          body: (item, i) => {
            return (
              <tr className="clickable" data-id={item._id} onClick={async (e) => {

                await props.SetItemDetail(item._id);

                props.toggle("update");
              }}>
                <td scope="col">{i + 1}</td>
                <td scope="col">{item.itemType.itemName}</td>
                <td scope="col">{item.propertyNo}</td>
                <td scope="col">{(item.user.hasOwnProperty("par"))?props.ArrangeName(item.user.par.name):""}</td>
                <td scope="col">{item.location.office != null ? (item.location.office.division) : (" (" + item.location.other + ")")}</td>
                <td scope="col">{["Unserviceable", "Serviceable", "Unused", "For-Checkup", "On-Repair", "For-Deployment"][item.status * 1] + " (" + item.remarks + ")"}</td>
              </tr>
            )
          }
        }}
      />



    </Fragment>
  );
}


const mapStateToProps = (state) => ({
  Item: state.Item
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetItemDetail,
  SetItemDefault,
})(ItemMainTable);
