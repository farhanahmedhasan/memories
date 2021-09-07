import {
  FETCH_ALL_POST,
  GET_SINGLE_POST,
  SEARCHPOST,
  CREATE_A_POST,
  UPDATE_A_POST,
  DELETE_POST,
  CHANGE_CURRENT_ID,
  CLEAR_CURRENT_ID,
  LIKE_POST,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes';

const initialState = {
  posts: [],
  currentSinglePost: null,
  currentId: null,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_ALL_POST:
      return {
        ...state,
        posts: action.payload.data.posts,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case GET_SINGLE_POST:
      return {
        ...state,
        currentSinglePost: action.payload,
      };

    case SEARCHPOST:
      return {
        ...state,
        posts: action.payload,
      };

    case CREATE_A_POST:
      const newPost = action.payload;
      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case CHANGE_CURRENT_ID:
      return {
        ...state,
        currentId: action.payload,
      };

    case CLEAR_CURRENT_ID:
      return {
        ...state,
        currentId: null,
      };

    case UPDATE_A_POST:
      const updatedPost = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));

      return {
        ...state,
        posts: updatedPost,
        currentId: null,
      };

    case DELETE_POST:
      const filteredPost = state.posts.filter((post) => post._id !== action.payload);
      return {
        ...state,
        posts: filteredPost,
      };

    case LIKE_POST:
      // const updatedPostWithLike = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      const updatedPostWithLike = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likes: action.payload.updatedLike,
          };
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPostWithLike,
      };

    default:
      return state;
  }
};

export { initialState, reducer };
