import React, {useState} from "react";
import Searchbar from '../../components/Searchbar'
import Button from '../../components/Button'
import Alerts from '../../components/Alerts'
import { useHistory } from 'react-router-dom';
import { authenticatedUserVar, userSearchDataVar } from '../../apolloclient/makevar';
import './index.style.scss';
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_LAST_CHECKED_EVENTS } from '../../apis/graphQL/mutations';

const Homepage: React.FunctionComponent = () => {
  const [queryMaps, setQueryMaps] = useState<any | (() => any)>(""); //selected location from searchbar
  const [searchValue, setSearchValue] = useState<any | (() => any)>(""); // input value in searchbar
  const [updateLastCheckedEvents] = useMutation(UPDATE_LAST_CHECKED_EVENTS);
  
  const chacedSearch = userSearchDataVar(); //saved location from search in cache
  
  let name = chacedSearch.name;
  let country = chacedSearch.country;
  let location_type = chacedSearch.location_type;
  let place_id = chacedSearch.googlemap_URL;
  let lat = chacedSearch.latitude;
  let lng = chacedSearch.longitude;
  
  if (queryMaps.name !== undefined) name = queryMaps.name;
  if (queryMaps.address_components) country = queryMaps.address_components.find((item:any) => {
    if (item.types.includes('country') || item.types.includes('')) {
      return true;
    }
  })?.long_name;
  if (queryMaps.types) location_type = queryMaps.types[0];
  if (queryMaps.place_id !== undefined) place_id = queryMaps.place_id;
  if (queryMaps.geometry !== undefined) {
    lat = queryMaps.geometry.location.lat();
    lng = queryMaps.geometry.location.lng();
  }
  
  const searchedLocation = {
    name: name,
    country: country,
    location_type: location_type,
    googlemap_URL: place_id,
    latitude: lat,
    longitude: lng,
  };

  userSearchDataVar(searchedLocation); //save search to cache

  const lastCheckedEventsData = {
    id: authenticatedUserVar().id,
    last_checkedEvents: new Date().toISOString(),
  }

  function updateAuthenticatedUserVar() {
    const obj = authenticatedUserVar();
    obj.last_checkedEvents = new Date().toISOString();
    authenticatedUserVar(obj);
  }

  const history = useHistory();

  const redirectToLocations = () => history.push(
    {
      pathname: '/locations',
      state: 'searchbar'
    }  
  );
  
  const caseRouter = () => history.push('/log-case');

  return (
    <div className='page-wrapper'>
      <div style={{ width: '100%', margin: 'auto', marginTop:'10px', position: 'absolute', top: '10%'}}>
       <div onClick={() => { 
        updateLastCheckedEvents(
          { variables: lastCheckedEventsData })
        updateAuthenticatedUserVar()
        }
      }>
        <Alerts/>
      </div>
      </div>
      <div style={{width: '100%', position: 'absolute', top: '50%'}}>
        <Searchbar
          placeholder="Search a location"
          inputAction={setQueryMaps}
          searchValue={searchValue}
          setSearch={setSearchValue}
          callback={redirectToLocations}
        />
      </div>
      <div className='actions_container'>
        <div className='button-container'>
          <Button
            content='Log a Covid'
            onClick={caseRouter}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
