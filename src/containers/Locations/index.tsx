import React, { useEffect, useState } from "react";
import GoogleMap from '../../components/GoogleMap';
import LocationInfo from '../../components/LocationInformation';
import Button from '../../components/Button';
import getGeolocation from '../../helpers/geolocate';
import { userSearchDataVar, authenticatedUserVar, savedLocationsVar } from '../../apolloclient/makevar'
import { CREATE_LOCATION, CREATE_SAVED_LOCATION } from '../../apis/graphQL/mutations';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import './index.style.scss';
import Loading from '../../components/Loading'
import { GET_EVENTS_BY_LOCATION_ID, GET_LOCATION_BY_URL } from "../../apis/graphQL/queries";
import filterActiveAndNew from "../../helpers/filterActiveAndNew";
import { setAlerts } from "../../helpers/setAlerts";

type Coords = {
  latitude: number | null;
  longitude: number | null;
}

const initialState = {
  latitude: null,
  longitude: null
}

const Locations: React.FunctionComponent = () => {
  const [coords, setCoords] = useState<Coords>(initialState);
  const [searchedLocation, setSelectedLocation] = useState<any>();
  const [locationSelectedType, setLocationSelectedType] = useState<string>('');
  const [locationAlerts, setLocationAlerts] = useState<any>();

  const history: any = useHistory();

  const [getSearchedLocationId, {data: searchedLocatiomDbData}] = useLazyQuery<any>(GET_LOCATION_BY_URL, {
    onCompleted:LocationAlerts
  })
  const [getLocationAlerts, {data: searchedLocationAlertsData}] = useLazyQuery<any>(GET_EVENTS_BY_LOCATION_ID, {
    onCompleted: filterAlerts
  })
  
  function LocationAlerts(data: any) {
    if (data.getLocationbyURL) {
      getLocationAlerts({
        variables: {
          location_id: data.getLocationbyURL.id
        }
      })
    }
  }

  function filterAlerts (data: any) {
    const classifiedAlerts = setAlerts(data.getEventsbyLocation_Id)
    setLocationAlerts(filterActiveAndNew(classifiedAlerts))
  }

  useEffect(() => {
    if (searchedLocation?.googlemap_URL) {
      getSearchedLocationId({
        variables: {
          googlemap_URL: searchedLocation?.googlemap_URL
        }
      })
    }
  }, [searchedLocation]);

  useEffect(() => {
    if (history.location.state !== 'searchbar') {
      geolocateUser();
      setLocationSelectedType('geoLocation');
    } else {
      setLocationSelectedType('searchedLocation');
      const searchedLocation = userSearchDataVar();
      setSelectedLocation(searchedLocation);
      setCoords({ latitude: searchedLocation.latitude, longitude: searchedLocation.longitude})
    }
  }, []);

  const [addLocation] = useMutation(CREATE_LOCATION,
    {onCompleted: addSavedLocationHelper});

  const [addSavedLocation] = useMutation(CREATE_SAVED_LOCATION, 
    {onCompleted: addSavedLocationToMakeVarHelper});

  function addSavedLocationHelper (locationResponse: any) {
    const location_id = locationResponse.createLocation.id;
    const user_id = authenticatedUserVar().id;
    addSavedLocation(
      { variables: {
        user_id,
        location_id,
        selection_date: new Date().toISOString()
      }
    });
  }

  const geolocateUser = () => {
    setCoords(initialState);
    setSelectedLocation({});
    setLocationSelectedType('geoLocation')
    getGeolocation().then((coords: Coords) => {
      setCoords(coords)
    });
  } 

  function addSavedLocationToMakeVarHelper (recievedData: any) {
    const existingSavedlocation = savedLocationsVar();
    const newSavedLocation = recievedData.createSavedLocation.location_id
    savedLocationsVar([...existingSavedlocation, newSavedLocation])
  }
  
  const clickHandler = () => {
    addLocation(
      {
        variables: {
          name: searchedLocation.name,
          country: searchedLocation.country,
          googlemap_URL: searchedLocation.googlemap_URL,
          location_type: searchedLocation.location_type,
          longitude: searchedLocation.longitude.toString(),
          latitude: searchedLocation.latitude.toString(),
        }
      });
    alert('location created');
  }

  const getLocationByGeocode = (coords: any) => {
    //get lat long from map
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`).then(
      (response) => response.json()
    ).then((data) => {
      const location = data.results[0];
      console.log('location',location)
      setSelectedLocation({
        name: location.address_components.find((item: any) => item.types.includes("premise"))?.long_name || "User Selected",
        country: location.address_components.find((item: any) => item.types.includes("country"))?.long_name,
        googlemap_URL: location.place_id,
        location_type: location.types[0],
        longitude: location.geometry.location.lng.toString(),
        latitude: location.geometry.location.lat.toString(),
      })
      setLocationSelectedType('searchedLocation')
    })
  }

  let locationInfo = null;

  if (searchedLocation && locationSelectedType === 'searchedLocation') {
    locationInfo = <LocationInfo data={searchedLocation}/>;
  } else {
    locationInfo = <p> Current Location Displayed </p>;
  }

  console.log(' ---> locationAlerts', locationAlerts);

  return (
    <div className='container_locations'>
      
      <div className="locations_subtitle">
        <p className="locations_subtitle_text">{searchedLocation?.name ? `You searched for` : `Your location`}</p>
      </div>
      
      <div className='locations_map'>
        {(!coords.longitude || !coords.latitude) &&
          <Loading/>
        }
        {(coords.longitude && coords.latitude) &&
          <GoogleMap
            latitude={coords.latitude}
            longitude={coords.longitude}
            mapClickedAction={getLocationByGeocode}
            savedLocations={savedLocationsVar()}
            markerSelectedAction={(item)=> setSelectedLocation(item)}
          />
        }
      </div>
      <div className='container_locations_data'>
        <div className='locations_data_text'>
          {locationInfo}
        </div>
        <div className="locations_data_alerts">
          <p className={`locations_data_alerts_text${locationAlerts ? `_${locationAlerts.alertType}` : ''}`}>{(!locationAlerts || !locationAlerts.alertNumber) ?
            'There are currently no alerts for this location' : 
            `${locationAlerts.alertNumber} ${locationAlerts.alertType} covid case${(locationAlerts.alertNumber === 1) ? ' was' : 's were'} reported at this location in the last week`}
          </p>
        </div>
        <div className="locations_actions">
          {
            <div className="locations_button_container">
              <Button
                disabled={!(!!locationSelectedType && !!searchedLocation && locationSelectedType === 'searchedLocation')}
                content='Save location'
                onClick={clickHandler}
              />
            </div>
          }
          <div className="locations_button_container">
            <Button
              content='Locate me'
              onClick={geolocateUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
