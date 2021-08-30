import React, { useContext, useReducer } from 'react';

import { reducer, initialState } from '../reducers/authReducer';
import { AUTH, LOGOUT } from '../constants/actionTypes';

import * as api from '../api';

const getAuthData = async (dispatch, res) => {
  try {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch({ type: AUTH, data: { result, token } });
  } catch (error) {
    console.log(error);
  }
};

const LogUserOut = (dispatch) => {
  dispatch({ type: LOGOUT });
};

const signup = async (dispatch, formData, history) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
const signin = async (dispatch, formData, history) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

//Creating Auth Context
const AuthContext = React.createContext();

const AuthProvider = (children) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = [state, dispatch];
  return <AuthContext.Provider value={value} {...children} />;
};

const useAuthContext = () => {
  const newContext = useContext(AuthContext);
  if (!newContext) {
    throw new Error(`useAuthContext must be used within a AuthProvider`);
  }
  return newContext;
};

export { AuthProvider, useAuthContext, getAuthData, LogUserOut, signup, signin };
