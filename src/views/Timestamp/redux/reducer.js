import {
  SET_SEARCHED_TIMESTAMPS,
  SET_TIMESTAMPS,
  ADD_NEW_TIMESTAMP,
  SET_TIMESTAMP_DETAIL,
  SET_TIMESTAMP_VALUE,
  SET_TIMESTAMP_DEFAULT,
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
    employee: null,

    activity: [],

    remarks: [],

    _id: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_TIMESTAMPS:
      return {
        ...state,
        searched: action.data.timestamps,
        toDisplay: action.data.timestamps,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_TIMESTAMPS:
      return {
        ...state,
        rows: (action.data) ? action.data.timestamps : state.rows,
        toDisplay: (action.data) ? action.data.timestamps : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_TIMESTAMP:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_TIMESTAMP_DETAIL:
      console.log({ ...action.detail.timestamp[0] });
      return {
        ...state,
        values: { ...action.detail.timestamp[0] }
      }

    case SET_TIMESTAMP_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_TIMESTAMP_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
