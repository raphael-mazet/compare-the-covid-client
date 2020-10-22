import React, { useEffect, useState } from "react";
import GoogleMap from '../../components/GoogleMap';
import LocationInfo from '../../components/LocationInformation';
import Button from '../../components/Button';
import getGeolocation from '../../helpers/geolocate';
// import { addLocation } from '../../helpers/addLocation'
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

let placeSearch: google.maps.places.PlaceSearchRequest;

const Locations: React.FunctionComponent = () => {
  const [coords, setCoords] = useState<Coords>(initialState);
  const [searchedLocation, setSelectedLocation] = useState<any>({});
  const [markerClicked, setMarkerClicked] = useState<boolean>(false);
  const [locationSelectedType, setLocationSelectedType] = useState<string>('');
  const searchedLocationCache = userSearchDataVar();
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
      setCoords({ latitude: searchedLocationCache?.latitude || null, longitude: searchedLocationCache?.longitude|| null})
      setSelectedLocation(searchedLocationCache);
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
    setLocationAlerts(null);
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

  const getLocationByGeocode = async (coords: any, type: string, item: any) => {
    if (type === 'existingMarker') {
      setMarkerClicked(true);
      setSelectedLocation(item)
    } else if (type === 'geolocated' && !markerClicked) {
      setTimeout(async () => {
        const name = document.getElementsByClassName("title full-width")[0]?.innerHTML;
        const city = document.getElementsByClassName("address-line full-width")[1]?.innerHTML;
        const citySplit = city.split(', ');
        const cityLength = citySplit.length;
        const cityEdit = citySplit[cityLength - 1];
        const nameEdit = name.replace(' ', '%');
        await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${nameEdit}%${cityEdit}&inputtype=textquery&fields=formatted_address,types,name,place_id,geometry&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.candidates) {
            const newLocation = response.candidates[0];
            const addressItemsLength = newLocation.formatted_address.split(', ').length;
            const country = newLocation.formatted_address.split(', ')[addressItemsLength - 1];
            setSelectedLocation({
              name: newLocation.name,
              country: country,
              googlemap_URL: newLocation.place_id,
              location_type: newLocation.types[0],
              longitude: newLocation.geometry.location.lng.toString(),
              latitude: newLocation.geometry.location.lat.toString(),
            })
            setLocationSelectedType('searchedLocation')
          }
        });
      }, 1000)
    }
  }

  let locationInfo = null;

  if (searchedLocation && locationSelectedType === 'searchedLocation') {
    locationInfo = <LocationInfo data={searchedLocation}/>;
  } else {
    locationInfo = <p> Displaying your current position </p>;
  }

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
            markerSelectedAction={(item) => getLocationByGeocode(null, 'existingMarker',item)}
          />
        }
      </div>
      <div className='container_locations_data'>
        <div className='locations_data_text'>
          {locationInfo}
        </div>
        <div className="locations_alerts_container">
          <div className={`locations_data_alerts locations_alerts${locationAlerts ? `_${locationAlerts.alertType}` : ''}`}>
            <p className={'locations_data_alerts_text'}>{(!locationAlerts || !locationAlerts.alertNumber) ?
              'There are currently no alerts for this location' : 
              `${locationAlerts.alertNumber} ${locationAlerts.alertType} covid case${(locationAlerts.alertNumber === 1) ? ' was' : 's were'} reported at this location in the last week`}
            </p>
          </div>
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
