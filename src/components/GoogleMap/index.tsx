import React, { useState } from 'react';
import "./index.style.scss";
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

type GoogleMapProps = {
  placeName: string;
};

const GoogleMap = ({placeName}: GoogleMapProps): JSX.Element => {

  const mockData = [
    {
      name: 'waitrose',
      lat: 48.8477397, 
      lng: 2.2651683,
    },
    {
      name: 'costa',
      lat: 48.8377397, 
      lng: 2.2611683,
    },
    {
      name: 'test',
      lat: 48.8477679, 
      lng: 2.2763263,
    }
  ];

  // https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng

  const googleMapKey = 'AIzaSyBnQCOZ8iMqtqBFAqpF7w-YdlaOBfeD3lA'
  const [center, setCenter] = useState({lat: 48.8477397, lng: 2.2651683 });
  const [zoom, setZoom] = useState(13);

  const createMapOptions = (maps: any) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      zoomControl: false,
      styles: [{ stylers: [{ 'saturation': 0 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }

  return (
    <div style={{ height: '400px', width: '400px' }}>
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{ key: String(googleMapKey) }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {mockData.map(location =>
          <MapMarker
            lat={location.lat}
            lng={location.lng}
            text={location.name}
          />)}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
