import {
    SET_APPLICANT_DEFAULT,
    SET_APPLICANT_DETAIL,
} from './types';
// import { SERVER_API, JWT } from '../config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SERVER_API, JWT } from 'config';
import {
    Delay,
} from 'store/actions/helpers/alertAction';

export const SetApplicantDefault = () => (dispatch, getState) => {
    dispatch({
        type: SET_APPLICANT_DEFAULT,
    })
}

export const SetApplicantDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Applicant;
    const applicant = toDisplay.filter((per) => per._id == id);

    dispatch({
        type: SET_APPLICANT_DETAIL,
        detail: {
            applicant: [...applicant]
        }
    })
}

export const TempApply = () => (dispatch, getState) => {

    var { values } = getState().Applicant;

    toast.promise(

        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/apply`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    job: "626a38c833bf3f7808d7b5a7",
                    applicant: values._id,
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Sending Application...',
            success: 'Application Sent',
            error: 'Failed to Apply',
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 3000
        }
    }
    );

}

export const AddApplicant = (cb = () => {}) => (dispatch, getState) => {

    var { values } = getState().Applicant;

    console.log(values);

    toast.promise(

        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/new-applicant`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    name: values.name,
                    email: values.pds.personalInfo.contact.email,
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.success || res.data.status) {
                        dispatch({
                            type: SET_APPLICANT_DEFAULT,
                        })
                        Delay(() => {
                            cb();
                        }, 1000);
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Adding Applicant...',
            success: 'Applicant Added',
            error: 'Failed to Add',
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 3000
        }
    }
    );

}
