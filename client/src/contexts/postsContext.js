import React, { useContext, useReducer } from 'react';

import { reducer, initialState } from '../reducers/postsReducer';
import * as api from '../api';
import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL_POST,
  GET_SINGLE_POST,
  SEARCHPOST,
  CREATE_A_POST,
  UPDATE_A_POST,
  DELETE_POST,
  CHANGE_CURRENT_ID,
  CLEAR_CURRENT_ID,
  LIKE_POST,
  ADD_COMMENT,
} from '../constants/actionTypes';

const getAllPosts = async (dispatch, page) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL_POST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

const getSinglePost = async (dispatch, id) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchSinglePost(id);
    dispatch({ type: GET_SINGLE_POST, payload: data.singlePost });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

const createPost = async (dispatch, postData) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(postData);
    const post = data.data.postMessages;
    dispatch({ type: CREATE_A_POST, payload: post });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (dispatch, postData, id) => {
  try {
    const { data } = await api.updatePost(id, postData);
    const updatedPost = data.data.updatedPost;

    dispatch({ type: UPDATE_A_POST, payload: updatedPost });
  } catch (error) {
    console.log(error);
  }
};

//Deleting A Post
const deletePost = async (dispatch, id) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

const setCurrentId = (dispatch, curId) => {
  dispatch({ type: CHANGE_CURRENT_ID, payload: curId });
};

const clearCurId = (dispatch) => dispatch({ type: CLEAR_CURRENT_ID });

//Liking A Post
const likePost = async (dispatch, id) => {
  try {
    const { data } = await api.likePost(id);
    const updatedLike = data.data;
    const postId = data.id;

    const updatedInfo = { updatedLike, postId };

    dispatch({ type: LIKE_POST, payload: updatedInfo });
  } catch (error) {
    console.log(error);
  }
};

//Adding a Comment
const getComments = async (dispatch, value, id) => {
  try {
    const updatedComments = await api.comment(value, id);
    dispatch({ type: ADD_COMMENT, payload: updatedComments.data });

    return updatedComments.data;
  } catch (error) {
    console.log(error);
  }
};

//Searching Query And Tags
const getPostBySearch = async (dispatch, searchObject) => {
  dispatch({ type: START_LOADING });

  const {
    data: { data },
  } = await api.fetchPostBySearch(searchObject);
  dispatch({ type: SEARCHPOST, payload: data });

  dispatch({ type: END_LOADING });
  try {
  } catch (error) {
    console.log(error);
  }
};

//Creating Context
const PostContext = React.createContext();

const PostProvider = (children) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = [state, dispatch];
  return <PostContext.Provider value={value} {...children} />;
};

const usePostContext = () => {
  const newContext = useContext(PostContext);
  if (!newContext) {
    throw new Error(`usePostContext must be used within a PostProvider`);
  }
  return newContext;
};

export {
  PostProvider,
  usePostContext,
  getAllPosts,
  getSinglePost,
  createPost,
  setCurrentId,
  clearCurId,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
  getComments,
};
