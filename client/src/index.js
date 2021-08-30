import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { PostProvider } from './contexts/postsContext';
import { AuthProvider } from './contexts/authContext';

ReactDOM.render(
  <PostProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </PostProvider>,
  document.getElementById('root')
);
