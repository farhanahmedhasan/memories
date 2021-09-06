import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Grid, Grow, Paper, TextField, AppBar, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import { usePostContext, getPostBySearch } from '../../contexts/postsContext';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const [, dispatch] = usePostContext();

  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();

  const page = +query.get('page') || 1;

  const searchQuery = query.get('searchQuery');

  const searchPost = () => {
    if (search.trim() || tags) {
      getPostBySearch(dispatch, { search, tags: tags.join(',') });
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (chip) => {
    setTags([...tags, chip]);
  };
  const handleDelete = (chipToDelete) => {
    setTags(tags.filter((tag) => chipToDelete !== tag));
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={4}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBar position='static' color='inherit' className={classes.appBarSearch}>
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                onKeyDown={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <ChipInput
                style={{ margin: '10px 0' }}
                variant='outlined'
                label='Search Tags'
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                className={classes.input}
              />

              <Button className={classes.searchBtn} onClick={searchPost} variant='outlined' color='primary'>
                Search
              </Button>
            </AppBar>

            <Form />

            {!tags.length && !searchQuery && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
