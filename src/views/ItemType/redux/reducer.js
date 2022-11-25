import {
  SET_SEARCHED_ITEM_TYPES,
  SET_ITEM_TYPES,
  ADD_NEW_ITEM_TYPE,
  SET_ITEM_TYPE_DETAIL,
  SET_ITEM_TYPE_VALUE,
  SET_ITEM_TYPE_DEFAULT,
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
    itemTypeID: "",
    itemName: "",
    description: "",
    price: "",
    createdAt: "",
    _id: "",
  },
};

var temp = "";
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_ITEM_TYPES:
      return {
        ...state,
        searched: action.data.itemTypes,
        toDisplay: action.data.itemTypes,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_ITEM_TYPES:
      return {
        ...state,
        rows: (action.data) ? action.data.itemTypes : state.rows,
        toDisplay: (action.data) ? action.data.itemTypes : state.rows,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_ITEM_TYPE:
      return {
        ...state,
        rows: [action.data, ...state.rows],
        toDisplay: [action.data, ...state.rows],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_ITEM_TYPE_DETAIL:
      console.log({ ...action.detail.itemType[0] });
      return {
        ...state,
        values: { ...action.detail.itemType[0] }
      }

    case SET_ITEM_TYPE_VALUE:
      console.log(action);
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp }
      }


    case SET_ITEM_TYPE_DEFAULT:
      return {
        ...state,
        values: SpreadOps({ ...state.default }),
      }


    default:
      return state

  }
}
