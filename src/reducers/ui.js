import * as types from '../constants/ui';

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING: {
      return true;
    }
    case types.HIDE_LOADING: {
      return false;
    }
    default:
      return state;
  }
};

export default reducer;
