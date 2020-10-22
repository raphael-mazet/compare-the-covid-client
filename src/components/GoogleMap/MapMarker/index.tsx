import React from 'react';
import "./index.style.scss";
import alert from '../../../images/alert.png'

interface MapMarkerProps {
  lat: number
  lng: number,
  text: string;
  onClick?: (e:any) => any;
}

const MapMarker = ({ lat, lng, text, onClick }: MapMarkerProps): JSX.Element => (
  <div className='container'>
    <div className='wrapper'
      onClick={onClick}
    >
      <img className ='alert_icon' src={alert} alt='alerticon'/>
    </div>
    <div className='text'>
      <p>{text}</p>
    </div>
  </div>
);

export default MapMarker;