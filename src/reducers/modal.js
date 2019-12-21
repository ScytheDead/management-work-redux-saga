import * as types from '../constants/modal';

const initialState = {
  showModal: false,
  title: '',
  component: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
      };
    }
    case types.HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
      };
    }
    case types.CHANGE_TITLE_MODAL: {
      const { title } = action.payload;
      return {
        ...state,
        title,
      };
    }
    case types.CHANGE_CONTENT_MODAL: {
      const { component } = action.payload;
      return {
        ...state,
        component,
      };
    }

    default:
      return state;
  }
};

export default reducer;
