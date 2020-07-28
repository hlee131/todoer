import { SWITCH, NAV_VISIBLE, LOGOUT } from "../actions/types";

const initialState = {
  style: localStorage.getItem("style"),
  navVisible: "hidden",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH:
      return {
        ...state,
        style: state.style === "dark" ? "light" : "dark",
      };
    case NAV_VISIBLE:
      return {
        ...state,
        navVisible: state.navVisible === "hidden" ? "block" : "hidden",
      };
    case LOGOUT:
      return {
        ...state,
        navVisible: "hidden",
      };
    default:
      return state;
  }
}
