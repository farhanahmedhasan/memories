import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Paper, Divider, Typography, CircularProgress } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';
import { usePostContext, getSinglePost } from '../../contexts/postsContext';
import CommentSection from './CommentSection';

const PostDetails = () => {
  const classes = useStyles();
  const [state, dispatch] = usePostContext();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getSinglePost(dispatch, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!state.currentSinglePost) return null;

  if (state.isLoading) {
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em' />
    </Paper>;
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '16px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.sectoin}>
          <Typography variant='h4' component='h2'>
            {state.currentSinglePost.title}
          </Typography>

          <Typography gutterBottom variant='h6' component='h2' color='textSecondary'>
            {state.currentSinglePost.tags.map((tag) => `#tag `)}
          </Typography>

          <Typography gutterBottom variant='body1' component='p'>
            {state.currentSinglePost.message}
          </Typography>

          <Typography variant='h6'>Created By: {state.currentSinglePost.name}</Typography>
          <Typography variant='body1'>{moment(state.currentSinglePost.createdAt).fromNow()}</Typography>

          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'>
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>

          <Divider style={{ margin: '20px 0' }} />
          <CommentSection />
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
    </Paper>
  );
};

export default PostDetails;
