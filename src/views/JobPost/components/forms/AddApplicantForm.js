import React, { useState } from 'react';
import LabelInputSearch from 'components/Helpers/LabelInputSearch';
import LabelInput from 'components/Helpers/LabelInput';
import PDFUploaderViewer from 'components/Helpers/PDFUploaderViewer';
import {
    Table,
} from 'reactstrap';

import { connect } from 'react-redux';
import {
    GetList,
    ArrangeName,
} from "store/actions/helpers/displayAction";

import {
    SET_JP_SEARCH_APPLICANT,
} from '../../redux/types';

import {
    SetSearchApplicant,
    UpdateToBeAddedApplicant,
} from '../../redux/actions';


const AddApplicantForm = (props) => {
    console.log(props.JobPost.toAddApplicants);

    const { applicants, memo, file } = props.JobPost.toAddApplicants;

    return (
        <div>
            <LabelInputSearch
                label="Search Applicant"
                list={props.JobPost.applicants}
                multiple={true}
                cbGetSearch={(val) => {
                    props.GetList("user/get", SET_JP_SEARCH_APPLICANT, 1, 10, { userType: "1", name: val });
                }}
                resetList={() => {
                    props.SetSearchApplicant([]);
                }}
                onSelect={(data) => {
                    var found = false;
                    applicants.map((a) => {
                        if (a._id == data._id) {
                            found = true;
                        }
                    });
                    console.log("!!!!!!@@@@@@@@@!!!");
                    console.log(data);
                    if (!found) {
                        props.UpdateToBeAddedApplicant(data);
                    }
                }}
            />

            <div id="taa-applicants-main-div">
                <label>Applicants</label>
                <Table responsive className="align-items-center table-flush">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col"></th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            applicants.map((row, i) => {
                                return (
                                    <tr>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            {props.ArrangeName(row.name)}
                                        </td>
                                        <td>
                                            <i className="clickable ni ni-fat-remove" onClick={() => {
                                                props.UpdateToBeAddedApplicant({ _id: row._id });
                                            }}></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>

            </div>

            <LabelInput
                label={"Memo Number"}
                value={memo}
                type="text"
                onChange={(e) => {
                    console.log(":");
                    props.UpdateToBeAddedApplicant({
                        memo: e.target.value
                    });
                }}
            />

            <PDFUploaderViewer origFile={file} wRemove={true} onSelectFile={(file) => {
                props.UpdateToBeAddedApplicant({
                    file: file
                });
            }}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    JobPost: state.JobPost,
})

export default connect(mapStateToProps, {
    GetList,
    ArrangeName,
    SetSearchApplicant,
    UpdateToBeAddedApplicant,
})(AddApplicantForm);