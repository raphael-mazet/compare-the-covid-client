import React from 'react';
import NavigationItem from './NavigationItem';
import NavItemsProps from './index.interface';

const navigationItems = ({ availableRoutes }: NavItemsProps): JSX.Element => {

  const routes = availableRoutes.map((route) => {
    return <NavigationItem key={route.title} to={route.to} exact={route.exact}> {route.title} </NavigationItem>;
  });

  return (
    <>
      {routes}
    </>
  );
};

export default navigationItems;