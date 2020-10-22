import React from 'react';
import "./index.style.scss";
import alert from '../../../images/alert.png'
import man from '../../../images/man.png'

interface MapMarkerProps {
  lat: number
  lng: number,
  text: string;
  onClick?: (e:any) => any;
}
const MapMarker = ({ lat, lng, text, onClick }: MapMarkerProps): JSX.Element => {

  const currentLocation = text === 'Current location' ? 'current' : 'alert';

  return (
    <div className='container'>
      <div className={['wrapper', currentLocation].join(' ')}
        onClick={onClick}
      >
        {text !== 'Current location' ? <img className='alert_icon' src={alert} alt='alerticon'/> : <img className='alert_icon' src={man} alt='alerticon'/>}
      </div>
      <div className='text'>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default MapMarker;