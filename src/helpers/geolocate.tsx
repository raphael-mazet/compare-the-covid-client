import { userSearchDataVar } from '../apolloclient/makevar'

export function geolocate () {

  navigator.geolocation.getCurrentPosition( async (position) => {
    const currentLongitude = await position.coords.longitude;
    const currentLatitude = await position.coords.latitude;
    
    const obj = {
      latitude: currentLatitude,
      longitude: currentLongitude,
    }

    userSearchDataVar(obj);

  });

}