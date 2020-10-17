import React from "react";
import GoogleMap from '../../components/GoogleMap'
import LocationInfo from '../../components/LocationInformation'
import Button from '../../components/Button'
import { geolocate } from '../../helpers/geolocate'
// import { addLocation } from '../../helpers/addLocation'
import { userSearchDataVar, authenticatedUserVar } from '../../apolloclient/makevar'
import { CREATE_LOCATION, CREATE_SAVED_LOCATION } from '../../apis/graphQL/mutations';
import { useMutation } from '@apollo/client';

const Locations: React.FunctionComponent = () => {
  
  const data = userSearchDataVar();

  const [addLocation, {data: createLocationResponse}] = useMutation(CREATE_LOCATION,
    {onCompleted: addSavedLocationHelper});

  const [addSavedLocation] = useMutation(CREATE_SAVED_LOCATION);

  function addSavedLocationHelper (locationResponse: any) {
    const location_id = locationResponse.createLocation.id
    const user_id = authenticatedUserVar().id

    addSavedLocation(
      { variables: {
        user_id,
        location_id,
        selection_date: new Date().toISOString()
      }
    });
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
    });
  }

  // also use the same location_id alongside the user_id for this session to send createsavedlocation query to DB
  // response from usemutation, save location_id to savedlocations makevar

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
