import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RouterProps from './index.interface';
import PrivateRoute from './PrivateRoute';

function Router({ isLoggedin }: RouterProps ): JSX.Element {
  return (
    <Switch>
      <PrivateRoute path="/" isAuthenticated={isLoggedin} exact component={null}/>
      <PrivateRoute path="/home" isAuthenticated={isLoggedin}  component={null}/>
      <PrivateRoute path="/locations" isAuthenticated={isLoggedin}  component={null} />
      <Route path="/404" component={() => { return null;}}/>
      <Route path="*">
        <Redirect to="/404"/>
      </Route>
      <Route path="/login" component={() => { return null; }}/>
      <Route path="/signup" component={() => { return null; }}/>
    </Switch>
  );
}

export default Router;


