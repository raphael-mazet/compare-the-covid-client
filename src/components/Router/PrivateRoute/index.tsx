import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticatedUserVar } from '../../../apolloclient/makevar';

interface PrivateRouteProps {
  render: React.FunctionComponent;
  exact?: boolean;
  path: string;
}

const PrivateRoute = ({
  render,
  exact,
  path,
}: PrivateRouteProps): JSX.Element => {
  const isAuth = authenticatedUserVar().token ? true : false;

  const routeComponent = (props: any, ...children: JSX.Element[]) =>
    isAuth ? (
      React.createElement(render, props, ...children)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route path={path} exact={exact} render={routeComponent} />;
};

export default PrivateRoute;

{
  /* <PrivateRoute
  path='/private'
  isAuthenticated={this.props.state.session.isAuthenticated}
  component={PrivateContainer}
/> */
}
