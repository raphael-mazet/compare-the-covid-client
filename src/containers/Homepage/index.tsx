import React, {useState} from "react";
import Searchbar from '../../components/Searchbar'
import Button from '../../components/Button'
import Alerts from '../../components/Alerts'
import { useHistory } from 'react-router-dom';
import { authenticatedUserVar, userSearchDataVar } from '../../apolloclient/makevar'
import { geolocate } from '../../helpers/geolocate';
import './index.style.scss';
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_LAST_CHECKED_EVENTS } from '../../apis/graphQL/mutations';

const Homepage: React.FunctionComponent = () => {

  const data2 = userSearchDataVar();

  const [queryMaps, setQueryMaps] = useState<any | (() => any)>("");
  const [searchValue, setSearchValue] = useState<any | (() => any)>("");

  const [updateLastCheckedEvents] = useMutation(UPDATE_LAST_CHECKED_EVENTS);
  
  let name = data2.name;
  let place_id = data2.googlemap_URL;
  let lat = data2.latitude;
  let lng = data2.longitude;
  
  if (queryMaps.name !== undefined) name = queryMaps.name;
  if (queryMaps.place_id !== undefined) place_id = queryMaps.place_id;
  if (queryMaps.geometry !== undefined) lat = queryMaps.geometry.location.lat();
  if (queryMaps.geometry !== undefined) lng = queryMaps.geometry.location.lng();

  const userSearchData = {
    name: name,
    googlemap_URL: place_id,
    latitude: lat,
    longitude: lng,
  };
  
  userSearchDataVar(userSearchData);

  const lastCheckedEventsData = {
    id: authenticatedUserVar().id,
    last_checkedEvents: new Date().toISOString(),
  }

  const history = useHistory();
  const callroute = () => history.push(
    {
      pathname: '/locations',
      state: 'searchbar'
    });

  const locationRouter = async () => {
    await geolocate()
    history.push('/locations');
  } 
  const caseRouter = () => history.push('/log-case');

  return (
    <div className='page-wrapper'>
      <div style={{ width: '100%', margin: 'auto', marginTop:'10px', position: 'absolute', top: '10%'}}>
       <div onClick={() => 
        updateLastCheckedEvents(
          { variables: lastCheckedEventsData }
      )}>
        <Alerts/>
      </div>
      </div>
      <div style={{width: '100%', position: 'absolute', top: '50%'}}>
        <Searchbar
          placeholder="Search a location"
          inputAction={setQueryMaps}
          searchValue={searchValue}
          setSearch={setSearchValue}
          callback={callroute}
        />
      </div>
      <div className='actions_container'>
        <div className='button-container'>
          <Button
            content='Save a Location'
            onClick={locationRouter}
          />
        </div>
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
