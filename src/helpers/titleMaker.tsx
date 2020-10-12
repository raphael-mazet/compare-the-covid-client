type location = {
  pathname: string;
}

type route = {
  to: string;
  title: string;
  exact: boolean;
}
const titleMaker: any = (location: location, availableRoutes: route[]): string => {
  let title = 'Compare the Covid';
  const findRoute = availableRoutes && availableRoutes.find(
    (route: route) => route.to === location.pathname);
  
  if (findRoute) title = findRoute.title;
  if (!findRoute && location.pathname) title = "Page Not Found";
  return title;
}

export default titleMaker;