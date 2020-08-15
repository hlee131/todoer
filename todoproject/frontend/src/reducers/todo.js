import {
  GET_ITEMS,
  NEW_ITEM,
  ITEM_COMPLETE,
  FILTER,
  GET_CATEGORIES,
  DELETE_COMPLETED,
  NEW_CATEGORY
} from "../actions/types";

const initialState = {
  // TODO: More efficient as object instead of array?
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
    case NEW_CATEGORY:
      return {
      	...state,
	categories: [...state.categories, action.payload],
      }
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
      let object = state.items.filter(
        (item) => item.id === action.payload.id
      )[0];
      let index = state.items.indexOf(object);
      let newItems = state.items;
      newItems[index].completed = true;
      return {
        ...state,
        items: newItems,
      };
    case DELETE_COMPLETED:
      return {
        ...state,
        items: state.items.filter((item) => item.completed === false),
      };
    default:
      return state;
  }
}
