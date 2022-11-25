import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
   ArrangeDate,
   ArrangeName,
   GetList,
   GetDetail,
} from 'store/actions/helpers/displayAction';

import {
   SetApplicantDetail,
   SetApplicantDefault,
} from '../redux/actions';

import {
   SET_APPLICANT_DETAIL,
} from '../redux/types';

import DataTable from "components/Helpers/DataTable.js";

const ApplicantMainTable = (props) => {
   return (

      <Fragment>

         <DataTable
            addData={() => {
               props.SetApplicantDefault();
               props.toggleAddModal();
            }}
            title={props.title}
            filter={props.filter}
            api={{ get: "user/get", search: "user/get" }}
            dataBank={props.Applicant}
            reducers={props.reducers}
            search={{
               options: [{ value: "name", text: "Name" }, { value: "userID", text: "Applicant ID" }],
               select: [], suggest: false,
            }}
            table={{
               head: () => {
                  return (
                     <tr>
                        <th scope="col">#</th>
                        <th scope="col">Applicant ID</th>
                        <th scope="col">Applicant</th>
                        <th scope="col">Applied Jobs</th>
                     </tr>
                  )
               },
               body: (applicant, i) => {
                  console.log(applicant);
                  return (
                     <tr className="clickable" data-id={applicant._id} onClick={async (e) => {

                        props.GetDetail("user/get-user-detail", SET_APPLICANT_DETAIL, applicant._id)
                           .then(data => {
                              console.log(data);
                              // props.toggle();
                           });

                        await props.SetApplicantDetail(applicant._id);

                        props.toggle();

                     }}>
                        <td scope="col">{i + 1}</td>
                        <td scope="col">{applicant.userID}</td>
                        <td scope="col">{props.ArrangeName(applicant.name)}</td>
                        <td scope="col">{applicant.appliedJobs.length}</td>
                     </tr>
                  )
               }
            }}
         />



      </Fragment>
   );
}


const mapStateToProps = (state) => ({
   Applicant: state.Applicant
})

export default connect(mapStateToProps, {
   ArrangeDate,
   ArrangeName,
   GetList,
   GetDetail,
   SetApplicantDetail,
   SetApplicantDefault,
})(ApplicantMainTable);
