import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

// import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <Router>
      <Container maxWidth='lg'>
        {/* Here Wrapping does't work Doesn't update the store*/}
        {/* <AuthProvider> */}
        <Navbar />
        {/* </AuthProvider> */}

        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/auth' exact>
            {/* Here Wrapping does't work  Doesn't update the store*/}
            {/* <AuthProvider> */}
            <Auth />
            {/* </AuthProvider> */}
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
