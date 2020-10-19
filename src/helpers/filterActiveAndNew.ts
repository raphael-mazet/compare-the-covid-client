import { authenticatedUserVar } from '../apolloclient/makevar';
import { Event } from '../interfaces/query.interface';
import { UserAlerts } from '../apolloclient/localstateinterfaces';
import { FilteredAlerts } from '../components/Alerts/CircleItem/index.interface'

function filterActiveAndNew (alerts: any): FilteredAlerts {
  const todaysDate = new Date().toISOString();
  const last_checkedEventsDate = String(authenticatedUserVar().last_checkedEvents);
  let isNew = false;
  let highestAlertLevel: string | undefined;
  let res: FilteredAlerts = {alertType: 'safe', alertNumber: 0, isNew: false};

  for (const alertType in alerts) {
    const filteredAlerts = alerts[alertType].filter((event: Event) => event.created_at > last_checkedEventsDate);
    if (filteredAlerts.length) {
      isNew = true;
      if (alertType === 'confirmed') {
        return {alertType, alertNumber: filteredAlerts.length, isNew};
      } else if (alertType === 'suspected') {
        highestAlertLevel = 'suspected';
        res = {alertType, isNew, alertNumber: filteredAlerts.length}
      } else if (!highestAlertLevel) res = {alertType, isNew, alertNumber: filteredAlerts.length}
    }
  }

  if (isNew) {
    return res;
  } else {
    for (const alertType in alerts) {
      const filteredAlerts = alerts[alertType].filter((event: Event) => event.expires_on > todaysDate);
      if (filteredAlerts.length) {
        if (alertType === 'confirmed') {
          return {alertType, alertNumber: filteredAlerts.length, isNew};
        } else if (alertType === 'suspected') {
          highestAlertLevel = 'suspected';
          res = {alertType, isNew, alertNumber: filteredAlerts.length}
        } else if (!highestAlertLevel) res = {alertType, isNew, alertNumber: filteredAlerts.length}
      }
    }
  }
  return res
}

export default filterActiveAndNew;