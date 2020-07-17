import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuthenticated: localStorage.getItem("token") === null ? false : true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
