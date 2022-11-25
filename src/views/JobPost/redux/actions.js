import {
    SET_JOB_POST_DETAIL,
    UPDATE_EDUC_ATTAINMENT_LIST,
    SET_JOB_POST_DEFAULT,
    SET_JOB_POSTS,
    SET_VIEWED_APPLICANT,
    SET_JP_SEARCH_APPLICANT,
    UPDATE_TO_BE_ADDED_APPLICANTS,
    TEMP_APPLICANT_APPLIED,
} from './types';
// import { SERVER_API, JWT } from '../config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrangeDate } from 'store/actions/helpers/displayAction.js';
import { SERVER_API, JWT } from 'config';
import { SaveFile } from 'store/actions/helpers/displayAction';

export const AddApplicant = (cb = () => { }) => (dispatch, getState) => {
    const { values } = getState().JobPost;
    const { applicants, memo, file } = getState().JobPost.toAddApplicants;
    var applicantsID = applicants.map((a) => {
        return {
            _id: a._id
        }
    });

    console.log("*************!!!!!!!!!!");
    console.log(file);
    var fExt = (file == null) ? null : file.name.split(".");
    console.log(fExt);
    fExt = (fExt != null) ? fExt[fExt.length - 1] : "";
    console.log(fExt);

    var fileName = "ADD-APPLICANT-MEMO-" + memo + "." + fExt;
    console.log(fileName);
    console.log(applicantsID);
    console.log(typeof file != "object" || file == null);
    if (typeof file != "object" || file == null) {
        console.log("A");
        console.log(applicantsID.length);
        for (let x = 0; x < applicantsID.length; x++) {
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
                            job: values._id,
                            applicant: applicantsID[x]._id,
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
                    loading: 'Adding Applicant ' + (x + 1) + '...',
                    success: 'Applicant ' + (x + 1) + ' Successfully Added',
                    error: 'Failed to Add Applicant ' + (x + 1) + '',
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
    } else {
        toast.promise(
            new Promise((resolve, reject) => {
                SaveFile('job-post/add-aplicant', fileName, fileName, "avatar", file, [{
                    name: "details", value: {
                        applicantsID: applicantsID,
                        memo: memo,
                        job: values._id
                    }
                }])
                    .then((res) => {
                        if (res.success) {
                            cb();
                            dispatch({
                                type: UPDATE_TO_BE_ADDED_APPLICANTS,
                                data: {
                                    applicants: [],
                                    memo: "",
                                    file: "",
                                }
                            });
                            dispatch({
                                type: SET_JP_SEARCH_APPLICANT,
                                data: {
                                    users: []
                                }
                            })
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(err => {
                        reject();
                    })
            }),
            {
                loading: 'Adding Applicant...',
                success: 'Successfully Added',
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

}

export const UpdateToBeAddedApplicant = (data) => (dispatch, getState) => {

    const { applicants, memo, file } = getState().JobPost.toAddApplicants;

    if (typeof data == "object" && data.hasOwnProperty("_id") && data.hasOwnProperty("name")) {
        dispatch({
            type: UPDATE_TO_BE_ADDED_APPLICANTS,
            data: {
                applicants: [...applicants, { ...data }],
                memo: memo,
                file: file,
            }
        })
    } else if (typeof data == "object" && data.hasOwnProperty("_id")) {

        var newList = applicants.filter((a) => a._id != data._id);

        dispatch({
            type: UPDATE_TO_BE_ADDED_APPLICANTS,
            data: {
                applicants: [...newList],
                memo: memo,
                file: file,
            }
        })
    } else {
        var keys = Object.keys(data);
        var updated = { ...getState().JobPost.toAddApplicants };

        keys.map((k) => {
            updated[k] = data[k];
        })

        dispatch({
            type: UPDATE_TO_BE_ADDED_APPLICANTS,
            data: { ...updated }
        })
    }
}

export const SetSearchApplicant = (data) => (dispatch, getState) => {
    dispatch({
        type: SET_JP_SEARCH_APPLICANT,
        data: {
            users: data
        }
    })
}

export const SaveJobPost = (data) => (dispatch, getState) => {
    const { JobPost } = getState();
    const values = { ...JobPost.values };

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/new`,
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
                    resolve();
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Adding Job Post...',
            success: 'Successfully Added',
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

export const TempUpdateJobPost = (id) => (dispatch, getState) => {
    const { JobPost } = getState();
    const { toDisplay } = JobPost;

    var values = { ...JobPost.values };
    var applicants = values.applicants.map((app) => {
        if (app.applicant._id != id) {
            return {
                ...app,
                applicant: app.applicant._id
            }
        }
    });
    applicants = applicants.filter(app => app != undefined);

    console.log(values.applicants);
    console.log(applicants);

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    jobPost: {
                        ...values,
                        applicants: applicants,
                    },
                }
            })
                .then((res) => {
                    console.log(")))))))))))))))))))))))))))))))))))");
                    console.log(res);
                    dispatch({
                        type: SET_JOB_POSTS,
                        data: {
                            jobPost: toDisplay.map((job, i) => {
                                return (values._id != job._id)
                                    ? job
                                    : values;
                            }),
                            count: toDisplay.length,
                        }
                    })
                    resolve();
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Job Post...',
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

export const UpdateJobPost = (data = false) => (dispatch, getState) => {
    const { JobPost } = getState();
    const { toDisplay } = JobPost;

    var values;

    if (data) {
        values = { ...data };
    } else {
        values = { ...JobPost.values };
    }

    console.log(values.applicants);

    var applicants = values.applicants.map((a) => {
        return {
            ...a,
            applicant: (typeof a.applicant == "string") ? a.applicant : a.applicant._id
        }
    })
    console.log("*****************!!!!!!!!!!!!!!!!");
    console.log({
        ...values,
        applicants: applicants
    });

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    jobPost: {
                        ...values,
                        applicants: applicants
                    },
                }
            })
                .then((res) => {
                    dispatch({
                        type: SET_JOB_POSTS,
                        data: {
                            jobPost: toDisplay.map((job, i) => {
                                return (values._id != job._id)
                                    ? job
                                    : values;
                            }),
                            count: toDisplay.length,
                        }
                    })
                    resolve();
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Job Post...',
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

export const UpdateJobPostStatus = (id, status) => (dispatch, getState) => {
    const { values, toDisplay } = getState().JobPost;

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    jobPost: id,
                    props: {
                        status: status,
                    },
                    keys: ["status"]

                }
            })
                .then((res) => {
                    if (res.data.success) {

                        var newValues = {
                            ...values,
                            status: status,
                        };

                        dispatch({
                            type: SET_JOB_POST_DETAIL,
                            detail: {
                                values: [newValues]
                            }
                        })

                        dispatch({
                            type: SET_JOB_POSTS,
                            data: {
                                jobPost: toDisplay.map((job, i) => {
                                    return (values._id != job._id)
                                        ? job
                                        : newValues;
                                }),
                                count: toDisplay.length,
                            }
                        })

                        resolve();
                    }
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Status...',
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

export const SetJobPostDefault = () => (dispatch, getState) => {

    dispatch({
        type: SET_JOB_POST_DEFAULT,
    })
}

export const SetJobPostDetail = (id) => (dispatch, getState) => {



    const { toDisplay } = getState().JobPost;

    const jobPost = toDisplay.filter((jobPost) => jobPost._id == id);

    dispatch({
        type: SET_JOB_POST_DETAIL,
        detail: {
            values: [...jobPost]
        }
    })
}

export const UpdateEducList = (value) => (dispatch, getState) => {

    var education = [...getState().JobPost.values.other.education];

    if (typeof value == "string") {
        education.push(value)
    } else {
        education = education.filter((edu, i) => i != value);
    }

    dispatch({
        type: UPDATE_EDUC_ATTAINMENT_LIST,
        education: [...education]
    })
}

export const RetrieveApplicants = (id, callback) => (dispatch, getState) => {
    const { toDisplay } = getState().JobPost;

    const jobPost = toDisplay.filter((jobPost) => jobPost._id == id);




    toast.promise(
        new Promise((resolve, reject) => {
            if (jobPost[0].applicants.length > 0 && typeof (jobPost[0].applicants[0].applicant) == "string") {
                axios({
                    url: `${SERVER_API}/job-post/applicants`,
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(JWT)}`
                    },
                    params: {
                        id: id,
                    }
                })
                    .then((res) => {
                        if (res.data.success) {

                            dispatch({
                                type: SET_JOB_POST_DETAIL,
                                detail: {
                                    values: [{
                                        ...jobPost[0],
                                        applicants: [...res.data.applicants]
                                    }]
                                }
                            })

                            dispatch({
                                type: SET_JOB_POSTS,
                                data: {
                                    jobPost: toDisplay.map((job, i) => {
                                        return (id != job._id)
                                            ? job
                                            : {
                                                ...job,
                                                applicants: [...res.data.applicants]
                                            };
                                    }),
                                    count: toDisplay.length,
                                }
                            })

                            callback();
                            resolve();
                        } else {
                            reject(res.data.msg);
                        }
                    })
                    .catch(err => {
                        reject();
                        alert(err);
                        // this.props.ToggleAlert("failed", 'Login Failed', true);
                    })
            } else {
                dispatch({
                    type: SET_JOB_POST_DETAIL,
                    detail: {
                        values: [...jobPost]
                    }
                })
                callback();
                resolve();

            }

        })
        , {
            loading: 'Retrieving Applicants...',
            success: 'Success',
            error: (err) => `Failed: ${err}`,
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

export const ArrangeEligibility = (elig) => (dispatch, getState) => {
    var text = "";
    for (let x = 0; x < elig.length; x++) {
        text += elig[x].name + ", "
    }

    return text;

}

export const ArrangeEducation = (edus) => (dispatch, getState) => {
    var text = "";
    for (let x = 0; x < edus.length; x++) {
        if (edus[x].level != "Elementary" && edus[x].level != "Secondary") {
            text += edus[x].degree + ", "
        }
    }

    return text;

}

export const ArrangeTrianing = (trngs) => (dispatch, getState) => {
    var text = [], totH = 0;
    for (let x = 0; x < trngs.length; x++) {
        text.push(
            <p>
                {"- " + trngs[x].name + " [ " + ArrangeDate(new Date(trngs[x].inclusive.from), false)() + " - " + ArrangeDate(new Date(trngs[x].inclusive.to), false)() + " ]" + "( " + trngs[x].hours + " Hours )" + ", \n"}
            </p>
        )

        totH += trngs[x].hours;
    }

    text.push(
        <p>
            Total Number of Hours: {totH} Hours
        </p>
    )

    return text;

}

export const ArrangeExperience = (exps) => (dispatch, getState) => {
    var text = [];
    for (let x = 0; x < exps.length; x++) {
        text.push(
            <p>
                {exps[x].position + " at " + exps[x].office + " on " + ArrangeDate(new Date(exps[x].inclusive.from), false)() + " - " + ArrangeDate(new Date(exps[x].inclusive.to), false)() + ", \n"}
            </p>
        )
    }

    return text;

}

export const UpdateRemarksLocal = (remarks, applicant) => (dispatch, getState) => {
    const { values, toDisplay } = getState().JobPost;
    var applicants = [...values.applicants];
    for (let x = 0; x < applicants.length; x++) {
        if (applicants[x].applicant._id == applicant) {
            applicants[x] = {
                ...applicants[x],
                remarks: remarks
            }
        }
    }

    dispatch({
        type: SET_JOB_POST_DETAIL,
        detail: {
            values: [{
                ...values,
                applicants: [...applicants]
            }]
        }
    })

    dispatch({
        type: SET_JOB_POSTS,
        data: {
            jobPost: toDisplay.map((job, i) => {
                return (values._id != job._id)
                    ? job
                    : {
                        ...job,
                        applicants: [...applicants]
                    };
            }),
            count: toDisplay.length,
        }
    })

}

export const UpdateStatus = (applicant, status) => (dispatch, getState) => {
    const { values, toDisplay } = getState().JobPost;

    var applicants = [...values.applicants];
    for (let x = 0; x < applicants.length; x++) {
        if (applicants[x].applicant._id == applicant) {
            applicants[x] = {
                ...applicants[x],
                // status: (applicants[x].hasOwnProperty("status") && applicants[x].status == "qualified")?"unqualified":"qualified"
                status: status
            }
        }
    }

    dispatch({
        type: SET_JOB_POST_DETAIL,
        detail: {
            values: [{
                ...values,
                applicants: [...applicants]
            }]
        }
    })

    dispatch({
        type: SET_JOB_POSTS,
        data: {
            jobPost: toDisplay.map((job, i) => {
                return (values._id != job._id)
                    ? job
                    : {
                        ...job,
                        applicants: [...applicants]
                    };
            }),
            count: toDisplay.length,
        }
    })

}

export const SetSelectedApplicant = (id) => (dispatch, getState) => {
    dispatch({
        type: SET_VIEWED_APPLICANT,
        id: id,
    })
}

export const UploadNoticeFile = (file, type, applicant, jobId, cb = () => { }) => (dispatch, getState) => {

    var fileName = type.toUpperCase() + "-" + applicant.applicant.name.last + "-" + applicant.applicant.name.first + "-" + new Date().valueOf() + "." + file.name.split(".").pop();

    toast.promise(
        new Promise(async (resolve, reject) => {

            await SaveFile('job-post/upload-notice', type, fileName, "notice", file, { jobId: jobId, applicantID: applicant.applicant._id })
                .then((res) => {
                    if (res.success) {

                        var noticefile = {
                            status: "current",
                            dateUploaded: new Date(),
                            name: type,
                            path: fileName,
                        };

                        var { toDisplay, values } = getState().JobPost;

                        values.applicants = values.applicants.map((app) => {
                            if (app.applicant._id == applicant.applicant._id) {
                                app.filesFromNEDA = app.filesFromNEDA.map((f) => {

                                    if (f.name == type && f.status == "current") {
                                        f.status = "old";
                                    }

                                    return f;
                                });
                                app.filesFromNEDA.push(noticefile)
                            }
                            return app;
                        })

                        // jobId
                        // applicant.applicant._id

                        var updatedList = toDisplay.map((row) => {
                            if (row._id == jobId) {
                                row = {
                                    ...values
                                }
                            }

                            return row;
                        })

                        dispatch({
                            type: SET_JOB_POST_DETAIL,
                            detail: {
                                values: [{ ...values }]
                            }
                        })
                        dispatch({
                            type: SET_JOB_POSTS,
                            data: {
                                jobPost: [...updatedList],
                                count: toDisplay.length,
                            }
                        })

                        cb(fileName);
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });

        })
        , {
            loading: 'Uploading Notice...',
            success: 'Notice Successfully Uploaded',
            error: 'Failed to Upload Notice',
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

export const UpdateJobPostStage = (id, stage) => (dispatch, getState) => {
    const { values, toDisplay } = getState().JobPost;

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    jobPost: id,
                    props: {
                        stage: stage,
                    },
                    keys: ["stage"]

                }
            })
                .then((res) => {
                    if (res.data.success) {

                        var newValues = {
                            ...values,
                            stage: stage,
                        };

                        dispatch({
                            type: SET_JOB_POST_DETAIL,
                            detail: {
                                values: [newValues]
                            }
                        })

                        dispatch({
                            type: SET_JOB_POSTS,
                            data: {
                                jobPost: toDisplay.map((job, i) => {
                                    return (values._id != job._id)
                                        ? job
                                        : newValues;
                                }),
                                count: toDisplay.length,
                            }
                        })

                        resolve();
                    }
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Status...',
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

export const UpdateApplicantRating = (rating, jobID, applicantID) => (dispatch, getState) => {
    const values = { ...getState().JobPost.values };
    const toDisplay = [...getState().JobPost.toDisplay];

    var newVal = { ...getState().JobPost.values };

    newVal.applicants = newVal.applicants.map(app => {
        if (app.applicant._id == applicantID) {
            app.ratings = {
                ...rating
            }
        }
        return app;
    })

    var applicants = [];

    for (let x = 0; x < values.applicants.length; x++) {
        if (values.applicants[x].applicant._id == applicantID) {

            values.applicants[x].ratings = {
                ...rating
            }


        }
        applicants.push({
            ...values.applicants[x],
            applicant: values.applicants[x].applicant._id,
        });
    }


    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    jobPost: jobID,
                    props: {
                        applicants: applicants,
                    },
                    keys: ["applicants"]

                }
            })
                .then((res) => {
                    if (res.data.success) {

                        dispatch({
                            type: SET_JOB_POST_DETAIL,
                            detail: {
                                values: [newVal]
                            }
                        })

                        dispatch({
                            type: SET_JOB_POSTS,
                            data: {
                                jobPost: toDisplay.map((job, i) => {
                                    return (newVal._id != job._id)
                                        ? job
                                        : newVal;
                                }),
                                count: toDisplay.length,
                            }
                        })

                        resolve();
                    }
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Status...',
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

export const OnBoardApplicant = (id) => (dispatch, getState) => {
    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/onboard`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    applicant: id,
                }
            })
                .then((res) => {
                    resolve();
                })
                .catch(err => {
                    reject();
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'On-Boarding Applicant...',
            success: 'Successful',
            error: 'Failed',
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

export const GetApplicantsWhoApply = (id) => (dispatch, getState) => {
    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/get-applied-job`,
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                params: {
                    jobID: id,
                }
            })
                .then((res) => {
                    dispatch({
                        type: TEMP_APPLICANT_APPLIED,
                        data: res.data.data
                    })
                    resolve();
                })
                .catch(err => {
                    reject();
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Retrieving Applicants 2',
            success: 'Retrieved',
            error: 'Failed',
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

export const SetApplicantAppliedToJP = (applicant, index) => (dispatch, getState) => {

    const { values } = getState().JobPost;

    console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");

    var newValues = {
        ...values,
        applicants: values.applicants.map((app, i) => {
            return (i != index.index) ? {
                ...app,
                applicant: (app.applicant.hasOwnProperty("_id")) ? app.applicant._id : null
            } : {
                ...app,
                applicant: applicant._id
            }
        })
    };

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/job-post/update`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    jobPost: {
                        ...newValues,
                    },
                }
            })
                .then((res) => {
                    console.log(")))))))))))))))))))))))))))))))))))");
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
            loading: 'Updating Job Post Applicants...',
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
