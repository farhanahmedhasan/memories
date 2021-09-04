import axios from 'axios';

// const url = 'https://mern-memories-first.herokuapp.com';
// const url = 'http://localhost:5000';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//Auth
export const signin = (formdata) => API.post('user/signin', formdata);
export const signup = (formdata) => API.post('user/signup', formdata);

//Search Post
export const fetchPostBySearch = (searchObject) =>
  API.get(`/posts/search?searchQuery=${searchObject.search || 'none'}&tags=${searchObject.tags}`);
