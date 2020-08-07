import axios from "axios";

import { GET_ITEMS, NEW_ITEM, ITEM_COMPLETE, GET_CATEGORIES } from "./types";

export const getItems = () => (dispatch, getState) => {
  axios
    .get("/api/todo/todos", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data));
};

export const newItem = (item) => (dispatch, getState) => {
  const body = JSON.stringify({
    item,
  });

  axios
    .post("/api/todo/todos/", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: NEW_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data));
};

export const completeItem = (id) => (dispatch, getState) => {
  axios
    .patch(
      `/api/todo/todos/${id}/`,
      JSON.stringify({ completed: true }),
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ITEM_COMPLETE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data));
};

export const getCategories = () => (dispatch, getState) => {
  axios
    .get("/api/todo/categories", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data));
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to header
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
