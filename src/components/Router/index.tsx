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
        <Layout location={location}>
          <Switch location={location}>
            {routes &&
              <>
              {routes.map((route: RouteType) => {
                if (route.isPrivate) {
                  return (
                    <PrivateRoute
                      key={`${route.to}-${route.title}`}
                      path={route.to}
                      exact={route.exact}
                      component={route.Component} />
                  );
                } else if (!route.isPrivate) {
                  return (
                    <Route
                      key={`${route.to}-${route.title}`}
                      path={route.to}
                      component={route.Component} />
                  );
                }
              })}
              {/* <Route path="*">
                <Redirect to='/404-not-found' />
              </Route> */}
            </>
            }
          </Switch>
        </Layout>
      )}
    />
  );
}

export { Router } ;