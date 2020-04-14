import * as actionTypes from './actionTypes';

export const loadRepos = repos => {
  return {
    type: actionTypes.LOAD_REPOS,
    payload: repos,
  };
};
