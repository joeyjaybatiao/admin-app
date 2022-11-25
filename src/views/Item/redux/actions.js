import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_ITEMS,
    SET_ITEM_DETAIL,
    SET_ITEM_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT, DEV, DEV_TYPES } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetItemDefault = () => (dispatch) => {
    dispatch({
        type: SET_ITEM_DEFAULT,
    })
}

export const AddItem = (cb = () => { }) => (dispatch, getState) => {
    const { values, count, toDisplay } = getState().Item;

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/item/new`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    item: {
                        ...values
                    }
                }
            })
                .then((res) => {
                    // res.data.item
                    if (res.data.success || res.data.status) {

                        var newList = [...toDisplay];

                        if (newList.length > 10) {
                            newList.pop();
                        }

                        dispatch({
                            type: SET_ITEMS,
                            data: {
                                items: (toDisplay.length <= 10) ? [{ ...res.data.item }, ...toDisplay] : [{ ...res.data.item }, ...newList],
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
            loading: 'Adding Item...',
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

export const SetItemDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Item;
    const items = toDisplay.filter((per) => per._id == id);
    console.log(items);
    dispatch({
        type: SET_ITEM_DETAIL,
        detail: {
            item: [...items]
        }
    })
}

export const UpdateItem = (cb = () => { }) => (dispatch, getState) => {
    const { values, count, toDisplay } = getState().Item;

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/item/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    item: {
                        ...values
                    }
                }
            })
                .then((res) => {
                    if (res.data.success || res.data.status) {
                        var newList = toDisplay.map((list) => {
                            return (list._id == values._id) ? values : list;
                        });
                        dispatch({
                            type: SET_ITEMS,
                            data: {
                                items: newList,
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
        }), {
        loading: 'Updatin Item...',
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

export const UploadItems = () => (dispatch, getState) => {

    var personnels = getState().Personnel.toDisplay;
    var offices = getState().Office.toDisplay;

    var items = [], newItem = {}, rem = "";
    var name = "", spl = [], abbr = "";
    var names = {
        RD: {
            name: "Priscilla Respecia Sonido",
            id: "627215b30201d0228833692e"
        },
        PRIS: {
            name: "Priscilla Respecia Sonido",
            id: "627215b30201d0228833692e"
        },
        ARD: {
            name: "Gemima Asis Olam",
            id: "627215b40201d0228833693a"
        },
        VSD: {
            name: "venus",
            id: "627215b80201d022883369ee"
        },
        DAB: {
            name: "Dona",
            id: "627215ba0201d02288336a48"
        },
        KCSJ: {
            name: "keysa",
            id: "627215b60201d0228833698e",
        },
        FRCV: {
            name: "Molong",
            id: "627215b70201d022883369b2"
        },
        MMS: {
            name: "Marchelle",
            id: "627215b50201d02288336970"
        },
        MAR: {
            name: "Marchelle",
            id: "627215b50201d02288336970"
        },
        KJDR: {
            name: "KJEDR",
            id: "627215b50201d02288336961"
        },
        PRSG: {
            name: "Boging",
            id: "627215b40201d0228833694f"
        },
        GBC: {
            name: "Junjie",
            id: "627215b60201d02288336997"
        },
        JCL: {
            name: "JC",
            id: "627215ba0201d02288336a45"
        },
        ESL: {
            name: "Elsie",
            id: "627215b70201d022883369c1"
        },
        EOC: {
            name: "Elsie Casora",
            id: "627215b70201d022883369be"
        }
    };
    for (let x = 0; x < personnels.length; x++) {
        if (personnels[x].status == "active") {
            name = (personnels[x].name.first + " " + personnels[x].name.mid + " " + personnels[x].name.last).trim(" ");
            spl = name.split("  ").join(" ").split(" ");
            for (let y = 0; y < spl.length; y++) {
                abbr += spl[y][0];
            }
            console.log("++++++++++++++++++++++++++++");
            console.log(personnels[x].name.first + " " + personnels[x].name.mid + " " + personnels[x].name.last);
            console.log(abbr);
            console.log(personnels[x]._id);

            names[abbr.toUpperCase()] = {
                name: (personnels[x].name.first + " " + personnels[x].name.mid + " " + personnels[x].name.last),
                id: personnels[x]._id
            };
        }
        abbr = "";
    }

    // console.log(names);
    // console.log(DEV);
    // console.log(personnels);
    // console.log(offices);

    DEV.map(d => {

        newItem = {
            no: d.no * 1,
            propertyNo: d.prepertyNumber,
            remarks: d.remarks,
            category: "ICT", //ICT, etc.
            type: d.type2,
            // user: null,
            ics: d.ics,
            date: (d.date != "") ? new Date(d.date) : "", //date purchased
        };

        // Assign Status
        rem = d.remarks.toLowerCase();
        if (rem.includes("unserviceable")) {
            newItem.status = "0";
        } else if (rem.includes("unuseed") || rem.includes("unused") || rem == "") {
            newItem.status = "2";
        } else if (rem.includes("serviceable")) {
            newItem.status = "1";
        } else if (rem.includes("deploy")) {
            newItem.status = "5";
        } else if (rem.includes("check")) {
            newItem.status = "3";
        } else {
            console.log(rem);
        }


        // Assign itemType
        for (let x = 0; x < DEV_TYPES.length; x++) {
            if (DEV_TYPES[x].itemName == d.article && DEV_TYPES[x].description == d.description) {
                newItem.itemType = DEV_TYPES[x]._id;
            }
        }

        // Assign Offices
        var found = false;
        for (let x = 0; x < offices.length; x++) {
            if (offices[x].division == d.location.toUpperCase()) {

                newItem.location = {
                    office: offices[x]._id,
                    other: "",
                };
                found = true;
            }
        }
        if (!found) {
            newItem.location = {
                office: null,
                other: d.location.toUpperCase(),
            };
        }

        // Assign User

        spl = d.user.toUpperCase().trim(" ").split("-").join(" ").split("/").join(" ").split(" ");
        // console.log(spl);
        if (names.hasOwnProperty(spl[0])) {
            newItem.user = {
                par: names[spl[0]].id,
            };
            if (spl.length > 1) {
                newItem.user = {
                    par: names[spl[0]].id,
                    co: names[spl[1]].id,
                };
            }
        } else {
            newItem.user = {
                par: null,
                co: null,
            };
        }


        // console.log(newItem);

        items.push(newItem)

    });

    console.log(items);

    // for (let x = 0; x < items.length;x++) {

    //     new Promise((resolve, reject) => {
    //         axios({
    //             url: `${SERVER_API}/item/new`,
    //             method: 'POST',
    //             headers: {
    //                 'content-type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem(JWT)}`
    //             },
    //             data: {
    //                 item: {
    //                     ...items[x]
    //                 }
    //             }
    //         })
    //             .then((res) => {
    //                 console.log("=================================== " + x);
    //                 console.log(res);

    //             })
    //             .catch(err => {
    //                 reject();
    //             })
    //     });
    // }


}

