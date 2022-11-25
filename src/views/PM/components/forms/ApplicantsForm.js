import React from "react";
import { connect } from 'react-redux';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

import DataTable from "components/Helpers/DataTable.js";


const ApplicantsForm = (props) => {
    return (
        <div style={{marginTop: "70px"}}>
            <DataTable
                actions={{
                    add: null,
                }}
                tableTemp={{
                    name: "Applicants",
                    header: ["Name of Applicant", "Gender", "Age", "Education", "Training", "Experience", "Position applied", "Contact Info", "Remarks", ""],
                    data: [
                        ["IKris Jane E. De Rama", "Female", 33, "MSU-Iligan Institute of Technology; BS Chemical Engineering", "MSU-Iligan Institute of Technology; BS Chemical Engineering", "Project Development Specialist at Provincial Planning and Development Office-ADN on Sept. 2019 to Present;", "Sr. EDS", "0921-5444-082 / kris janederama@yahoo.com", "Cum Laude", ""],
                        ["Christfrendhower C. Hidalgo", "Male", 23, "Caraga State University, BS in Geodetic Eng.", "Introduction to Microeconomics on April 8-19, 2020 by Saylor. Org (E-Learning)", "Supervising Geodetic Enginner at ROMCAS Mapping and Eng. on January. 18, 2020 to Present; Deputy Area Coordinator-Geodetic Engineer at DSWD KALAHI CIDSS F.O. Caraga on June 11", "Sr. EDS", "0956-862-5999 and 0946-353-2851", "", ""],
                    ],
                    actions: [
                        {
                            name: "Show",
                            callback: (val, i) => {
                            }
                        },

                    ]
                }}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(ApplicantsForm);
