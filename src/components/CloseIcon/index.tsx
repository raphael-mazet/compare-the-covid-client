import React from "react";
import './index.style.scss';
import closeicon from '../../images/close.png'

type propTypes = {
  clickHandler?: (e:any) => void;

};

const CloseIcon = ({clickHandler}: propTypes): JSX.Element  => {

  return (
    <div className="closeIcon_container" onClick={clickHandler}>
      <img className="closeIcon_asset" src={closeicon} alt="closeicon"/>
    </div>
  );
};

export default CloseIcon;