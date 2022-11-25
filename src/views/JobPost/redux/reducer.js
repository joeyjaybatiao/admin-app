import {
    SET_SEARCHED_JOB_POSTS,
    SET_JOB_POSTS,
    ADD_NEW_JOB_POST,
    SET_JOB_POST_DETAIL,
    SET_JOB_POST_VALUE,
    SET_JOB_POST_DEFAULT,
    UPDATE_EDUC_ATTAINMENT_LIST,
    SET_VIEWED_APPLICANT,
    SET_JP_SEARCH_APPLICANT,
    UPDATE_TO_BE_ADDED_APPLICANTS,
    TEMP_APPLICANT_APPLIED,
} from './types';
import { SetRegValueHelper, SpreadOps } from 'store/reducerHelpers';

const initialState = {
    rows: [],
    searched: [],
    toDisplay: [],
    gCount: 0,
    sCount: 0,
    count: 0,
    page: 1,
    values: {},
    default: {
        jobPostID: "",
        poa: "",
        position: "",
        plantilla: "",
        sg: {
            grade: "",
            salary: 0,
        },
        date: {
            post: "",
            close: "",
        },
        createdAt: "",
        file: "",

        other: {
            eligibility: "",
            education: [],
            training: "",
            wEx: "",
            competency: "",
            remarks: "",
            documentsRequired: "",
        },
        applicants: [],
        status: "",
        stage: "",
    },
    selectedApplicant: null,

    applicants: [],

    toAddApplicants: {
        applicants: [],
        memo: "",
        file: null,
    },

    tempApplicants: [],

};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_SEARCHED_JOB_POSTS:
            return {
                ...state,
                searched: action.data.jobPost,
                toDisplay: action.data.jobPost,
                sCount: action.data.count,
                count: action.data.count,
                page: (action.page) ? action.page : 1
            }

        case SET_JOB_POSTS:
            return {
                ...state,
                rows: (action.data) ? action.data.jobPost : state.rows,
                toDisplay: (action.data) ? action.data.jobPost : state.rows,
                gCount: (action.data) ? action.data.count : state.gCount,
                count: (action.data) ? action.data.count : state.gCount,
                page: (action.page) ? action.page : 1
            }

        case ADD_NEW_JOB_POST:
            return {
                ...state,
                rows: [action.data, ...state.rows],
                toDisplay: [action.data, ...state.rows],
                gCount: state.gCount + 1,
                count: state.count + 1
            }

        case SET_JOB_POST_DETAIL:
            return {
                ...state,
                values: { ...action.detail.values[0] }
            }

        case SET_JOB_POST_VALUE:
            temp = { ...state.values };
            temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

            return {
                ...state,
                values: { ...temp }
            }


        case SET_JOB_POST_DEFAULT:
            return {
                ...state,
                values: SpreadOps({ ...state.default }),
            }


        case UPDATE_EDUC_ATTAINMENT_LIST:
            return {
                ...state,
                values: {
                    ...state.values,
                    other: {
                        ...state.values.other,
                        education: action.education
                    }
                }
            }

        case SET_VIEWED_APPLICANT:
            return {
                ...state,
                selectedApplicant: action.id
            }

        case SET_JP_SEARCH_APPLICANT:
            return {
                ...state,
                applicants: action.data.users
            }

        case UPDATE_TO_BE_ADDED_APPLICANTS:
            return {
                ...state,
                toAddApplicants: action.data
            }

        case TEMP_APPLICANT_APPLIED:
            return {
                ...state,
                tempApplicants: [...action.data]
            }

        default:
            return state

    }
}
