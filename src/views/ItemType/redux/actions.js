import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_ITEM_TYPES,
    SET_ITEM_TYPE_DETAIL,
    SET_ITEM_TYPE_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT, DEV, DEV_TYPES } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';


export const UploadItems = () => () => {

    var itemTypes = [];

    console.log(DEV);

    DEV.map(d => {
        var found = false;

        for (let x = 0; x < itemTypes.length; x++) {
            if (itemTypes[x].itemName == d.article && itemTypes[x].description == d.description) {
                found = true;
            }
        }

        if (!found) {
            itemTypes.push({
                itemName: d.article,
                description: d.description,
                price: d.unitValue,
            })
        }
    });

    console.log(itemTypes);
    console.log(DEV_TYPES);
    var added = [];

    // for (let x = 0; x < itemTypes.length; x++) {

    //     new Promise((resolve, reject) => {
    //         axios({
    //             url: `${SERVER_API}/item-type/new`,
    //             method: 'POST',
    //             headers: {
    //                 'content-type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem(JWT)}`
    //             },
    //             data: {
    //                 itemType: {
    //                     ...itemTypes[x]
    //                 }
    //             }
    //         })
    //             .then((res) => {
    //                 console.log("=================================== " + x);
    //                 console.log(res);
    //                 added.push(res.data.itemType);

    //                 if (x == itemTypes.length - 1) {
    //                     console.log(added);
    //                     console.log(JSON.stringify(added));
    //                 }
    //             })
    //             .catch(err => {
    //                 reject();
    //             })
    //     });
    // }


}

export const SetItemTypeDefault = () => (dispatch) => {
    dispatch({
        type: SET_ITEM_TYPE_DEFAULT,
    })
}

export const AddItemType = (cb = () => { }) => (dispatch, getState) => {

    const { values, count, toDisplay } = getState().ItemType;

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/item-type/new`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    itemType: {
                        ...values
                    }
                }
            })
                .then((res) => {
                    if (res.data.success) {

                        var newList = [...toDisplay];

                        if (newList.length > 10) {
                            newList.pop();
                        }

                        dispatch({
                            type: SET_ITEM_TYPES,
                            data: {
                                itemTypes: (toDisplay.length <= 10) ? [{ ...res.data.itemType }, ...toDisplay] : [{ ...res.data.itemType }, ...newList],
                                count: count + 1
                            }
                        });

                        Delay(() => {
                            cb();
                        }, 1000);
                        resolve();
                    } else {
                        reject();
                    }

                })
                .catch(err => {
                    reject(err);
                })
        })
        , {
            loading: 'Updating Role...',
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

export const SetItemTypeDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().ItemType;
    const itemTypes = toDisplay.filter((per) => per._id == id);
    console.log(itemTypes);
    dispatch({
        type: SET_ITEM_TYPE_DETAIL,
        detail: {
            itemType: [...itemTypes]
        }
    })
}

export const UpdateItemType = (cb = () => { }) => (dispatch, getState) => {

    const { values, count, toDisplay } = getState().ItemType;

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/item-type/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    itemType: {
                        ...values
                    }
                }
            })
                .then((res) => {
                    if (res.data.status) {

                        var newList = toDisplay.map((list) => {
                            return (list._id == values._id) ? values : list;
                        });
                        dispatch({
                            type: SET_ITEM_TYPES,
                            data: {
                                itemTypes: newList,
                                count: count
                            }
                        });

                        Delay(() => {
                            cb();
                        }, 1000);

                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    reject(err);
                })
        })
        , {
            loading: 'Updating Item Type...',
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


