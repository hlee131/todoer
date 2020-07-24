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
  style: localStorage.getItem("style"),
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
    case SWITCH:
      return {
        ...state,
        style: state.style === "dark" ? "light" : "dark",
      };
    default:
      return state;
  }
}
