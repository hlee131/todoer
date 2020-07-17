import axios from "axios";

import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./types";

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    username,
    password,
  });

  axios
    .post("/api/auth/token", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const register = (username, password, email) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    username,
    password,
    email,
  });

  axios
    .post("/api/auth/user", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
