import * as actionTypes from '../actions/actionTypes';

const initialState = {
  repos: {},
};

const repoReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case actionTypes.LOAD_REPOS:
      return { ...state, repos: action.payload };
    default:
      return state;
  }
};

export default repoReducer;
