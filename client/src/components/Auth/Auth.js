import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Grid, Paper, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { useAuthContext, getAuthData, signup, signin } from '../../contexts/authContext';

const Auth = () => {
  const history = useHistory();
  const classes = useStyles();
  const [, dispatch] = useAuthContext();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [authData, setAuthData] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      signup(dispatch, authData, history);
    } else {
      signin(dispatch, authData, history);
    }
  };

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setShowPassword(false);
  };

  //Google Login
  const googleSuccess = async (res) => {
    await getAuthData(dispatch, res);
    history.push('/');
  };

  const googleFailure = (err) => {
    console.log(`Google Sign In was unsuccessful. Try again later.`);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input type='text' name='FirstName' label='First Name' autoFocus half handleChange={handleChange} />
                <Input type='text' name='LastName' label='Last Name' half handleChange={handleChange} />
              </>
            )}

            <Input
              type='email'
              name='email'
              label='Email Address'
              autoFocus={isSignUp ? false : true}
              handleChange={handleChange}
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              name='password'
              label='Password'
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input type='password' name='confirmPassword' label='Repeat Password' handleChange={handleChange} />
            )}
          </Grid>

          <GoogleLogin
            clientId='68400902081-q7ra7t79fepelht8vnv6vf63jt2k7sfo.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                fullWidth
                className={classes.Btngoogle}
                color='primary'
                variant='contained'
                startIcon={<Icon />}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />

          <Button type='submit' className={classes.submit} variant='contained' color='primary' fullWidth>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? 'Already Have an account ? Sign In' : `Don't have an account Sign Up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
