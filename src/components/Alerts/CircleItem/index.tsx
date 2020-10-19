import React from "react";
import { circleItemProps } from "./index.interface";
import "./index.style.scss";
import { Link } from "react-router-dom";

const circleItem = ({alerts}: circleItemProps): JSX.Element | null => {
  console.log(' ---> alerts', alerts);

    // style names need to correspond with styles in ./circleitem/index.style.scss
    // const stylesPickerForCircles = {
    //   confirmedUncheckedStyles: "confirmedUncheckedStyles",
    //   suspectedUncheckedStyles: "suspectedUncheckedStyles",
    //   safeUncheckedStyles: "safeUncheckedStyles",
    //   confirmedCheckedStyles: "confirmedCheckedStyles",
    //   suspectedCheckedStyles: "suspectedCheckedStyles",
    //   safeCheckedStyles: "safeCheckedStyles",
    // };
  
    // interface FilteredAlerts {
    //   alertType: string,
    //   alertNumber: number
    //   isNew: boolean
    // }
  
  const displayText = (!alerts.isNew) ? 
  `You have no new cases and ${alerts.alertNumber} active cases from the last week` :
  `You have ${alerts.alertNumber} new ${alerts.alertType} cases since you last checked`;

    return (
      <div className="circleContainer">
        <Link to="/alerts">
          <div className={`${alerts.alertType}-${alerts.isNew ? 'un' : ''}checked-styles`}>
            <p className="number">{alerts.alertNumber}</p>
          </div>
        </Link>
        <div>
          <p>{displayText}</p>
        </div>
      </div>
    );
};

export default circleItem;
