import {
  SET_SEARCHED_ITEMS,
  SET_ITEMS,
  ADD_NEW_ITEM,
  SET_ITEM_DETAIL,
  SET_ITEM_VALUE,
  SET_ITEM_DEFAULT,
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
    itemID: "",
    no: 0,
    itemType: null,
    propertyNo: "",
    serial: "",
    funds: "",
    soValue: "",
    remarks: "",
    status: "",
    category: "", //ICT, etc.
    type: "", //SE, PPE
    user: {
      par: null,
      co: null,
    },
    location: {
      office: null,
      other: "",
    },
    ics: "",
    date: "", //date purchased
    createdAt: "",
    _id: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_ITEMS:
      return {
        ...state,
        searched: action.data.items,
        toDisplay: action.data.items,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_ITEMS:
      return {
        ...state,
        rows: (action.data) ? action.data.items : state.rows,
        toDisplay: (action.data) ? action.data.items : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_ITEM:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_ITEM_DETAIL:
      console.log({ ...action.detail.item[0] });
      return {
        ...state,
        values: { ...action.detail.item[0] }
      }

    case SET_ITEM_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_ITEM_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
