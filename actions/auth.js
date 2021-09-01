import axios from 'axios';
import {
  setAlert
} from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from './types';




const url = `${process.env.REACT_APP_API}/user`;
const authurl = `${process.env.REACT_APP_API}/api/auth`

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }
};




// LOAD users
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(url, config);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }

}


//REGISTER user
export const register = ({
  userObject
}) => async dispatch => {

  
  const body = userObject;

  try {
    const res = await axios.post(url, body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
}



// Login User
export const connexion = ({userObject}) => async dispatch => {
  const body = userObject;
 
  try {
    const res = await axios.post(authurl, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
 
    dispatch(loadUser());

  } catch (err) {
    console.log(err);
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// lOGOUT/ Clear Profile

export const logout = ()=> dispatch => {
  dispatch({type: LOGOUT});
}
