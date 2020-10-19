import React from "react";
import "./index.style.scss";
import { routeData } from "../Layout/index.interface";
import { authenticatedUserVar } from '../../../apolloclient/makevar';
import Button from '../../Button';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '../../../images/logout';

interface propsType {
  route: routeData;
}

const NavBar: React.FC<propsType> = (props: propsType) => {
  const history = useHistory();

  const onLogout = (e: any) => {
    e.preventDefault();
    authenticatedUserVar();
    history.push('/login');
  }

  return (
    <div className="navbar_container">
      <h1 className="navbar_title"> {props.route.title} </h1>
      {props.route.title !== 'Login' &&
        <div style={{ width: '20%', margin: 'auto', textAlign: 'right' }}>
          <Button
            content={<LogoutIcon color="black" height="24"/>}
            buttonType='logout cancel'
            onClick={(e)=> onLogout(e)}
          />
        </div>
      }
    </div>
  );
};

export default NavBar;
