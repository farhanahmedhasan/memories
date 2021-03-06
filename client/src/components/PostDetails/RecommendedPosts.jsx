import React from 'react';
import { Typography } from '@material-ui/core';

const RecommendedPosts = ({ post, openMemory }) => {
  return (
    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openMemory(post._id)}>
      <Typography gutterBottom variant='h6'>
        {post.title}
      </Typography>

      <Typography gutterBottom variant='subtitle2'>
        {post.name}
      </Typography>

      <Typography gutterBottom variant='subtitle2'>
        {post.message}
      </Typography>

      <Typography gutterBottom variant='subtitle1'>
        Likes: {post.likes.length}
      </Typography>

      <img src={post.selectedFile} width='200px' alt='memory' />
    </div>
  );
};

export default RecommendedPosts;
