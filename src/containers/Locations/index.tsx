import React from "react";
import GoogleMap from '../../components/GoogleMap'
import LocationInfo from '../../components/LocationInformation'
import Button from '../../components/Button'
import { geolocate } from '../../helpers/geolocate'

const Locations: React.FunctionComponent = () => {
  
  return (
    <div className='container'>
      <LocationInfo 
        name={'test'}
        alerts={[{suspected:1}, {confirmed:1}, {safe:1}]}
        lastAlert={'yesterday'}
        lastVisited={'29th December'}
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
