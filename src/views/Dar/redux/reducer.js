import {
  SET_SEARCHED_DARS,
  SET_DARS,
  SET_DARS_APPEND,
  ADD_NEW_DAR,
  SET_DAR_DETAIL,
  SET_DAR_VALUE,
  SET_DAR_DEFAULT,
  SET_DAR_BACKLOGS,
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
  values: {
  },

  default: {
    deliverable: "",
    outcome: "",
    remarks: "",
    percentage: "",
    date: new Date(),
  },

  darIndex: 0,

  // default: {
  //   employee: null,	

  //   date: new Date(),
  //   accomplishments: [{
  //     _id: false,
  //     deliverable: "",
  //     outcome: "",
  //     remarks: "",
  //     percentage: 0,
  //   }],

  //   createdAt: "",
  //   _id: "",
  // },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_DARS:
      return {
        ...state,
        searched: action.data.dars,
        toDisplay: action.data.dars,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_DARS:

      return {
        ...state,
        rows: (action.data) ? action.data.dars : state.rows,
        toDisplay: (action.data) ? action.data.dars : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case SET_DARS_APPEND:
      return {
        ...state,
        rows: [...state.rows, ...action.data.dars],
        toDisplay: [...state.toDisplay, ...action.data.dars],
        gCount: state.gCount + action.data.count,
        count: state.count + action.data.count,
      }

    case ADD_NEW_DAR:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_DAR_DETAIL:
      console.log(action);
      return {
        ...state,
        values: { ...action.detail.dar[0] },
        darIndex: (action.detail.hasOwnProperty("index")) ? action.detail.index : state.darIndex,
      }

    case SET_DAR_VALUE:
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_DAR_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }

    case SET_DAR_BACKLOGS:
      return {
        ...state,
        backlogs: SpreadOps({ ...state.default }),
      }

    default:
      return state

  }
}
