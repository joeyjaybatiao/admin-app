import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_ICT_REPAIR_REQUESTS,
    SET_ICT_REPAIR_REQUEST_DETAIL,
    SET_ICT_REPAIR_REQUEST_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT, DEV } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';


export const SetICTRepairRequestDefault = () => (dispatch) => {
    dispatch({
        type: SET_ICT_REPAIR_REQUEST_DEFAULT,
    })
}

export const AddICTRepairRequest = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding ICTRepairRequest"
    })
    const { values, count, toDisplay } = getState().ICTRepairRequest;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/ict/repair-request/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                ictRepairRequest: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.ictRepairRequest

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "ICTRepairRequest Successfully Added"
                });
                dispatch({
                    type: SET_ICT_REPAIR_REQUESTS,
                    data: {
                        ictRepairRequests: (toDisplay.length <= 10)?[{...res.data.ictRepairRequest}, ...toDisplay]:[{...res.data.ictRepairRequest}, ...newList],
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

export const SetICTRepairRequestDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().ICTRepairRequest;
    const ictRepairRequests = toDisplay.filter((per) => per._id == id);
    console.log(ictRepairRequests);
    dispatch({
        type: SET_ICT_REPAIR_REQUEST_DETAIL,
        detail: {
            ictRepairRequest: [...ictRepairRequests]
        }
    })
}

export const UpdateICTRepairRequest = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating ICTRepairRequest"
    })

    const { values, count, toDisplay } = getState().ICTRepairRequest;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/ict/repair-request/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                ictRepairRequest: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "ICTRepairRequest Successfully Added"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ?values :list;
                });
                dispatch({
                    type: SET_ICT_REPAIR_REQUESTS,
                    data: {
                        ictRepairRequests: newList,
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


