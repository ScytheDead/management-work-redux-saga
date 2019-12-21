import * as modalTypes from '../constants/modal';

export const showModal = () => ({
  type: modalTypes.SHOW_MODAL,
});

export const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
});

export const changeTitleModal = title => ({
  type: modalTypes.CHANGE_TITLE_MODAL,
  payload: {
    title,
  },
});

export const changeContentModal = component => ({
  type: modalTypes.CHANGE_CONTENT_MODAL,
  payload: {
    component,
  },
});
