import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Paper, Divider, Typography, CircularProgress } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';
import { usePostContext, getSinglePost, getPostBySearch } from '../../contexts/postsContext';
import CommentSection from './CommentSection';
import RecommendedPosts from './RecommendedPosts';

const PostDetails = () => {
  const classes = useStyles();
  const [state, dispatch] = usePostContext();
  const { id } = useParams();
  const history = useHistory();

  const openMemory = (id) => history.push(`/posts/${id}`);

  useEffect(() => {
    getSinglePost(dispatch, id);
  }, [dispatch, id]);

  //Dispatching an action for Recommended posts
  useEffect(() => {
    if (state.currentSinglePost) {
      getPostBySearch(dispatch, { search: 'none', tags: state.currentSinglePost.tags.join(',') });
    }
  }, [dispatch, state.currentSinglePost]);

  if (!state.currentSinglePost) return null;

  if (state.isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  const recommendedPosts = state.posts.filter((post) => post._id !== state.currentSinglePost._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '16px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h4' component='h2'>
            {state.currentSinglePost.title}
          </Typography>

          <Typography gutterBottom variant='h6' component='h2' color='textSecondary'>
            {state.currentSinglePost.tags.map((tag) => `#${tag} `)}
          </Typography>

          <Typography gutterBottom variant='body1' component='p'>
            {state.currentSinglePost.message}
          </Typography>

          <Typography variant='h6'>Created By: {state.currentSinglePost.name}</Typography>
          <Typography variant='body1'>{moment(state.currentSinglePost.createdAt).fromNow()}</Typography>

          {/* Real Time Chating */}
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'>
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>

          {/* Comment Section */}
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={state.currentSinglePost} />
          <Divider style={{ margin: '20px 0' }} />
        </div>

        {/* Mermory Image */}
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              state.currentSinglePost.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt='Memory'
          />
        </div>
      </div>

      {/* Recommended Section */}
      {/* {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>
            You might also like:
          </Typography>
          <div className={classes.recommendedPost}>
            {recommendedPosts.map((post) => {
              return <RecommendedPosts key={post._id} post={post} openMemory={openMemory} />;
            })}
          </div>
          <Divider />
        </div>
      )} */}
    </Paper>
  );
};

export default PostDetails;
