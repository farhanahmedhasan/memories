import React, { useState, useRef } from 'react';

import { Typography, Button, TextField } from '@material-ui/core';

import useStyles from './styles';
import { usePostContext, getComments } from '../../contexts/postsContext';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [state, dispatch] = usePostContext();

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));

  const isDiabled = user && comment;
  const btnText = user ? 'Add a comment' : 'Login to add a comment';

  const handleClick = async () => {
    const finalComment = `${user?.result.name}: ${comment}`;
    const newComments = await getComments(dispatch, finalComment, post._id);
    setComments(newComments);
    setComment('');
  };

  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant='h6'>
          Comments
        </Typography>
        {comments.map((comment, i) => (
          <Typography key={i}>{comment}</Typography>
        ))}
      </div>

      {user?.result?.name && (
        <div style={{ width: '50%' }}>
          <Typography gutterBottom variant='h6'>
            Write a Comment :
          </Typography>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant='outlined'
            rows={4}
            fullWidth
            lable='Comment'
            multiline
          />
          <Button
            style={{ marginTop: '10px' }}
            color='primary'
            variant='contained'
            fullWidth
            disabled={!isDiabled}
            onClick={handleClick}
          >
            {btnText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
