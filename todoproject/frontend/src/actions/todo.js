import axios from "axios";

import { 
  GET_ITEMS,
  NEW_ITEM, 
  ITEM_CHECK, 
  GET_CATEGORIES, 
  NEW_CATEGORY,
  MESSAGE,  
} from "./types";

export const getItems = () => (dispatch, getState) => {
  axios
    .get("/api/todo/todos", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(dispatchErrors(err.response.data, "error")));
};

export const newItem = (item, category) => (dispatch, getState) => {
  const body = {
    item,
  };

  if (category !== "No Category") {
    body.category = category;
  };

  axios
    .post("/api/todo/todos/", JSON.stringify(body), tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: NEW_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(dispatchErrors(err.response.data, "error")));
};

export const itemCheck = (id, completed) => (dispatch, getState) => {
  axios
    .patch(
      `/api/todo/todos/${id}/`,
      JSON.stringify({ completed }),
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ITEM_CHECK,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(dispatchErrors(err.response.data, "error")));
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
    .catch((err) => dispatch(dispatchErrors(err.response.data, "error")));
};

export const newCategory = (name) => (dispatch, getState) => {
  axios
    .post("/api/todo/categories/",
	  JSON.stringify({name}),
	  tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: NEW_CATEGORY,
	payload: res.data,
      });
    })
    .catch((err) => dispatch(dispatchErrors(err.response.data, "error")));
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

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

export const dispatchErrors = (data, stat) => {
  let message = typeof data == "string" ? data : data[Object.keys(data)[0]][0];
  message = message.replace("This field", Object.keys(data)[0]);
  message = message.charAt(0).toUpperCase() + message.slice(1);
  return {
    type: MESSAGE,
    payload: {
      message,
      stat,
    }
  }
};

