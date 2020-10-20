import React from "react";
import { circleItemProps } from "./index.interface";
import "./index.style.scss";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'

const CircleItem = ({alerts}: circleItemProps): JSX.Element | null => {
  const { alertType, alertNumber, isNew } = alerts;

  const history = useHistory();

  const displayText = (!isNew) ? 
  `You have no new cases and ${alertNumber} active case${(alertNumber === 1) ? '' : 's'} from the last week` :
  `You have ${alertNumber} new ${alertType} case${(alertNumber === 1) ? '' : 's'} since you last checked`;

  const clickHandler = () => {
    history.push('/alerts')
  }

    return (
      <div className="circleContainer">
        <div onClick={clickHandler} className={`${alertType}-${isNew ? 'un' : ''}checked-styles`}>
          <p className="number">{alertNumber}</p>
        </div>
        <div className='alert_text'>
          <p>{displayText}</p>
        </div>
      </div>
    );
};

export default CircleItem;
