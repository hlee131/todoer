import axios from "axios";

import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  DELETE_COMPLETED,
} from "./types";

import { tokenConfig, dispatchErrors } from "./todo";

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
      dispatch(dispatchErrors(err.response.data, "error"));
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
      dispatch(dispatchErrors("Account created", "success"));
    })
    .catch((err) => {
      dispatch(dispatchErrors(err.response.data, "error"));
    });
  };

export const update = (auth, ran) => (
  dispatch,
  getState
) => {
  const body = {};
  
  for (var i = 0; i < auth.length; i++) {
    if (auth[i].trim() !== "") {
      let key = i === 0 ? "username" : (i === 1 ? "email" : "password");
      body[key] = auth[i];
    }
  }
  
  /*
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
  */

  // User might be updating style
  if (filled === false && ran === false) {
    dispatch(dispatchErrors("must change fields to save changes", "error"));
  } else if (filled === true) {
    axios
      .patch("/api/auth/user", body, tokenConfig(getState))
      .then((res) => {
        dispatch(dispatchErrors("information updated", "success"));
      })
      .catch((err) => dispatch(dispatchErrors(err.response.data, "error")));
  };
};

export const deleteAcc = () => (dispatch, getState) => {
  axios
    .delete("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: LOGOUT,
      })
    )
    .catch((err) => console.log(err.response.data, "error"));
};

export const clearCompleted = () => (dispatch, getState) => {
  axios
    .delete("/api/todo/todos/clear_todos", tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_COMPLETED,
      });
      alert("Completed todos deleted");
    })
    .catch((err) => console.log(err.response.data, "error"));
};
