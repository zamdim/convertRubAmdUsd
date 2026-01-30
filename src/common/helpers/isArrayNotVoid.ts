export const isArrayNotVoid = (arr: any) => {
  if (arr && Array.isArray(arr) && arr?.length) {
    return !arr.every((el) => el === 'none');
  } else return false;
};
