import React from "react";
import GoogleMap from '../../components/GoogleMap'
import LocationInfo from '../../components/LocationInformation'
import Button from '../../components/Button'
import { geolocate } from '../../helpers/geolocate'

const Locations: React.FunctionComponent = () => {
  
  return (
    <div className='container'>
      <LocationInfo/>
      <Button
        content='Geolocation'
        onClick={geolocate}
      />
      <GoogleMap placeName={'test'}/>
    </div>
  );
};

export default Locations;
