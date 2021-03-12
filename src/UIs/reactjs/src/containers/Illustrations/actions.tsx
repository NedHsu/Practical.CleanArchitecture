import * as actionTypes from "./actionTypes";

/// VIEW ILLUSTRATIONS
export const fetchIllustrationsSuccess = (illustrations) => {
  return {
    type: actionTypes.FETCH_ILLUSTRATIONS,
    illustrations: illustrations,
  };
};

export const fetchIllustrationsStart = () => {
  return {
    type: actionTypes.FETCH_ILLUSTRATIONS,
  };
};

export const fetchIllustrations = () => {
  return {
    type: actionTypes.FETCH_ILLUSTRATIONS,
  };
};

export const fetchIllustrationsFail = (illustrations) => {
  return {
    type: actionTypes.FETCH_ILLUSTRATIONS,
    illustrations: illustrations,
  };
};
/// VIEW ILLUSTRATIONS
