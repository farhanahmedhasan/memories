import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyle from './styles';
import { usePostContext, createPost, updatePost, clearCurId } from '../../contexts/postsContext';
import { useAuthContext } from '../../contexts/authContext';

const Form = () => {
  const classes = useStyle();
  const [state, dispatch] = usePostContext();
  const [authState] = useAuthContext();

  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

  useEffect(() => {
    if (state.currentId) {
      const post = state.posts.find((post) => post._id === state.currentId);
      setPostData(post);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentId, authState.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.currentId) {
      updatePost(dispatch, { ...postData, name: user?.result?.name }, state.currentId);
    } else {
      createPost(dispatch, { ...postData, name: user?.result?.name });
    }

    clear();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setPostData({ ...postData, [name]: value });
  };

  const clear = () => {
    clearCurId(dispatch);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography align='center' variant='h6'>
          Login/SignUp to create A memory. And like other's memory
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={`${classes.paper}`}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{state.currentId ? 'Edit' : 'Create'} a Memory</Typography>

        <TextField
          name='title'
          label='Title'
          variant='outlined'
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />

        <TextField
          name='message'
          label='Message'
          variant='outlined'
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />

        <TextField
          name='tags'
          label='Add Tags (Coma Separated)'
          variant='outlined'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />

        <div className={classes.textField}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>

        <Button className={classes.btnSubmit} variant='contained' type='submit' color='primary' size='large' fullWidth>
          Submit
        </Button>
        <Button variant='contained' color='secondary' size='medium' fullWidth onClick={clear}>
          Reset
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
