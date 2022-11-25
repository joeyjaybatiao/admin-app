import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  SetICTAppIssueDetail,
  SetICTAppIssueDefault,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const ICTAppIssueMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetICTAppIssueDefault();
            props.toggle("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "ictAppIssue/get", search: "ictAppIssue/get" }}
          dataBank = { props.ICTAppIssue }
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
                  <th scope="col">ICTAppIssue</th>
                </tr>
              )
            },
            body: (ictAppIssue, i) => {
              return (
                <tr className="clickable" data-id={ictAppIssue._id} onClick={ async (e) => {

                  await props.SetICTAppIssueDetail(ictAppIssue._id);

                  props.toggle("update");
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ ictAppIssue.ictAppIssueID }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  ICTAppIssue: state.ICTAppIssue
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetICTAppIssueDetail,
  SetICTAppIssueDefault,
})(ICTAppIssueMainTable);
