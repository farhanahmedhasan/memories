import React, { useEffect } from 'react';

import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { ThumbUpAlt, ThumbUpAltOutlined, Delete, MoreHoriz } from '@material-ui/icons';
import moment from 'moment';

import useStyle from './styles';
import { setCurrentId, usePostContext, deletePost, likePost } from '../../../contexts/postsContext';
import { useAuthContext } from '../../../contexts/authContext';

const Post = ({ name, title, creator, likes, message, createdAt, tags, selectedFile, _id }) => {
  const classes = useStyle();
  const [, dispatch] = usePostContext();
  const [authState] = useAuthContext();

  console.log('hi');

  useEffect(() => {}, [authState]);

  const user = JSON.parse(localStorage.getItem('profile'));

  //Likes Component
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <ThumbUpAlt fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  //Likes component End

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{moment.utc(createdAt).fromNow()}</Typography>
      </div>

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

      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={() => {
            likePost(dispatch, _id);
          }}
        >
          <Likes />
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
