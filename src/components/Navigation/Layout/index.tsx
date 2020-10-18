import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { ILayoutProps, routeData } from "./index.interface";
import routes from "../../Router/routes";
import "./index.style.scss";
import currentLocationData from "../../../helpers/locationChecker";

const initialRoute = {
  to: "",
  title: "",
  exact: false,
  footerActions: [],
  isPrivate: false,
  component: "",
};

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const [currentRoute, setCurrentRoute] = useState<routeData>(initialRoute);

  useEffect(() => {
    const routeData = currentLocationData(props.location, routes);
    setCurrentRoute(routeData);
  }, []);

  return (
    <div className="container">
      <Navbar route={currentRoute} />
      <div className="layout_page_container">
        {props.children}
      </div>
      <Footer route={currentRoute} />
    </div>
  );
};

export default Layout;
