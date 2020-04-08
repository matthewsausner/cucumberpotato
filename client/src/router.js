import React from 'react';
import { Switch, Route } from 'react-router';
import { NoMatch, Example4Page } from './pages';

const AppRouter = () =>
  <Switch>
    <Route exact path="/" component={Example4Page}/>
    <Route component={NoMatch}/>
  </Switch>;

export { AppRouter };
