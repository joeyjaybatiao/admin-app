import {
  SET_SEARCHED_ICT_REPAIR_REQUESTS,
  SET_ICT_REPAIR_REQUESTS,
  ADD_NEW_ICT_REPAIR_REQUEST,
  SET_ICT_REPAIR_REQUEST_DETAIL,
  SET_ICT_REPAIR_REQUEST_VALUE,
  SET_ICT_REPAIR_REQUEST_DEFAULT,
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
    ictRepairRequestID: "",
    division: "",
    section: "",
    code: "",
    createdAt: "",
    _id: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_ICT_REPAIR_REQUESTS:
      return {
        ...state,
        searched: action.data.ictRepairRequests,
        toDisplay: action.data.ictRepairRequests,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_ICT_REPAIR_REQUESTS:
      return {
        ...state,
        rows: (action.data) ? action.data.ictRepairRequests : state.rows,
        toDisplay: (action.data) ? action.data.ictRepairRequests : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_ICT_REPAIR_REQUEST:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_ICT_REPAIR_REQUEST_DETAIL:
      console.log({ ...action.detail.ictRepairRequest[0] });
      return {
        ...state,
        values: { ...action.detail.ictRepairRequest[0] }
      }

    case SET_ICT_REPAIR_REQUEST_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_ICT_REPAIR_REQUEST_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
