import { combineReducers } from 'redux';

import systemReducer from './reducers/systemReducer';
import userReducer from './reducers/userReducer';
// import homeReducer from "../../features/home/reducers";

const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  // homeReducer,
});

export default rootReducer;
