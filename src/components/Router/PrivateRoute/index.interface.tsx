export default interface PrivateRouteProps {
  component: any;
  isAuthenticated?: boolean;
  exact?: boolean;
  path: string;
}
