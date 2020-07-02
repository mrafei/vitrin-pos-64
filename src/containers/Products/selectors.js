import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectProductsDomain = (state) => state.products || initialState;

export { selectProductsDomain };
