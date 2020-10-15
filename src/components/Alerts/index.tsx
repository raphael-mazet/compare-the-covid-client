import React, { useState, useEffect } from "react";
import CircleItem from "./CircleItem/index";
import "./index.style.scss";
import { userAlertsVar } from '../../apolloclient/makevar'


const Alerts: React.FunctionComponent = (): JSX.Element => {
  
  const data = userAlertsVar();

  const confirmedCases = data.confirmed;
  const suspectedCases = data.suspected;
  const safeCases = data.safe;

  const [showConfirmedCircle, setShowConfirmedCircle] = useState<boolean>(false);
  const [showSuspectedCircle, setShowSuspectedCircle] = useState<boolean>(false);
  const [showSafeCircle, setShowSafeCircle] = useState<boolean>(false);
  const [noNewAlerts, setnoNewAlerts] = useState<boolean>(false);

  useEffect(() => {
    if (confirmedCases !== 0) setShowConfirmedCircle(true);
    else if (suspectedCases !== 0) setShowSuspectedCircle(true);
    else if (safeCases !== 0) setShowSafeCircle(true);
    else setnoNewAlerts(true);
  }, []);

  // style names need to correspond with styles in ./circleitem/index.style.scss
  const stylesPickerForCircles = {
    confirmedStyles: "confirmedStyles",
    suspectedStyles: "suspectedStyles",
    safeStyles: "safeStyles",
  };

  return (
    <div className='alertContainer'>
      <div>
        <h2> Covid Alerts</h2>
      </div>
      <CircleItem
        caseProps={confirmedCases}
        styleProps={stylesPickerForCircles.confirmedStyles}
        textProps={"Confirmed"}
        displayProps={showConfirmedCircle}
      />
      <CircleItem
        caseProps={suspectedCases}
        styleProps={stylesPickerForCircles.suspectedStyles}
        textProps={"Suspected"}
        displayProps={showSuspectedCircle}
      />
      <CircleItem
        caseProps={safeCases}
        styleProps={stylesPickerForCircles.safeStyles}
        textProps={"Safe"}
        displayProps={showSafeCircle}
      />
      {noNewAlerts ? (
        <p>You have no new alerts. Save some locations and get alerted.</p>
      ) : null}
    </div>
  );
};

export default Alerts;
