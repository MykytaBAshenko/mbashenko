import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {PROJECT_SAVE_REQUEST,PROJECT_SAVE_SUCCESS,PROJECT_SAVE_FAIL, PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL} from "./constants";

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {userSignin: { userInfo }};


function projectListReducer(state = { projects: [] }, action) {

  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, projects: [] };
    case PROJECT_LIST_SUCCESS:
      return { loading: false, projects: action.payload };
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case "USER_EXIT":
        return { userInfo: false };
    default: return state;
  }
}

function projectSaveReducer(state = { projects: {} }, action) {

  switch (action.type) {
    case PROJECT_SAVE_REQUEST:
      return { loading: true };
    case PROJECT_SAVE_SUCCESS:
      return { loading: false, success: true, projects: action.payload };
    case PROJECT_SAVE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function passChangeReducer(state = { }, action) {

  switch (action.type) {
    case "PASS_SAVE_REQUEST":
      return { loading: true };
    case "PASS_SAVE_SUCCESS":
      return { loading: false, success: true, password: "all ok" };
    case "PASS_SAVE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}


function projectDeleteReducer(state = { product: {} }, action) {

  switch (action.type) {
    case "PROJECT_DELETE_REQUEST":
      return { loading: true };
    case "PROJECT_DELETE_SUCCESS":
      return { loading: false, product: action.payload, success: true };
    case "PROJECT_DELETE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

const reducer = combineReducers({
  projectList: projectListReducer,
  userSignin: userSigninReducer,
  // userRegister: userRegisterReducer,
  projectSave: projectSaveReducer,
  passChange: passChangeReducer,
  projectDelete: projectDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));//create store 1 actions 2 state
export default store;