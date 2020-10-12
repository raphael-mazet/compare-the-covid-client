interface Route {
  title: string,
  to: string,
  exact?: boolean
}

export default interface navItemsProps {
  availableRoutes: Route[];
}
