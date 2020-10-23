import { RouteProps } from "react-router";

export interface ILayoutProps {
  children: RouteProps["children"];
}

type actionFooter = {
  title: string;
  action: string;
};

export interface routeData {
  to: string;
  exact: boolean;
  title: string;
  isPrivate: boolean;
  component: string;
  footerActions: actionFooter[];
}
