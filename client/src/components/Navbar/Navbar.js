import React, { useState, useEffect } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import decode from 'jwt-decode';

import useStyles from './styles';
import Logo from '../../assests/images/memories.png';
import { useAuthContext, LogUserOut } from '../../contexts/authContext';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [, dispatch] = useAuthContext();

  const logout = () => {
    LogUserOut(dispatch);
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    //JWT
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={`${classes.brandContainer} ${classes.appBarHeading}`}>
        <Typography variant='h2' align='center'>
          Memories
        </Typography>
        <img src={Logo} alt='Memories' height='60' width='60' className={classes.appBarLogo} />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <div className={classes.user}>
              <Avatar className={classes.avatar} alt={user?.result?.name} src={user?.result?.imageUrl}>
                {user?.result?.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant='h6'>
                {user?.result?.name}
              </Typography>
            </div>
            <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
