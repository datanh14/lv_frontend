import Cookie from 'js-cookie';
import produce from 'immer';
import { userAction } from '../actions/actionsName';

const initialState = {
  userInfo: null,
};

const userReducer = (state = initialState, action: any) =>
  produce(state, (newState) => {
    switch (action.type) {
      case userAction.setUserInfo:
        console.log('userAction.setUserInfo', action.payLoad);

        newState.userInfo = action.payload;
        break;

      default:
        newState = state;
        break;
    }
  });

export default userReducer;
