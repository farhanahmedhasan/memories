import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Pagination, PaginationItem } from '@material-ui/lab';

import { useStyles } from './style.js';
import { usePostContext, getAllPosts } from '../../contexts/postsContext';

const Paginate = ({ page }) => {
  const [state, dispatch] = usePostContext();
  const classes = useStyles();

  useEffect(() => {
    getAllPosts(dispatch, page);
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={state.totalPages}
      page={page || 1}
      variant='outlined'
      color='primary'
      renderItem={(item) => {
        return <PaginationItem {...item} component={Link} to={`posts?page=${item.page}`} />;
      }}
    />
  );
};

export default Paginate;
