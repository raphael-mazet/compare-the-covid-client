import React from "react";
import { circleItemProps } from "./index.interface";
import "./index.style.scss";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { SavedLocations } from "../../../apolloclient/localstateinterfaces";

const CircleItem = ({alerts, savedLocations}: circleItemProps): JSX.Element | null => {
  const { alertType, alertNumber, isNew } = alerts;

  const history = useHistory();

  let displayText = '';

  if (!savedLocations.length) {
    displayText = "You are not tracking any locations. Save some below to get alerts"
  } else if (!isNew) {
    displayText = `${alertNumber} covid case${(alertNumber === 1) ? ' was' : 's were'} recently reported in your tracked locations`;
  } else {
    displayText = `${alertNumber} new ${alertType} case${(alertNumber === 1) ? ' was' : 's were'} reported since you last checked`;
  }

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
