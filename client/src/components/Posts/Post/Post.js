import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Card, CardMedia, CardContent, CardActions, Button, Typography, ButtonBase } from '@material-ui/core';
import { Delete, MoreHoriz } from '@material-ui/icons';
import moment from 'moment';

import useStyle from './styles';
import Likes from './Like';
import { setCurrentId, usePostContext, deletePost, likePost } from '../../../contexts/postsContext';
import { useAuthContext } from '../../../contexts/authContext';

const Post = ({ name, title, creator, likes, message, createdAt, tags, selectedFile, _id }) => {
  const classes = useStyle();
  const [, dispatch] = usePostContext();
  const [authState] = useAuthContext();
  const [AllLike, setAllLike] = useState(likes);
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('profile'));

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId);

  useEffect(() => {}, [authState]);

  const openMemory = () => history.push(`posts/${_id}`);

  const handleLike = async () => {
    likePost(dispatch, _id);
    if (hasLikedPost) {
      setAllLike(likes.filter((likeId) => likeId !== userId));
    } else {
      setAllLike([...likes, userId]);
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      {/* This is responsible for opening a single Post */}
      <div className={classes.overlay2}>
        {/* Edit Button */}
        {(user?.result.googleId === creator || user?.result?._id === creator) && (
          <Button
            size='small'
            style={{ color: 'white' }}
            onClick={() => {
              setCurrentId(dispatch, _id);
            }}
          >
            <MoreHoriz fontSize='medium' />
          </Button>
        )}
      </div>
      <ButtonBase onClick={openMemory} className={classes.buttonBase}>
        <CardMedia className={classes.media} image={selectedFile} title={title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='body2'>{moment.utc(createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary' component='h2'>
            {tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
          {title}
        </Typography>
        <CardContent className={classes.cardContent}>
          <Typography variant='body2' color='textSecondary' component='p'>
            {message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
          <Likes likes={AllLike} hasLikedPost={hasLikedPost} />
        </Button>

        {/* Delete Button */}
        {(user?.result.googleId === creator || user?.result?._id === creator) && (
          <Button
            size='small'
            color='primary'
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              const result = confirm('Want to delete?');
              if (result) {
                deletePost(dispatch, _id);
              }
            }}
          >
            <Delete fontSize='small' />
            <span>Delete</span>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
