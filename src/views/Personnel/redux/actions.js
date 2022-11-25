import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SaveFile,
} from 'store/actions/helpers/displayAction';

import {
    SET_PERSONNELS,
    SET_PERSONNEL_DETAIL,
    SET_PERSONNEL_DEFAULT,
    SET_NEW_PERSONNEL_AVATAR,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT, PRE } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetPersonneDefault = () => (dispatch, getState) => {
    console.log(getState().Personnel);
    dispatch({
        type: SET_PERSONNEL_DEFAULT,
    })
}

export const SetPersonnelDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Personnel;
    const personnel = toDisplay.filter((per) => per._id == id);

    dispatch({
        type: SET_PERSONNEL_DETAIL,
        detail: {
            personnel: [...personnel]
        }
    })
}

export const AddPersonnel = (cb = () => { }) => (dispatch, getState) => {

    const { values, count, toDisplay, tempAvatar } = getState().Personnel;
    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/new`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    ...values
                }
            })
                .then((res) => {
                    if (res.data.success) {

                        var spl = (tempAvatar.file) ? tempAvatar.file.name.split(".") : "";
                        var fileName = (values.name.last.toLowerCase().split(" ").join("-")) + "-" + (values.name.first.toLowerCase().split(" ").join("-")) + "-" + "avatar" + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

                        SaveFile('user/upload-file', fileName, fileName, "avatar", tempAvatar.file, [{ name: "userId", value: res.data.user._id }])
                            .then((res2) => {

                                var newList = [...toDisplay];
                                var newUser = {
                                    ...res.data.user,
                                    files: res2.files
                                };

                                if (newList.length > 10) {
                                    newList.pop();
                                }

                                dispatch({
                                    type: CHANGE_ALERT,
                                    resType: "success",
                                    msg: "Personnel Successfully Added"
                                });
                                dispatch({
                                    type: SET_PERSONNELS,
                                    data: {
                                        users: (toDisplay.length <= 10) ? [newUser, ...toDisplay] : [newUser, ...newList],
                                        count: count + 1
                                    }
                                });
                                dispatch({
                                    type: SET_PERSONNEL_DETAIL,
                                    detail: {
                                        personnel: [...newUser]
                                    }
                                })

                                Delay(() => {
                                    dispatch({
                                        type: SET_NEW_PERSONNEL_AVATAR,
                                        file: null,
                                        base64: "",
                                    });
                                    cb();
                                }, 1000);
                            })
                            .catch(err => {
                            })

                        resolve();
                    } else {
                        reject();
                    }

                })
                .catch(err => {
                    reject();
                })
        })
        , {
            loading: 'Adding Peronnel...',
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

export const UpdatePersonnel = (cb = () => { }) => (dispatch, getState) => {

    const { values, count, toDisplay, tempAvatar } = getState().Personnel;

    console.log({
        ...values,
        office: (typeof values.office == "object") ? values.office._id : values.office,
        role: (typeof values.role == "object") ? values.role._id : values.role,
    });

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    ...values,
                    office: (typeof values.office == "object") ? values.office._id : values.office,
                    role: (typeof values.role == "object") ? values.role._id : values.role,
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        if (tempAvatar.file) {
                            var spl = (tempAvatar.file) ? tempAvatar.file.name.split(".") : "";
                            var fileName = (values.name.last.toLowerCase().split(" ").join("-")) + "-" + (values.name.first.toLowerCase().split(" ").join("-")) + "-" + "-profile-picture-" + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

                            SaveFile('user/upload-file', fileName, fileName, "avatar", tempAvatar.file, [{ name: "userId", value: values._id }])
                                .then((res2) => {
                                    console.log(res2);

                                    var newValues = { ...values, files: res2.files };

                                    var newList = toDisplay.map((list) => {
                                        return (list._id == values._id) ? newValues : list;
                                    });

                                    dispatch({
                                        type: SET_PERSONNEL_DETAIL,
                                        detail: {
                                            personnel: [newValues]
                                        }
                                    })

                                    Delay(() => {
                                        dispatch({
                                            type: SET_NEW_PERSONNEL_AVATAR,
                                            file: null,
                                            base64: "",
                                        });
                                        cb();
                                    }, 1000);
                                    resolve();
                                })
                                .catch(err => {
                                    reject();
                                })
                        } else {
                            var newList = toDisplay.map((list) => {
                                return (list._id == values._id) ? values : list;
                            });

                            dispatch({
                                type: SET_PERSONNELS,
                                data: {
                                    users: newList,
                                    count: count
                                }
                            });
                            resolve();

                            Delay(() => {
                                cb();
                            }, 1000);
                        }
                    } else {
                        reject();
                    }

                })
                .catch(err => {
                })
        })
        , {
            loading: 'Updating Peronnel...',
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

export const SetPersonnelAvatar = (file, base64) => (dispatch, getState) => {
    dispatch({
        type: SET_NEW_PERSONNEL_AVATAR,
        file: file,
        base64: base64,
    });
}


export const UploadEmployeeList = (list, offices) => (dispatch, getState) => {

    console.log(list);
    var divisions = {
        ORD: "6242a6b259c49e2e70ea13cb",
        OD: "6242a6f759c49e2e70ea13d0",
        PDIPBD: "6242a6d259c49e2e70ea13cd",
        KMD: "6242a6da59c49e2e70ea13ce",
        PMED: "6242a6ea59c49e2e70ea13cf",
        PPFD: "6242a6c059c49e2e70ea13cc",
    };

    var finalList = [];
    list = list.map(l => {
        if (l.fname != "(NULL)" && l.fname != "na") {
            finalList.push({
                userID: l.emp_id,
                username: l.fname.toLowerCase() + "." + l.lname.toLowerCase(),
                password: "",
                userType: "0",

                name: {
                    first: l.fname,
                    mid: l.mname,
                    last: l.lname,
                    ext: "",
                    nickname: l.nick_name,
                },

                designation: l.position_id,
                status: l.work_status,
                office: divisions[l.division_id],
                role: "5ec4e549e783e810cc209ad6",

                pds: {
                    personalInfo: {
                        birth: {
                            date: (l.birth_date == "0000-00-00")?null:l.birth_date,
                            place: (typeof l.birth_place == "object")?"":l.birth_place,
                        },
                        citizenship: {
                            type: (typeof l.citizenship == "object")?"":l.citizenship,
                            by: "",
                            details: "",
                        },
                        sex: (typeof l.gender == "object")?"":l.gender,
                        cStatus: (typeof l.civil_status == "object")?"":l.civil_status,
                        address: [
                            {
                                block: (typeof l.residential_address == "object")?"":l.residential_address,
                                street: "",
                                village: "",
                                brgy: "",
                                cm: "",
                                province: "",
                                zipcode: (typeof l.residential_zip_code == "object")?"":l.residential_zip_code,
                            },
                            {
                                block: (typeof l.permanent_address == "object")?"":l.permanent_address,
                                street: "",
                                village: "",
                                brgy: "",
                                cm: "",
                                province: "",
                                zipcode: (typeof l.permanent_zip_code == "object")?"":l.permanent_zip_code,
                            }
                        ],
                        height: (typeof l.height == "object")?"":l.height,//meter
                        weight: (typeof l.weight == "object")?"":l.weight,//kg
                        blood: (typeof l.blood_type == "object")?"":l.blood_type,
                        contact: {
                            telephone: (typeof l.residential_tel_no == "object")?"":l.residential_tel_no,
                            mobile: (typeof l.cell_no == "object")?"":l.cell_no,
                            email: (typeof l.e_mail_add == "object")?"":l.e_mail_add,
                        },
                        ids: {
                            gsis: (typeof l.GSIS == "object")?"":l.GSIS,
                            pagibig: (typeof l.Pag_ibig == "object")?"":l.Pag_ibig,
                            philhealth: (typeof l.Philhealth == "object")?"":l.Philhealth,
                            sss: (typeof l.SSS == "object")?"":l.SSS,
                            tin: (typeof l.TIN == "object")?"":l.TIN,
                            agency: (typeof l.emp_id == "object")?"":l.emp_id,
                            other: {
                                name: "",
                                number: "",
                                date: "",
                                place: "",
                            },
                        }
                    },
                    family: {
                        spouse: {
                            first: (typeof l.spouse_firstname == "object")?"":l.spouse_firstname,
                            mid: (typeof l.spouse_middlename == "object")?"":l.spouse_middlename,
                            last: (typeof l.spouse_surname == "object")?"":l.spouse_surname,
                            ext: "",
                            occupation: {
                                name: "",
                                employer: "",
                                address: "",
                                telephone: "",
                            },
                        },
                        children: [],
                        father: {
                            first: (typeof l.father_firstname == "object")?"":l.father_firstname,
                            mid: (typeof l.father_middlename == "object")?"":l.father_middlename,
                            last: (typeof l.father_surname == "object")?"":l.father_surname,
                            ext: "",
                            dob: (l.father_birthday == "0000-00-00")?null:l.father_birthday,
                        },
                        mother: {
                            first: (typeof l.mother_firstname == "object")?"":l.mother_firstname,
                            mid: (typeof l.mother_middlename == "object")?"":l.mother_middlename,
                            last: (typeof l.mother_surname == "object")?"":l.mother_surname,
                            dob: (l.mother_birthday == "0000-00-00")?null:l.mother_birthday,
                        },
                    },
                },
                
                officeInternalInfo: {
                    dtrType: l.default_dtr_type,
                    earning: {
                        credits: l.earning_credits,
                        special: l.earning_special,
                    },
                    empTypeID: l.emp_type_id,
                    governmentDate: (l.government_date == "0000-00-00")?null:l.government_date,
                    hireDate: (l.hire_date == "0000-00-00")?null:l.hire_date,
                    identification: l.identification,
                    inactivity: {
                        date: l.inactivity_date,
                        reason: (typeof l.inactivity_reason == "object")?"":l.inactivity_reason
                    },
                    oneStatus: l.one_status,
                    ot: {
                        current: l.ot_current_year,
                        previous: l.ot_previous_year,
                    },
                    oneStatus: l.one_status,
                },
            })
        }
    })
    console.log("LETS GO");
    console.log(finalList);

    // for (let x = 0; x < finalList.length;x++) {

    //     new Promise((resolve, reject) => {
    //         axios({
    //             url: `${SERVER_API}/user/new`,
    //             method: 'POST',
    //             headers: {
    //                 'content-type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem(JWT)}`
    //             },
    //             data: {
    //                 ...finalList[x]
    //             }
    //         })
    //             .then((res) => {
    //                 console.log("=================================== " + x);
    //                 console.log(res);
    //                 console.log(res.data.success);
    //             })
    //             .catch(err => {
    //                 reject();
    //             })
    //     });
    // }


}
