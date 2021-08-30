import React from 'react';

import { Container, Grid, Grow } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

// import { useAuthContext } from '../../contexts/authContext';

const Home = () => {
  const classes = useStyles();
  // const [state] = useAuthContext();
  // console.log(state);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={4}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
