import React, { useState, useEffect } from 'react';
import "./index.style.scss";
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';
// import { userSearchDataVar } from '../../apolloclient/makevar'
// import { useReactiveVar } from '@apollo/client';

type GoogleMapProps = {
  latitude: number;
  longitude: number;
  name?: string;
};

const GoogleMap = (props: GoogleMapProps): JSX.Element => {

  const [center, setCenter] = useState({lat: 0, lng: 0});
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    // const data = userSearchDataVar()
 
    const centerObj = {
      lat: props.latitude,
      lng: props.longitude,
    }

    setCenter(centerObj)
  }, []);

  // const data2 = useReactiveVar(userSearchDataVar)
  // const centerObj = {
  //   lat: data2.latitude,
  //   lng: data2.longitude,
  // }
  
  // if (centerObj.lat !== center.lat) setCenter(centerObj);
  // else if (centerObj.lng !== center.lng) setCenter(centerObj);
  
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
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{ key: String(googleMapKey) }}
        center={center}
        defaultZoom={zoom}
      >
        <MapMarker
          lat={center.lat}
          lng={center.lng}
          text='Current location'
        />
        {mockData.map(location =>
          <MapMarker
            key={location.name}
            lat={location.lat}
            lng={location.lng}
            text={location.name}
          />)}
      </GoogleMapReact>
    </div>
  );
};


export default GoogleMap;
