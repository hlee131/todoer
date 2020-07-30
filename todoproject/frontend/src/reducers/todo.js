import {
  GET_ITEMS,
  NEW_ITEM,
  ITEM_COMPLETE,
  FILTER,
  SWITCH,
} from "../actions/types";
import { applyMiddleware } from "redux";

const initialState = {
  items: [],
  filter: "all",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case NEW_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case ITEM_COMPLETE:
      return {
        ...state,
        items: [
          ...state.items.filter((item) => item.id !== action.payload.id),
          action.payload,
        ],
      };
    default:
      console.log(action.payload);
      return state;
  }
}
