import { RouteProps } from "react-router";

export default interface ILayoutProps {
  location: RouteProps["location"];
  children: RouteProps["children"];
}