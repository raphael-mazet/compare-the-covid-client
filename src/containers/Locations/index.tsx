import React from "react";
import GoogleMap from '../../components/GoogleMap'
import LocationInfo from '../../components/LocationInformation'
import Button from '../../components/Button'
import { geolocate } from '../../helpers/geolocate'
// import { addLocation } from '../../helpers/addLocation'
import { userSearchDataVar } from '../../apolloclient/makevar'
import { CREATE_LOCATION } from '../../apis/graphQL/mutations';
import { useMutation } from '@apollo/client';

const Locations: React.FunctionComponent = () => {
  
  const data = userSearchDataVar();

  const [addLocation] = useMutation(CREATE_LOCATION);

  console.log('stringtosend',data.longitude.toString())
  console.log('xxx',typeof data.longitude.toString())

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
