import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the admin state domain
 */

const selectAdminDomain = state => state.adminOrder || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Admin
 */

const makeSelectAdmin = () =>
  createSelector(
    selectAdminDomain,
    substate => substate
  );
const makeSelectFoodAdminOrder = () =>
  createSelector(
    selectAdminDomain,
    state => state.foodAdminOrder
  );
export default makeSelectAdmin;
export {
  selectAdminDomain,
  makeSelectFoodAdminOrder,
};
