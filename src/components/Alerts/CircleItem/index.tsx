import React from "react";
import { circleItemProps } from "./index.interface";
import "./index.style.scss";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'

const CircleItem = ({alerts}: circleItemProps): JSX.Element | null => {
  const { alertType, alertNumber, isNew } = alerts;

  const history = useHistory();

  const displayText = (!isNew) ? 
  `${alertNumber} covid case${(alertNumber === 1) ? ' was' : 's were'} recently reported in your tracked locations` :
  `${alertNumber} new ${alertType} case${(alertNumber === 1) ? ' was' : 's were'} reported since you last checked`;

  const clickHandler = () => {
    history.push('/alerts')
  }

    return (
      <div className="circleContainer">
        <div onClick={clickHandler} className={`${alertType}-${isNew ? 'un' : ''}checked-styles`}>
          <div className="number">{alertNumber}</div>
        </div>
        <div className='alert_text'>
          <p>{displayText}</p>
        </div>
      </div>
    );
};

export default CircleItem;
