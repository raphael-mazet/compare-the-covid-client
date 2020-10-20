import React, { useEffect, useState } from "react";
import GoogleMap from '../../components/GoogleMap';
import LocationInfo from '../../components/LocationInformation';
import Button from '../../components/Button';
import getGeolocation from '../../helpers/geolocate';
// import { addLocation } from '../../helpers/addLocation'
import { userSearchDataVar, authenticatedUserVar, savedLocationsVar } from '../../apolloclient/makevar'
import { CREATE_LOCATION, CREATE_SAVED_LOCATION } from '../../apis/graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import './index.style.scss';

type Coords = {
  latitude: number | null;
  longitude: number | null;
}

const initialState = {
  latitude: null,
  longitude: null
}

const Locations: React.FunctionComponent = () => {
  const [coords, setCoords] = useState<Coords>(initialState);
  const [searchedLocation, setSelectedLocation] = useState<any>();
  const [locationSelectedType, setLocationSelectedType] = useState<string>('');

  const history: any = useHistory();
  
  useEffect(() => {
    if (history.location.state !== 'searchbar') {
      geolocateUser();
      setLocationSelectedType('geoLocation');
    } else {
      setLocationSelectedType('searchedLocation');
      const searchedLocation = userSearchDataVar();
      setSelectedLocation(searchedLocation);
      setCoords({ latitude: searchedLocation.latitude, longitude: searchedLocation.longitude})
    }
  }, []);

  const [addLocation] = useMutation(CREATE_LOCATION,
    {onCompleted: addSavedLocationHelper});

  const [addSavedLocation] = useMutation(CREATE_SAVED_LOCATION, 
    {onCompleted: addSavedLocationToMakeVarHelper});

  function addSavedLocationHelper (locationResponse: any) {
    const location_id = locationResponse.createLocation.id;
    const user_id = authenticatedUserVar().id;
    addSavedLocation(
      { variables: {
        user_id,
        location_id,
        selection_date: new Date().toISOString()
      }
    });
  }

  const geolocateUser = () => {
    setCoords(initialState);
    setSelectedLocation({});
    setLocationSelectedType('geoLocation')
    getGeolocation().then((coords: Coords) => {
      setCoords(coords)
    });
  } 

  function addSavedLocationToMakeVarHelper (recievedData: any) {
    const existingSavedlocation = savedLocationsVar();
    const newSavedLocation = recievedData.createSavedLocation.location_id
    savedLocationsVar([...existingSavedlocation, newSavedLocation])
  }
  
  const clickHandler = () => {
    addLocation(
      {
        variables: {
          name: searchedLocation.name,
          country: searchedLocation.country,
          googlemap_URL: searchedLocation.googlemap_URL,
          location_type: searchedLocation.location_type,
          longitude: searchedLocation.longitude.toString(),
          latitude: searchedLocation.latitude.toString(),
        }
      });
    alert('location created');
  }

  const getLocationByGeocode = (coords: any) => {
    //get lat long from map
    console.log(coords)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`).then(
      (response) => response.json()
    ).then((data) => {
      const location = data.results[0];
      setSelectedLocation({
        name: location.address_components.find((item: any) => item.types.includes("premise"))?.long_name || "User Selected",
        country: location.address_components.find((item: any) => item.types.includes("country"))?.long_name,
        googlemap_URL: location.place_id,
        location_type: location.types[0],
        longitude: location.geometry.location.lng.toString(),
        latitude: location.geometry.location.lat.toString(),
      })
      setLocationSelectedType('searchedLocation')
    })
  }

  let locationInfo = null;

  if (searchedLocation && locationSelectedType === 'searchedLocation') {
    locationInfo = <LocationInfo data={searchedLocation}/>;
  } else {
    locationInfo = <p> Current Location Displayed </p>;
  }

  return (
    <div className='container_locations'>
      <div className='locations_map'>
        {(!coords.longitude || !coords.latitude) &&
          <p style={{textAlign: 'center'}}> Map is Loading...</p>
        }
        {(coords.longitude && coords.latitude) &&
          <GoogleMap
            latitude={coords.latitude}
            longitude={coords.longitude}
            mapClickedAction={getLocationByGeocode}
            markerSelectedAction={(item)=> setSelectedLocation(item)}
          />
        }
      </div>
      <div className='container_locations_data'>
        <div style={{ height: '300px' }}>
          {locationInfo}
        </div>
        <div className="locations_actions">
          {
            <div className="button_container">
              <Button
                disabled={!(!!locationSelectedType && !!searchedLocation && locationSelectedType === 'searchedLocation')}
                content='Save location'
                onClick={clickHandler}
              />
            </div>
          }
          <div className="button_container">
            <Button
              content='Locate me'
              onClick={geolocateUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
