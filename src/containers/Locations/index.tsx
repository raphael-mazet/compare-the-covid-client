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

  const history = useHistory();
  const data = userSearchDataVar();

  useEffect(() => {
    console.log(history.location)
    if (!history.location.state || history.location.state !== 'searchbar') {
      geolocateUser();
    } 
  }, []);

  const [addLocation, {data: createLocationResponse}] = useMutation(CREATE_LOCATION,
    {onCompleted: addSavedLocationHelper});

  const [addSavedLocation, {data: createSavedLocationResponse}] = useMutation(CREATE_SAVED_LOCATION, 
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
        name: data.name,
        country: 'test',
        googlemap_URL: data.googlemap_URL,
        location_type: 'test',
        longitude: data.longitude.toString(),
        latitude: data.latitude.toString(),
      }
    });
  }

  return (
    <div className='container_locations'>
      <div className='container_locations_data'>
        <LocationInfo />
        <Button
          content='Save a location'
          onClick={clickHandler}
        />
        <Button
          content='Geolocation'
          onClick={geolocateUser}
        />
      </div>
      <div className='locations_map'>
        {(!coords.longitude || !coords.latitude) &&
          <p> Map is Loading</p>
        }
        {(coords.longitude && coords.latitude) &&
          <GoogleMap
            latitude={coords.latitude}
            longitude={coords.longitude}
          />
        }
      </div>
    </div>
  );
};

export default Locations;
