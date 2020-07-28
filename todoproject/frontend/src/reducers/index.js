import { combineReducers } from "redux";

import auth from "./auth";
import todo from "./todo";
import styles from "./styles";

export default combineReducers({
  auth,
  todo,
  styles,
});
