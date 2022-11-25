import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from 'store/actions/helpers/displayAction';

import {
  ConfirmAction,
} from 'store/actions/helpers/alertAction';

import {
  SetJobPostDetail,
  SetJobPostDefault,
  RetrieveApplicants,
} from '../redux/actions';

import DataTable from "components/Helpers/DataTable.js";

const JobPostMainTable = (props) => {
  return (

    <Fragment>

      <DataTable
        addData={() => {
          props.toggleModal("add");
          props.SetJobPostDefault();
        }}
        title={props.title}
        filter={props.filter}
        api={{ get: "job-post/get", search: "job-post/get" }}
        dataBank={props.JobPost}
        reducers={props.reducers}
        search={{
          options: [{ value: "jobPostID", text: "ID" }, { value: "position", text: "Position" }, { value: "plantilla", text: "Plantilla" }],
          select: [], suggest: false,
        }}
        table={{
          head: () => {
            return (
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Position</th>
                <th scope="col">Plantilla</th>
                <th scope="col">Date Posted</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Applicants</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            )
          },
          body: (jobPost, i) => {

            return (
              <tr className="clickable" data-id={jobPost._id} onClick={async (e) => {
                if (e.target.id != "exc") {
                  await props.SetJobPostDetail(jobPost._id);

                  props.toggle();

                }

                // props.GetDetail("role/detail", SET_ROLE_DETAIL, role._id)
                //   .then(data => {
                //     // props.toggle();
                //   });
              }}>
                <td scope="col">{i + 1}</td>
                <td scope="col">{jobPost.jobPostID}</td>
                <td scope="col">{jobPost.position}</td>
                <td scope="col">{jobPost.plantilla}</td>
                <td scope="col">{props.ArrangeDate(jobPost.date.post, false)}</td>
                <td scope="col">{props.ArrangeDate(jobPost.date.close, false)}</td>
                <td scope="col">{jobPost.applicants.length}</td>
                <td scope="col">{jobPost.status}</td>
                <td scope="col" id="exc">
                  <UncontrolledDropdown id="exc">
                    <DropdownToggle
                      id="exc"
                      className="btn-icon-only text-light"
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      <i id="exc" className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu id="exc" className="dropdown-menu-arrow" right>
                      <DropdownItem
                        id="exc"
                        onClick={async (e) => {
                          await props.SetJobPostDetail(jobPost._id);

                          props.toggle();
                        }}
                      >
                        View
                      </DropdownItem>
                      <DropdownItem
                        id="exc"
                        onClick={async (e) => {
                          props.RetrieveApplicants(jobPost._id, () => {
                            props.toggleApplicants();
                          })
                        }}
                      >
                        Applicants
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
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
  ConfirmAction,
  SetJobPostDetail,
  SetJobPostDefault,
  RetrieveApplicants,
})(JobPostMainTable);
