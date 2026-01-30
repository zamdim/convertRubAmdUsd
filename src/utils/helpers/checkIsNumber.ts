import { TextFieldPropValue } from '@consta/uikit/TextField';

export const checkIsNumber = (str: TextFieldPropValue) => {
  return (
    !str || (!isNaN(Number(str)) && !str.includes(' ') && Number(str) >= 0)
  );
};
