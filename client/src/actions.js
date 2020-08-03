import Cookie from 'js-cookie';

import axios from "axios";
import { PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, PROJECT_SAVE_REQUEST, PROJECT_SAVE_SUCCESS, PROJECT_SAVE_FAIL} from "./constants";

const listProjects = () => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });
    const { data } = await axios.get("/api/projects");
    dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
  }
  catch (error) {

    dispatch({ type: PROJECT_LIST_FAIL, payload: error.message });
  }
}



const signin = (login, password) => async (dispatch) => {
  console.log(login, password)
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { login, password } });
  try {
    const { data } = await axios.post("/api/user/signin", { login, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const saveProject = (project) => async (dispatch, getState) => {
  console.log(project)
  try {
    dispatch({ type: PROJECT_SAVE_REQUEST, payload: project });
    const { userSignin: { userInfo } } = getState();
    if (!project._id) {
      const { data } = await axios.post('/api/projects/', project, {
        headers: {
          'Authorization': userInfo.token
        }
      });
      dispatch({ type: PROJECT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put('/api/projects/' + project._id, project, {
        headers: {
          'Authorization':  userInfo.token
        }
      });
      dispatch({ type: PROJECT_SAVE_SUCCESS, payload: data });
    }

  } catch (error) {
    dispatch({ type: PROJECT_SAVE_FAIL, payload: error.message });
  }
}

const send_change_pass = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PASS_SAVE_REQUEST", payload: user });
    const { userSignin: { userInfo } } = getState();
      const { data } = await axios.put('/api/user/' + user._id, user, {
        headers: {
          'Authorization':  userInfo.token
        }
      });
      dispatch({ type: "PASS_SAVE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PASS_SAVE_FAIL", payload: error.message });
  }
}

const deleteProject = (productId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: "PROJECT_DELETE_REQUEST", payload: productId });
    const { data } = await axios.delete("/api/projects/" + productId, {
      headers: {
        Authorization: userInfo.token
      }
    });
    dispatch({ type: "PROJECT_DELETE_SUCCESS", payload: data, success: true });
  } catch (error) {
    dispatch({ type: "PROJECT_DELETE_FAIL", payload: error.message });

  }
}

export {listProjects , signin, saveProject, send_change_pass, deleteProject};