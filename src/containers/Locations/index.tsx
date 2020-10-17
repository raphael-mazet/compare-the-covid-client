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

  const [addLocation, {data: createLocationResponse}] = useMutation(CREATE_LOCATION);
  
  const location_id = createLocationResponse.createLocation.id
  const user_id = authenticatedUserVar().id
  
  const [addSavedLocation] = useMutation(CREATE_SAVED_LOCATION, {
    variables: {
      user_id,
      location_id,
    }
  })
  // also use the same location_id alongside the user_id for this session to send createsavedlocation query to DB
  // response from usemutation, save location_id to savedlocations makevar

  return (
    <div className='container'>
      <LocationInfo/>
      <Button
        content='Save a location'
        onClick={()=>addLocation(
          {variables: {
            name: data.name,
            country: 'test',
            googlemap_URL: data.googlemap_URL,
            location_type: 'test',
            longitude: data.longitude.toString(),
            latitude: data.latitude.toString(),
          }
        }
        )}
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
