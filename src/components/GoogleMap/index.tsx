import React, { useState, useEffect } from 'react';
import "./index.style.scss";
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';
import { classicStyle } from '../../helpers/mapstylesetting'

type Location = {
  name: string;
  latitude: number;
  longitude: number;
  location_id: number | string;
};

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  name?: string;
  style?: any[];
  savedLocations?: any[];
  mapClickedAction?: (coords: any, type: string, item: any) => any;
  markerSelectedAction: (e: any) => any;
}

const GoogleMap = (props: GoogleMapProps): JSX.Element => {

  const [center, setCenter] = useState({lat: 0, lng: 0});
  const [zoom, setZoom] = useState(15);
  const [style, setStyle] = useState(classicStyle)

  useEffect(() => {
    if (props.zoom) setZoom(props.zoom);
    if (props.style) setStyle(props.style);
    setCenter({
      lat: Number(props.latitude),
      lng: Number(props.longitude),
    });
  }, []);
  
  // https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng

  const googleMapKey = 'AIzaSyBnQCOZ8iMqtqBFAqpF7w-YdlaOBfeD3lA'
  const mapClick = (mapProps: any) => {
    props.mapClickedAction && props.mapClickedAction({ latitude: mapProps.lat, longitude: mapProps.lng }, 'geolocated', null);
  }

  const createMapOptions = (maps: any) => {
    return {
      panControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      scrollwheel: true,
      zoomControl: false,
      styles: style,

    }
  }
  
  const markers = props.savedLocations?.map(item => {
    return (
      <MapMarker
        key={`${item.location_id}-${item.name}`}
        lat={item.latitude}
        lng={item.longitude}
        text={item.name}
        onClick={()=> props.markerSelectedAction(item)}
      />
    );
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{ key: String(googleMapKey) }}
        center={center}
        defaultZoom={zoom}
        onClick={mapClick}
      >
        <MapMarker
          lat={center.lat}
          lng={center.lng}
          text='Current location'
        />
        {markers}
      </GoogleMapReact>
    </div>
  );
};


export default GoogleMap;
