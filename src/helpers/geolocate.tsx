
// type Coords = {
//   latitude: number;
//   longitude: number;
// }

const geolocate: any = () => {
  const coords = {
    latitude: 0,
    longitude: 0
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const currentCoords = await position.coords;
      coords.latitude = currentCoords.latitude;
      coords.longitude = currentCoords.longitude;
      resolve(coords);
      reject('error')
    });
  });
}

export default geolocate;