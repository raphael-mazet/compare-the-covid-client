import { userSearchDataVar } from '../apolloclient/makevar'

export function geolocate () {

  navigator.geolocation.getCurrentPosition( async (position) => {
    const currentLongitude = await position.coords;
    // const currentLatitude = await position.coords.latitude;
    
    const obj = {
      latitude: currentLongitude.latitude,
      longitude: currentLongitude.longitude,
    }

    userSearchDataVar(obj);

  });

}