import { RouteProps } from "react-router";

type location = RouteProps["location"];

type route = {
  to: string;
  title: string;
  exact: boolean;
  footerActions: any[];
  isPrivate: boolean;
  component: string;
};

const locationChecker = (
  location: location,
  availableRoutes: route[]
): route => {
  const currentRoute = {
    to: "",
    title: "",
    exact: false,
    footerActions: [],
    isPrivate: false,
    component: "",
  };

  if (location) {
    const findRoute =
      availableRoutes &&
      availableRoutes.find((route: route) => route.to === location.pathname);

    if (findRoute) Object.assign(currentRoute, findRoute);
    if (!findRoute && location.pathname)
      Object.assign(
        currentRoute,
        availableRoutes.find((route: route) => route.to === "/404-not-found")
      );
  }

  return currentRoute;
};

export default locationChecker;
