import { SWITCH, NAV_VISIBLE } from "./types";

// TODO: Using action creators?
export const change = () => (dispatch) => {
  dispatch({
    type: SWITCH,
  });
};

export const navVisible = () => (dispatch) => {
  dispatch({
    type: NAV_VISIBLE,
  });
};
