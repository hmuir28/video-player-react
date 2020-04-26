import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import WbnPlayer from '../containers/WbnPlayer';

import GlobalStyle from '../styles/GlobalStyle';

const App = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/video-player" component={WbnPlayer} />
      </Switch>
      <GlobalStyle />
    </>
  </BrowserRouter>
)

export default App;
