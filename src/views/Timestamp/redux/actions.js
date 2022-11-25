import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_TIMESTAMPS,
    SET_TIMESTAMP_DETAIL,
    SET_TIMESTAMP_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetTimestampDefault = () => (dispatch) => {
    dispatch({
        type: SET_TIMESTAMP_DEFAULT,
    })
}

export const AddTimestamp = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding Timestamp"
    })
    const { values, count, toDisplay } = getState().Timestamp;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/timestamp/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                timestamp: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.timestamp

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Timestamp Successfully Added"
                });
                dispatch({
                    type: SET_TIMESTAMPS,
                    data: {
                        timestamps: (toDisplay.length <= 10)?[{...res.data.timestamp}, ...toDisplay]:[{...res.data.timestamp}, ...newList],
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

export const SetTimestampDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Timestamp;
    const timestamps = toDisplay.filter((per) => per._id == id);
    console.log(timestamps);
    dispatch({
        type: SET_TIMESTAMP_DETAIL,
        detail: {
            timestamp: [...timestamps]
        }
    })
}

export const UpdateTimestamp = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Timestamp"
    })

    const { values, count, toDisplay } = getState().Timestamp;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/timestamp/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                timestamp: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Timestamp Successfully Added"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ?values :list;
                });
                dispatch({
                    type: SET_TIMESTAMPS,
                    data: {
                        timestamps: newList,
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


