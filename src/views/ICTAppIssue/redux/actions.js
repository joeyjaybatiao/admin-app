import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_ICT_APP_ISSUES,
    SET_ICT_APP_ISSUE_DETAIL,
    SET_ICT_APP_ISSUE_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetICTAppIssueDefault = () => (dispatch) => {
    dispatch({
        type: SET_ICT_APP_ISSUE_DEFAULT,
    })
}

export const AddICTAppIssue = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding ICT App Issue"
    })
    const { values, count, toDisplay } = getState().ICTAppIssue;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/ict/app-issue/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                ictAppIssue: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.ictAppIssue

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "ICT App Issue Successfully Added"
                });
                dispatch({
                    type: SET_ICT_APP_ISSUES,
                    data: {
                        ictAppIssues: (toDisplay.length <= 10)?[{...res.data.ictAppIssue}, ...toDisplay]:[{...res.data.ictAppIssue}, ...newList],
                        count: count + 1
                    }
                });

                Delay(() => {
                    cb();
                }, 1000);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const SetICTAppIssueDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().ICTAppIssue;
    const ictAppIssues = toDisplay.filter((per) => per._id == id);
    console.log(ictAppIssues);
    dispatch({
        type: SET_ICT_APP_ISSUE_DETAIL,
        detail: {
            ictAppIssue: [...ictAppIssues]
        }
    })
}

export const UpdateICTAppIssue = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating ICT App Issue"
    })

    const { values, count, toDisplay } = getState().ICTAppIssue;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/ict/app-issue/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                ictAppIssue: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "ICT App Issue Successfully Added"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ?values :list;
                });
                dispatch({
                    type: SET_ICT_APP_ISSUES,
                    data: {
                        ictAppIssues: newList,
                        count: count
                    }
                });

                Delay(() => {
                    cb();
                }, 1000);
            })
            .catch(err => {
                reject(err);
            })
    })
}


