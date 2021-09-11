import React from 'react';
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';

const Likes = ({ likes, hasLikedPost }) => {
  if (likes.length > 0) {
    return hasLikedPost ? (
      <>
        <ThumbUpAlt fontSize='small' />
        &nbsp;
        {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
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

export default Likes;
