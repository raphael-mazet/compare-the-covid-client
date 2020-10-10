import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  component: any
  isAuthenticated?: boolean
  exact?: boolean
  path: string
}

const PrivateRoute = ({ component, isAuthenticated, exact, path }: PrivateRouteProps): JSX.Element => {
  const routeComponent = (props: any, ...children: JSX.Element[]) => (
    isAuthenticated
      ? React.createElement(component, props, ...children)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route path={path} exact={exact} render={routeComponent} />;
};

export default PrivateRoute;


{/* <PrivateRoute
  path='/private'
  isAuthenticated={this.props.state.session.isAuthenticated}
  component={PrivateContainer}
/> */}