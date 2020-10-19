import React, { useEffect } from "react";
import GoogleMap from '../../components/GoogleMap'
import LocationInfo from '../../components/LocationInformation'
import Button from '../../components/Button'
import { geolocate } from '../../helpers/geolocate'
// import { addLocation } from '../../helpers/addLocation'
import { userSearchDataVar, authenticatedUserVar, savedLocationsVar } from '../../apolloclient/makevar'
import { CREATE_LOCATION, CREATE_SAVED_LOCATION } from '../../apis/graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const Locations: React.FunctionComponent = () => {
  const history = useHistory();
  const data = userSearchDataVar();

  useEffect(() => {
    if (!history.location || !history.location.state || history.location.state !== 'searchbar') {
      geolocate()
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

  function addSavedLocationToMakeVarHelper (recievedData: any) {
    const existingSavedlocation = savedLocationsVar();
    const newSavedLocation = recievedData.createSavedLocation.location_id
    savedLocationsVar([...existingSavedlocation, newSavedLocation])
  }

  const clickHandler = () => {
    addLocation(
      { variables: {
        name: data.name,
        country: 'test',
        googlemap_URL: data.googlemap_URL,
        location_type: 'test',
        longitude: data.longitude.toString(),
        latitude: data.latitude.toString(),
      }
    })
    alert('location created');
    ;
  }

  return (
    <div className='container'>
      <LocationInfo/>
      <Button
        content='Save a location'
        onClick={clickHandler}
      />
      <Button
        content='Geolocation'
        onClick={geolocate}
      />
      <GoogleMap placeName={'test'}/>
    </div>
  );
};

export default Locations;
