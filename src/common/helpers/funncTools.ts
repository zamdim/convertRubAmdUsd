import { toast } from 'react-toastify';
import { TextFieldPropValue } from '@consta/uikit/TextField';

export const showToastError = (msg: string) => {
  toast(msg, {
    type: 'error',
    theme: 'colored',
    position: 'bottom-left',
  });
};

export const showToastSuccess = (msg: string) => {
  toast(msg, {
    type: 'success',
    theme: 'colored',
    position: 'bottom-left',
  });
};

export const getQueryForFetch = (query: string | undefined) => {
  if (query?.length) {
    return `?${query}`;
  }
  return '';
};

export const checkIsNumber = (str: TextFieldPropValue) => {
  return !str || /^\d+$/.test(str);
};
