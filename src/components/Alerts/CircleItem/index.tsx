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
  const displayText = `You have new ${textProps} cases`;

  if (displayProps) {
    return (
      <div className="container">
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
