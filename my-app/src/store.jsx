import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  massageInsertReducer,
  uploadFileReducesr,
} from "./reducers/massageReducers";

const redcer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  massageInsert: massageInsertReducer,
  uploadFile: uploadFileReducesr,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  redcer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
