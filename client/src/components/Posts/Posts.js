import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';
import useStyle from './styles';

import Post from '../Posts/Post/Post';
import { usePostContext } from '../../contexts/postsContext';

const Posts = () => {
  const [state] = usePostContext();
  const classes = useStyle();

  if (!state.isLoading && !state.posts) {
    return <h1>No post's Found</h1>;
  }

  return (
    <>
      {state.isLoading ? (
        <div className={classes.wrapperSpinner}>
          <CircularProgress className={classes.spinner} />
        </div>
      ) : (
        <Grid container alignItems='stretch' spacing={3} className={classes.container}>
          {state.posts.map((post) => {
            const { _id } = post;
            return (
              <Grid item key={_id} xs={12} sm={6} md={4} lg={3}>
                <Post {...post} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Posts;
