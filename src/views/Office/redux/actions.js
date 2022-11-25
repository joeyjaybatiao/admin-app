import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_OFFICES,
    SET_OFFICE_DETAIL,
    SET_OFFICE_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetOfficeDefault = () => (dispatch) => {
    dispatch({
        type: SET_OFFICE_DEFAULT,
    })
}

export const AddOffice = (cb = () => { }) => (dispatch, getState) => {
    const { values, count, toDisplay } = getState().Office;
    
    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/office/new`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    office: {
                        ...values
                    }
                }
            })
                .then((res) => {
                    // res.data.office

                    var newList = [...toDisplay];

                    if (newList.length > 10) {
                        newList.pop();
                    }

                    dispatch({
                        type: SET_OFFICES,
                        data: {
                            offices: (toDisplay.length <= 10) ? [{ ...res.data.office }, ...toDisplay] : [{ ...res.data.office }, ...newList],
                            count: count + 1
                        }
                    });

                    Delay(() => {
                        cb();
                    }, 1000);

                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        })
        , {
            loading: 'Adding Office...',
            success: 'Successfully Added',
            error: 'Failed to Add',
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 2000
        }
    }
    );
}

export const SetOfficeDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Office;
    const offices = toDisplay.filter((per) => per._id == id);
    console.log(offices);
    dispatch({
        type: SET_OFFICE_DETAIL,
        detail: {
            office: [...offices]
        }
    })
}

export const UpdateOffice = (cb = () => { }) => (dispatch, getState) => {

    const { values, count, toDisplay } = getState().Office;

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/office/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    office: {
                        ...values
                    }
                }
            })
                .then((res) => {

                    var newList = toDisplay.map((list) => {
                        return (list._id == values._id) ? values : list;
                    });
                    dispatch({
                        type: SET_OFFICES,
                        data: {
                            offices: newList,
                            count: count
                        }
                    });

                    Delay(() => {
                        cb();
                    }, 1000);

                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        })
        , {
            loading: 'Updating Office...',
            success: 'Successfully Updated',
            error: 'Failed to Update',
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 2000
        }
    }
    );
}


