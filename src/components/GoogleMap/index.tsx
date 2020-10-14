import React, { useState } from 'react';
import "./index.style.scss";
import GoogleMapReact from 'google-map-react';


type GoogleMapProps = {
  placeName: string;
};
const AnyReactComponent = ({text}: any) => <div>{text}</div>;


const GoogleMap = ({placeName}: GoogleMapProps): JSX.Element => {

  // const googleMapURL=`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`;
  const googleMapKey = ''
  const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: String(googleMapKey) }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          lat={11.0168}
          lng={76.9558}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
