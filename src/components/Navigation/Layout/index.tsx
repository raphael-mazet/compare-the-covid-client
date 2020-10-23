import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { ILayoutProps, routeData } from "./index.interface";
import routes from "../../Router/routes";
import "./index.style.scss";
import currentLocationData from "../../../helpers/locationChecker";
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  useEffect(() => {
    const routeData = currentLocationData(location, routes);
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
