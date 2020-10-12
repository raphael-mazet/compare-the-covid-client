import React from 'react';
import titleMaker from '../../../helpers/titleMaker';
import { RouteProps } from 'react-router';
import './index.style.scss';

type availableRoutesProp = {
  to: string;
  title: string;
}

interface receivedProps {
  location: RouteProps["location"];
  availableRoutes: availableRoutesProp[];
}

const navBar = ({ location, availableRoutes }: receivedProps): JSX.Element => {
  
  return (
    <div className='navbar_container'>
      <h1 className='navbar_title'> {titleMaker(location, availableRoutes)} </h1>
    </div>
  );
};

export default navBar;