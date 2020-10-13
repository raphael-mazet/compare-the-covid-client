import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from '../Navigation/Layout';
import routesDefined from './routes';

type RouteType = {
  Component: React.FunctionComponent;
  to: string;
  exact: boolean;
  isPrivate: boolean;
  title: string;
}


const Router: React.FC = () => {
  const [routes, setRoutes] = useState<RouteType[]>([]);

  useEffect(() => {
    importRoutes();
  }, []);
  
  const importRoutes = async () => {
    const importPromises = routesDefined.map(item =>
      import(`../../containers/${item.component}`).then(module => (
          setRoutes((routes) => [...routes, {
            to: item.to,
            title: item.title,
            isPrivate: item.isPrivate,
            exact: item.exact,
            Component: module.default
          }])
      ))
    );
    await Promise.all(importPromises);
  }
  
  return (
    <Route 
      render={({ location }) => (
          <Switch>
            {routes &&
              routes.map((route: RouteType) => {
                if (route.isPrivate) {
                  return (
                    <PrivateRoute
                      key={`${route.to}-${route.title}`}
                      path={route.to}
                      exact={route.exact}
                      render={() => (
                        <Layout location={location}>
                          <route.Component />
                        </Layout>
                      )} />
                  );
                } else if (!route.isPrivate) {
                  return (
                    <Route
                      key={`${route.to}-${route.title}`}
                      path={route.to}
                      render={() => (
                        <Layout location={location}>
                          <route.Component />
                        </Layout>
                      )} />
                  );
                }
              })
            }
          </Switch>
      )}
    />
  );
}

export { Router } ;