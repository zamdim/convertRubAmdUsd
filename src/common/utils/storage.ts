import { LocalStorageKeysEnum } from 'src/common/utils/enum';

export const storageToken = () => {
  return localStorage.getItem(LocalStorageKeysEnum.TOKEN);
};

export const storageId = () => {
  return localStorage.getItem(LocalStorageKeysEnum.ID);
};
