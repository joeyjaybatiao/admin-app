import {
    SET_PROFILE_DATA,
    UPDATE_CHILDREN,
    UPDATE_EDUCATION,
    UPDATE_ELIGIBILITY,
    UPDATE_WORK_EXPERIENCE,
    UPDATE_VOLUNTARY_WORK,
    UPDATE_TRAINING,
    UPDATE_SKILL,
    UPDATE_RECOGNITION,
    UPDATE_MEMBERSHIP,
    UPDATE_REFERENCES,
    SET_USER_INFO,
    SET_PROFILE_FILE,
    UPDATE_FILES,
    SET_USER_AVATAR,
} from './types';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { SERVER_API, JWT } from 'config';
import axios from 'axios';
import { SaveFile } from 'store/actions/helpers/displayAction';

export const SetProfileData = (data) => (dispatch) => {
    dispatch({
        type: SET_PROFILE_DATA,
        value: data
    })
}

export const GetProfileFile = (file, type) => (dispatch, getState) => {
    console.log("________________________________________>");
    console.log(type);
    console.log(file);
    dispatch({
        type: SET_PROFILE_FILE,
        file: file,
        fType: type,
    })
}

export const SaveProfileFile = (type, cb) => (dispatch, getState) => {
    const { Profile } = getState();
    const files = [...Profile.tempFiles];
    var file = null;
    for (let i = 0; i < files.length; i++) {
        if (files[i].type == type) {
            file = { ...files[i] };
            break;
        }
    }

    var spl = file.file[0].file.name.split(".");

    var name = JSON.parse(localStorage.getItem("nro13-info")).name;
    var tkn = localStorage.getItem("nro13-tkn");
    tkn = tkn.slice(0, 15);

    var fname = (name.last.split(" ").join("-")) + "-" + (name.first.split(" ").join("-")) + "-" + type + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

    toast.promise(
        new Promise(async (resolve, reject) => {

            await SaveFile('user/upload-file', fname, fname, type, files[0].file[0].file)
                .then((res) => {
                    if (res.status) {
                        dispatch({
                            type: UPDATE_FILES,
                            files: [...res.files],
                        })
                        cb();
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });

        })
        , {
            loading: 'Updating Profile...',
            success: 'File Successfully Saved',
            error: 'Failed to Save File',
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

export const AddCertificates = (file, fileName, cb) => (dispatch, getState) => {

    var spl = file[0].file.name.split(".");

    var name = JSON.parse(localStorage.getItem("nro13-info")).name;
    var tkn = localStorage.getItem("nro13-tkn");
    tkn = tkn.slice(0, 15);

    var fname = (name.last.split(" ").join("-")) + "-" + (name.first.split(" ").join("-")) + "-" + (fileName.split(" ").join("-")) + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];
    toast.promise(
        new Promise(async (resolve, reject) => {

            await SaveFile('user/upload-file', fileName, fname, "certificate", file[0].file)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        dispatch({
                            type: UPDATE_FILES,
                            files: [...res.files],
                        })
                        cb();
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });

        })
        , {
            loading: 'Updating Profile...',
            success: 'File Successfully Saved',
            error: 'Failed to Save File',
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

export const RemoveCertificate = (id) => (dispatch, getState) => {
    const { files } = getState().Profile.values;
    var newFiles = [];
    for (let x = 0; x < files.length; x++) {
        newFiles.push({
            ...files[x],
            status: (files[x]._id == id) ? "old" : files[x].status
        })
    }

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/update-files`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    files: [...newFiles],
                }
            })
                .then((res) => {

                    if (res.data.success) {
                        dispatch({
                            type: UPDATE_FILES,
                            files: [...newFiles],
                        })
                    } else {
                        reject();

                    }



                    resolve();
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Files...',
            success: 'Successfully Updated',
            error: 'Failed to Update',
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

export const SaveInfoUpdates = (data) => (dispatch, getState) => {
    const { Profile } = getState();
    const values = { ...Profile.values };
    console.log("!!!!!!!!!!!!!!!!!!!!");
    console.log(values);

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
                    values: values,
                }
            })
                .then((res) => {
                    console.log(res);

                    resolve();
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Profile...',
            success: 'Successfully Updated',
            error: 'Failed to Update',
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


export const SavePassword = (passwords, callback) => (dispatch, getState) => {

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/update-password`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    old: passwords.old.val,
                    new: passwords.new.val,
                }
            })
                .then((res) => {
                    console.log("***************");
                    console.log(res);
                    if (res.data.status) {
                        callback();
                        resolve();
                    } else {
                        reject({ message: res.data.message });
                    }
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Password...',
            success: 'Password Updated',
            error: (err) => `${err.message}`,
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 3000
        },
        error: {
            duration: 5000
        }
    }
    );

}

