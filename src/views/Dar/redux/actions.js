import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_DARS,
    SET_DAR_DETAIL,
    SET_DAR_DEFAULT,
    SET_DAR_BACKLOGS,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import {
    GetDate,
} from 'store/actions/helpers/dateAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';


export const SetDarDefault = () => (dispatch) => {
    dispatch({
        type: SET_DAR_DEFAULT,
    })
}

export const SetDarProps = (name, value) => (dispatch, getState) => {
    const { values } = getState().Dar;

    dispatch({
        type: SET_DAR_DETAIL,
        detail: {
            dar: [{
                ...values,
                [name]: value
            }]
        }
    })
}

export const AddDar = (cb = () => { }) => (dispatch, getState) => {
    const { values, toDisplay } = getState().Dar;
    var d = GetDate(new Date(values.date), 0, "y-m-d", "-")();
    var found = null;

    for (let x = 0, len = toDisplay.length; x < len; x++) {
        if (new Date(toDisplay[x].date).setHours(0, 0, 0, 0) === new Date(d).setHours(0, 0, 0, 0)) {
            found = toDisplay[x];
            break;
        }
    }

    if (!found) {
        toast.promise(
            new Promise((resolve, reject) => {
                axios({
                    url: `${SERVER_API}/dar/new`,
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(JWT)}`
                    },
                    data: {
                        dar: {
                            ...values,
                            date: d,
                        },
                    }
                })
                    .then(res => {
                        if (res.data.status) {
                            Delay(() => {
                                cb();
                                dispatch({
                                    type: SET_DAR_DEFAULT,
                                })
                            }, 1000);
                            resolve();

                            dispatch({
                                type: SET_DARS,
                                data: {
                                    dars: [...toDisplay, {
                                        ...res.data.dar
                                    }],
                                    count: toDisplay.length,
                                }
                            })
                        } else {
                            reject();
                        }
                    })
                    .catch(err => {
                        reject();
                    })
            })
            , {
                loading: 'Adding DAR...',
                success: 'Successfully Added',
                error: 'Failed to Add',
            }, {
            loading: {
                duration: Infinity
            },
            success: {
                duration: 3000
            }
        });

    } else {
        toast.promise(
            new Promise((resolve, reject) => {
                axios({
                    url: `${SERVER_API}/dar/update`,
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(JWT)}`
                    },
                    data: {
                        dar: {
                            ...found,
                            accomplishments: [...found.accomplishments, {
                                deliverable: values.deliverable,
                                outcome: values.outcome,
                                percentage: values.percentage,
                                remarks: values.remarks,
                            }]
                        }
                    }
                })
                    .then((res) => {
                        if (res.data.status) {
                            resolve();
                            Delay(() => {
                                cb();
                                dispatch({
                                    type: SET_DAR_DEFAULT,
                                });
                            }, 1000);

                            dispatch({
                                type: SET_DARS,
                                data: {
                                    dars: toDisplay.map((dar, i) => {
                                        return (found._id != dar._id)
                                            ? dar
                                            : {
                                                ...found,
                                                accomplishments: [...found.accomplishments, {
                                                    deliverable: values.deliverable,
                                                    outcome: values.outcome,
                                                    percentage: values.percentage,
                                                    remarks: values.remarks,
                                                }]
                                            };
                                    }),
                                    count: toDisplay.length,
                                }
                            })


                        } else {
                            reject();
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            , {
                loading: 'Updating DAR...',
                success: 'Successfully Updated',
                error: 'Failed to Update',
            }, {
            loading: {
                duration: Infinity
            },
            success: {
                duration: 3000
            }
        });
    }

}

export const SetDarDetail = (dar, ind) => (dispatch, getState) => {

    if (typeof dar == "string") { //determine if ID
        const { toDisplay } = getState().Dar;
        const dar = toDisplay.filter((per) => per._id == dar);
    } else {
        dar = [dar];
    }

    dispatch({
        type: SET_DAR_DETAIL,
        detail: {
            dar: [...dar],
            index: ind
        }
    })
}

export const UpdateDar = (cb = () => { }) => (dispatch, getState) => {

    const { values, count, toDisplay, darIndex } = getState().Dar;
    var date1 = new Date(values.date).setHours(0, 0, 0, 0), date2 = null;

    var darDate = toDisplay.filter(dar => new Date(dar.date).setHours(0, 0, 0, 0) == date1)[0];

    darDate.accomplishments[darIndex] = {
        deliverable: values.deliverable,
        outcome: values.outcome,
        percentage: values.percentage,
        remarks: values.remarks,
    }

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/dar/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    dar: {
                        ...darDate,
                    }
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        resolve();

                        dispatch({
                            type: SET_DARS,
                            data: {
                                dars: toDisplay.map((dar, i) => {
                                    return (darDate._id != dar._id)
                                        ? dar
                                        : {
                                            ...darDate,
                                        };
                                }),
                                count: toDisplay.length,
                            }
                        })


                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    reject(err);
                })
        })
        , {
            loading: 'Saving ...',
            success: 'Successfully Saved',
            error: 'Failed to Save',
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 3000
        }
    });
}


export const GetBacklogs = (cb = () => { }) => (dispatch, getState) => {
    console.log("A");
    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/dar/get-backlogs`,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
        })
            .then((res) => {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(res);

                if (res.success) {
                    dispatch({
                        type: SET_DAR_BACKLOGS,
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    })
}


