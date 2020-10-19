import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../Navigation/Layout";
import routesDefined from "./routes";

type RouteType = {
  Component: React.FunctionComponent;
  to: string;
  exact: boolean;
  isPrivate: boolean;
  title: string;
};

const Router: React.FC = () => {
  const [routes, setRoutes] = useState<RouteType[]>([]);

  useEffect(() => {
    importRoutes();
  }, []);

  const importRoutes = async () => {
    const importPromises = routesDefined.map((item) =>
      import(`../../containers/${item.component}`).then((module) =>
        setRoutes((routes) => [
          ...routes,
          {
            to: item.to,
            title: item.title,
            isPrivate: item.isPrivate,
            exact: item.exact,
            Component: module.default,
          },
        ])
      )
    );
    await Promise.all(importPromises);
  };

  const routesRender = routes?.map((route: RouteType) => {
    console.log(route.isPrivate)
    if (route.isPrivate) {
      return (
        <PrivateRoute
          key={`${route.to}-${route.title}`}
          path={route.to}
          isAuthenticated={true}
          exact={route.exact}
          render={() => (
            <Layout>
              <route.Component />
            </Layout>
          )}
        />
      );
    } else if (!route.isPrivate) {
      return (
        <Route
          key={`${route.to}-${route.title}`}
          path={route.to}
          render={() => (
            <Layout >
              <route.Component />
            </Layout>
          )}
        />
      );
    }

  });
  
  return (
    <Switch>
      {routesRender}
    </Switch>
  );
};

export { Router };
