import React from "react";
import CircleItemProps from "./index.interface";
import "./index.style.scss";
import { Link } from "react-router-dom";

const circleItem = ({
  caseProps,
  styleProps,
  textProps,
  displayProps,
}: CircleItemProps): JSX.Element | null => {
  
  let displayText;
  
  if (styleProps === ('confirmedCheckedStyles' || 'suspectedCheckedStyles' || 'safeCheckedStyles')) {
    displayText = `You have no new cases and ${caseProps} active cases from the last week`;
  } else {
    displayText = `You have ${caseProps} new ${textProps} cases since you last checked`;
  }  
  
  if (displayProps) {
    return (
      <div className="circleContainer">
        <Link to="/alerts">
          <div className={styleProps}>
            <p className="number">{caseProps}</p>
          </div>
        </Link>
        <div>
          <p>{displayText}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default circleItem;
