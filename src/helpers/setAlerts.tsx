import { USER_ALERTS } from '../apis/graphQL/queries';
import client from '../client';
import { Event } from '../interfaces/query.interface';
import { userAlertsVar } from '../apolloclient/makevar';

export function setAlerts (eventData: any) {
  const tempEvents: any = {
    green: [],
    yellow: [],
    red: []
  }
  eventData.forEach((event: Event) => {
    if (event.alertType === 'confirmed') {
      tempEvents.red.push(event)
    } else if (event.alertType === 'suspected') {
      tempEvents.yellow.push(event)
    } else if (event.alertType === 'safe') {
      tempEvents.green.push(event)
    }
  })

  const data = {
    confirmed: tempEvents.red,
    suspected: tempEvents.yellow,
    safe: tempEvents.green,
  }

  return data;
}