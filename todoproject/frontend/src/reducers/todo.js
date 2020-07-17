import { GET_ITEMS, NEW_ITEM } from "../actions/types";

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case NEW_ITEM:
      console.log("new");
      console.log(action.payload);
      return {
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}
