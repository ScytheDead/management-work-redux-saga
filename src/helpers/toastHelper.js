import { toast } from 'react-toastify';

export const toastError = error => {
  let message = null;

  if (typeof error === 'object' && error && error.message) {
    ({ message } = error);
  }

  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.error(message);
  }
};

export const toastSuccess = message => {
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.success(message);
  }
};
