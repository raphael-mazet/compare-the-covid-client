import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

type NavProps = {
  to?: string;
  exact?: boolean;
  children?: string | undefined;
};

const navigationItem = ({
  to,
  exact,
  children,
}: NavLinkProps<NavProps>): JSX.Element => {
  return (
    <NavLink to={to} exact={exact}>
      {children}
    </NavLink>
  );
};

export default navigationItem;
