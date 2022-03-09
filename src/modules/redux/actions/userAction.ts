import { userAction } from './actionsName';

export const setUserInforAction = (payload) => ({
  type: userAction.setUserInfo,
  payload,
});
