import React from "react";
import { circleItemProps } from "./index.interface";
import "./index.style.scss";
import { Link } from "react-router-dom";

const circleItem = ({alerts}: circleItemProps): JSX.Element | null => {
  const { alertType, alertNumber, isNew } = alerts;

  const displayText = (!isNew) ? 
  `You have no new cases and ${alertNumber} active case${(alertNumber === 1) ? '' : 's'} from the last week` :
  `You have ${alertNumber} new ${alertType} case${(alertNumber === 1) ? '' : 's'} since you last checked`;

    return (
      <div className="circleContainer">
        <Link to="/alerts">
          <div className={`${alertType}-${isNew ? 'un' : ''}checked-styles`}>
            <p className="number">{alertNumber}</p>
          </div>
        </Link>
        <div>
          <p>{displayText}</p>
        </div>
      </div>
    );
};

export default circleItem;
