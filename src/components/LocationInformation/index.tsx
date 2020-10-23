import React from 'react';
import "./index.style.scss";

type dataProp = {
  name: string;
  country: string;
  googlemap_URL: string;
  location_type: string;
  longitude: string;
  latitude: string;
}

interface propTypes {
  data: dataProp;
}

const LocationInfo = (props: propTypes): JSX.Element => {
  const {
    data
  } = props;
  
  const locationType = data.location_type.replace('_', ' ');
  
  return (  
    <div className='container'>
      <div>
        <p className="location_info_name">{data.name}</p>
        {/* <p className="location_info_data">lat: {parseFloat(data.latitude).toFixed(3)} - long: {parseFloat(data.longitude).toFixed(3)} </p> */}
        <p className="location_info_data">{locationType}</p>
      </div>
    </div>
  );
}

export default LocationInfo;