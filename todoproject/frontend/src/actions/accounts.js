import axios from "axios";

import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./types";

import { tokenConfig } from "./todo";

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

export const update = (username, password, email, ran) => (
  dispatch,
  getState
) => {
  // TODO: More clean way of doing this?
  const body = {};
  let filled = false;
  if (username.trim() !== "") {
    body.username = username;
    filled = true;
  }
  if (password.trim() !== "") {
    body.password = password;
    filled = true;
  }
  if (email.trim() !== "") {
    body.email = email;
    filled = true;
  }

  //  TODO: User might be updating style
  if (filled === false && ran === false) {
    console.log("Must have one line filled");
  } else if (filled === true) {
    axios
      .patch("/api/auth/user", body, tokenConfig(getState))
      .then((res) => console.log("user updated"))
      .catch((err) => console.log(err.response.data));
  }
};

export const deleteAcc = () => (getState) => {
  axios
    .delete("/api/auth/user", tokenConfig(getState))
    .then((res) => console.log("deleted"))
    .catch((err) => console.log(err.response.data));
};
