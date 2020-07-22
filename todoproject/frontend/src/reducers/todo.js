import { GET_ITEMS, NEW_ITEM, ITEM_COMPLETE, FILTER } from "../actions/types";
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
    default:
      return state;
  }
}