export const UpdateChildren = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var children = [...Profile.values.pds.family.children];

    if (type == "+") {
        children.push({ name: "", dob: null });
    } else {
        children = [
            ...children.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_CHILDREN,
        children: [...children]
    })
}

export const UpdateEducation = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var education = [...Profile.values.pds.education];

    if (type == "+") {
        education.push({
            ...Profile.default.pds.education[0]
        });
    } else {
        education = [
            ...education.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_EDUCATION,
        education: [...education]
    })
}

export const UpdateEligibility = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var eligibility = [...Profile.values.pds.eligibility];

    if (type == "+") {
        eligibility.push({
            ...Profile.default.pds.eligibility[0]
        });
    } else {
        eligibility = [
            ...eligibility.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_ELIGIBILITY,
        eligibility: [...eligibility]
    })
}

export const UpdateWorkExperience = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var workExperience = [...Profile.values.pds.workExperience];

    if (type == "+") {
        workExperience.push({
            ...Profile.default.pds.workExperience[0]
        });
    } else {
        workExperience = [
            ...workExperience.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_WORK_EXPERIENCE,
        workExperience: [...workExperience]
    })
}

export const UpdateVoluntaryWork = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var voluntary = [...Profile.values.pds.voluntary];

    if (type == "+") {
        voluntary.push({
            ...Profile.default.pds.voluntary[0]
        });
    } else {
        voluntary = [
            ...voluntary.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_VOLUNTARY_WORK,
        voluntary: [...voluntary]
    })
}

export const UpdateTraining = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var trainings = [...Profile.values.pds.trainings];

    if (type == "+") {
        trainings.push({
            ...Profile.default.pds.trainings[0]
        });
    } else {
        trainings = [
            ...trainings.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_TRAINING,
        trainings: [...trainings]
    })
}

export const UpdateSkill = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var skillsHobbies = [...Profile.values.pds.others.skillsHobbies];

    if (type == "+") {
        skillsHobbies.push({
            name: ""
        });
    } else {
        skillsHobbies = [
            ...skillsHobbies.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_SKILL,
        skillsHobbies: [...skillsHobbies]
    })
}
export const UpdateRecognition = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var recognition = [...Profile.values.pds.others.recognition];

    if (type == "+") {
        recognition.push({
            name: ""
        });
    } else {
        recognition = [
            ...recognition.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_RECOGNITION,
        recognition: [...recognition]
    })
}
export const UpdateMembership = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var membership = [...Profile.values.pds.others.membership];

    if (type == "+") {
        membership.push({
            name: ""
        });
    } else {
        membership = [
            ...membership.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_MEMBERSHIP,
        membership: [...membership]
    })
}


export const UpdateReferences = (type = "+", ind) => (dispatch, getState) => {

    const { Profile } = getState();
    var references = [...Profile.values.pds.references];

    if (type == "+") {
        references.push({
            ...Profile.default.pds.references[0]
        });
    } else {
        references = [
            ...references.filter((child, i) => i != ind)
        ]

    }

    dispatch({
        type: UPDATE_REFERENCES,
        references: [...references]
    })
}

export const GetMyInfo = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/user/get-my-info`,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            params: {
            }
        })
            .then((res) => {
                res.data.info[0].files.map((file, i) => {
                    if (file.type == "avatar" && file.status == "current") {
                        localStorage.setItem("nro13-pp", file.path);
                    }
                })

                dispatch({
                    type: SET_USER_INFO,
                    info: res.data.info[0]

                })
            });
    })
}

export const SetUserAvatar = (file, base64) => (dispatch, getState) => {
    dispatch({
        type: SET_USER_AVATAR,
        file: file,
        base64: base64,
    });
}

export const UpdateProfilePic = (cb = () => { }) => (dispatch, getState) => {

    var { tempAvatar } = getState().Profile;
    console.log(tempAvatar.file);



    var spl = tempAvatar.file.name.split(".");
    var name = JSON.parse(localStorage.getItem("nro13-info")).name;
    var fname = (name.last.split(" ").join("-")) + "-" + (name.first.split(" ").join("-")) + "-profile-picture-" + new Date().valueOf() + '.' + spl[spl.length - 1];

    toast.promise(
        new Promise(async (resolve, reject) => {

            await SaveFile('user/upload-file', fname, fname, "avatar", tempAvatar.file)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        dispatch({
                            type: UPDATE_FILES,
                            files: [...res.files],
                        })
                        localStorage.setItem("nro13-pp", res.files[res.files.length - 1].path);
                        dispatch({
                            type: SET_USER_AVATAR,
                            file: null,
                            base64: null,
                        });
                        cb();
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });

        })
        , {
            loading: 'Updating Profile...',
            success: 'Profile Successfully Updated',
            error: 'Failed to Update Profile',
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
