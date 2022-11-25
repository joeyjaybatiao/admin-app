import {
    SET_SEARCHED_JOB_POSTS,
    SET_JOB_POSTS,
    ADD_NEW_JOB_POST,
    SET_JOB_POST_DETAIL,
    SET_JOB_POST_VALUE,
    SET_JOB_POST_DEFAULT,
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
            post: null,
            close: null,
        },
        createdAt: null,
        file: "",

        other: {
            eligibility: "",
            education: "",
            training: "",
            wEx: "",
            competency: "",
            remarks: "",
            documentsRequired: [],
        },
        applicants: []
    },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_SEARCHED_JOB_POSTS:
            return {
                ...state,
                searched: action.data.offices,
                toDisplay: action.data.offices,
                sCount: action.data.count,
                count: action.data.count,
                page: (action.page) ? action.page : 1
            }

        case SET_JOB_POSTS:
            return {
                ...state,
                rows: (action.data) ? action.data.offices : state.rows,
                toDisplay: (action.data) ? action.data.offices : state.rows,
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
            console.log(action);
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
                value: SpreadOps({ ...state.default }),
            }


        default:
            return state

    }
}
