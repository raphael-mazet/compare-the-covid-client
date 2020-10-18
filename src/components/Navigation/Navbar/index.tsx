import React from "react";
import "./index.style.scss";
import { routeData } from "../Layout/index.interface";

interface propsType {
  route: routeData;
}

const navBar = (props: propsType): JSX.Element => {
  return (
    <>
    <div className="navbar_container">
      <h1 className="navbar_title"> {props.route.title} </h1>
    </div>
    </>
  );
};

export default navBar;
