import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetICTRepairRequestDetail,
  SetICTRepairRequestDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const ICTRepairRequestMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetICTRepairRequestDefault();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "ict/repair-request/get", search: "ict/repair-request/get" }}
          dataBank = { props.ICTRepairRequest }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "name", text: "Name"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ICTRepairRequest</th>
                </tr>
              )
            },
            body: (ictRepairRequest, i) => {
              return (
                <tr className="clickable" data-id={ictRepairRequest._id} onClick={ async (e) => {

                  await props.SetICTRepairRequestDetail(ictRepairRequest._id);

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ ictRepairRequest.ictRepairRequestID }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  ICTRepairRequest: state.ICTRepairRequest
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetICTRepairRequestDetail,
  SetICTRepairRequestDefault,
})(ICTRepairRequestMainTable);
