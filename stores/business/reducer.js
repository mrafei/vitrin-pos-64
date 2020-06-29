/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {SET_BUSINESS, SET_DELIVERIES} from './constants';

// The initial state of the App
export const initialState = {
  business: {},
  deliveries: [],
  deliveriesPagination: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BUSINESS:
        draft.business = action.data;
        break;
      case SET_DELIVERIES:
        draft.deliveries = action.data;
        draft.deliveriesPagination = action.pagination;
        break;
    }
  });

export default appReducer;
