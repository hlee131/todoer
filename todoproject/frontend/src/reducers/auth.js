import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
