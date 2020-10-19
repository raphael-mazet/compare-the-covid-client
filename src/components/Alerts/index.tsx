import React, { useState, useEffect } from "react";
import CircleItem from "./CircleItem/index";
import "./index.style.scss";
import { userAlertsVar, authenticatedUserVar } from '../../apolloclient/makevar'


const Alerts: React.FunctionComponent = (): JSX.Element => {
  
  const data = userAlertsVar();
  const todaysDate = new Date().toISOString();
  const last_checkedEventsDate = String(authenticatedUserVar().last_checkedEvents);
 
  console.log('lastcheckedevents', authenticatedUserVar().last_checkedEvents)

  const filteredConfirmedCases = data.confirmed.filter(event => event.expires_on > todaysDate);
  const filteredSuspectedCases = data.suspected.filter(event => event.expires_on > todaysDate);
  const filteredSafeCases = data.safe.filter(event => event.expires_on > todaysDate);

  const filteredCheckedConfirmedCases = filteredConfirmedCases.filter(event => event.expires_on > last_checkedEventsDate);
  const filteredCheckedSuspectedCases = filteredSuspectedCases.filter(event => event.expires_on > last_checkedEventsDate);
  const filteredCheckedSafeCases = filteredSafeCases.filter(event => event.expires_on > last_checkedEventsDate);

  const confirmedCases = filteredCheckedConfirmedCases.length;
  const suspectedCases = filteredCheckedSuspectedCases.length;
  const safeCases = filteredCheckedSafeCases.length;

  const confirmedCheckedCases = filteredConfirmedCases.length - confirmedCases;
  const suspectedCheckedCases = filteredSuspectedCases.length - suspectedCases;
  const safeCheckedCases = filteredSafeCases.length - safeCases;


  const [showConfirmedCircle, setShowConfirmedCircle] = useState<boolean>(false);
  const [showSuspectedCircle, setShowSuspectedCircle] = useState<boolean>(false);
  const [showSafeCircle, setShowSafeCircle] = useState<boolean>(false);
  const [showCheckedConfirmedCircle, setShowCheckedConfirmedCircle] = useState<boolean>(false);
  const [showCheckedSuspectedCircle, setShowCheckedSuspectedCircle] = useState<boolean>(false);
  const [showCheckedSafeCircle, setShowCheckedSafeCircle] = useState<boolean>(false); 
  const [noNewAlerts, setnoNewAlerts] = useState<boolean>(false);

  useEffect(() => {
    if (confirmedCases !== 0) setShowConfirmedCircle(true);
    else if (confirmedCheckedCases!==0) setShowCheckedConfirmedCircle(true);
    else if (suspectedCases !== 0) setShowSuspectedCircle(true);
    else if (suspectedCheckedCases !== 0) setShowCheckedSuspectedCircle(true);
    else if (safeCases !== 0) setShowSafeCircle(true);
    else if (safeCheckedCases !==0) setShowCheckedSafeCircle(true);
    else setnoNewAlerts(true);
  }, []);

  // style names need to correspond with styles in ./circleitem/index.style.scss
  const stylesPickerForCircles = {
    confirmedUncheckedStyles: "confirmedUncheckedStyles",
    suspectedUncheckedStyles: "suspectedUncheckedStyles",
    safeUncheckedStyles: "safeUncheckedStyles",
    confirmedCheckedStyles: "confirmedCheckedStyles",
    suspectedCheckedStyles: "suspectedCheckedStyles",
    safeCheckedStyles: "safeCheckedStyles",
  };

  return (
    <div className='alertContainer'>
      <div>
        <h2> Covid Alerts</h2>
      </div>
      <CircleItem
        caseProps={confirmedCases}
        styleProps={stylesPickerForCircles.confirmedUncheckedStyles}
        textProps={"Confirmed"}
        displayProps={showConfirmedCircle}
      />
      <CircleItem
        caseProps={suspectedCases}
        styleProps={stylesPickerForCircles.suspectedUncheckedStyles}
        textProps={"Suspected"}
        displayProps={showSuspectedCircle}
      />
      <CircleItem
        caseProps={safeCases}
        styleProps={stylesPickerForCircles.safeUncheckedStyles}
        textProps={"Safe"}
        displayProps={showSafeCircle}
      />
      <CircleItem
        caseProps={confirmedCases}
        styleProps={stylesPickerForCircles.confirmedCheckedStyles}
        textProps={"Confirmed"}
        displayProps={showCheckedConfirmedCircle}
      />
      <CircleItem
        caseProps={suspectedCases}
        styleProps={stylesPickerForCircles.suspectedCheckedStyles}
        textProps={"Suspected"}
        displayProps={showCheckedSuspectedCircle}
      />
      <CircleItem
        caseProps={safeCases}
        styleProps={stylesPickerForCircles.safeCheckedStyles}
        textProps={"Safe"}
        displayProps={showCheckedSafeCircle}
      />
      {noNewAlerts ? (
        <p>You have no new alerts. Save some locations and get alerted.</p>
      ) : null}
    </div>
  );
};

export default Alerts;
