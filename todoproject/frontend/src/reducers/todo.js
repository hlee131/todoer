import {
  GET_ITEMS,
  NEW_ITEM,
  ITEM_COMPLETE,
  FILTER,
  GET_CATEGORIES,
} from "../actions/types";

const initialState = {
  items: [],
  filter: "all",
  categories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
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
      return state;
  }
}
