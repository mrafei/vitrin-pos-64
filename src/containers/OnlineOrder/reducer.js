/*
 *
 * Admin reducer
 *
 */
import produce from "immer";
import { DEFAULT_ACTION, SET_FOOD_ADMIN_ORDER } from "./constants";

export const initialState = {
  foodAdminOrder: { items: [] },
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_FOOD_ADMIN_ORDER:
        draft.foodAdminOrder = action.data;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default adminReducer;
