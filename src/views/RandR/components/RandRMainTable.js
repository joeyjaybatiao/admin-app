import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const RandRMainTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetRoleDefault();
            props.toggleModal("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "job-post/get", search: "job-post/get" }}
          dataBank = { props.JobPost }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "name", text: "Role"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Role</th>
                </tr>
              )
            },
            body: (role, i) => {

              return (
                <tr className="clickable" data-id={role._id} onClick={ async (e) => {

                  await props.SetRoleDetail(role._id);

                  props.toggle();

                  // props.GetDetail("role/detail", SET_ROLE_DETAIL, role._id)
                  //   .then(data => {
                  //     // props.toggle();
                  //   });
                }}>
                  <td scope="col">{ i + 1 }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  JobPost: state.JobPost
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
})(RandRMainTable);
