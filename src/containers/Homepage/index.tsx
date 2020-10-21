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

  const redirectToLocations = () => {
    history.push({
      pathname: '/locations',
      state: 'searchbar'
    }); 
  };
  
  const caseRouter = () => history.push('/log-case');

  const saveSearch = (data: any) => {
    console.log('searchdata',data)
    const name = data.name;
    const country = data.address_components?.find((item: any) => {
      if (item.types.includes('country') || item.types.includes('')) {
        return true;
      }
      return false;
    })?.long_name;
    const location_type = data.types[0];
    const place_id = data.place_id;
    const lat = data.geometry.location.lat();
    const lng = data.geometry.location.lng();
    
    const searchedLocation = {
      name: name,
      country: country,
      location_type: location_type,
      googlemap_URL: place_id,
      latitude: lat,
      longitude: lng,
    };

    console.log('pushed obj', searchedLocation)
    setQueryMaps(searchedLocation);
    userSearchDataVar(searchedLocation);
    redirectToLocations();
  }

  return (
    <div className='homepage-wrapper'>
      <h2>
        Covid Alerts
      </h2>
      <div className='content_container'>
       <div className='alerts_container' onClick={() => { 
        updateLastCheckedEvents(
          { variables: lastCheckedEventsData })
        updateAuthenticatedUserVar()
        }
        }>
        <Alerts/>
      </div>
      </div>
      <div className="searchbar_title">Is your destination safe?</div>
      <div className='searchbar_container'>
        <Searchbar
          placeholder="Search a location"
          inputAction={(data:any) => saveSearch(data)}
          searchValue={searchValue}
          setSearch={setSearchValue}
          callback={redirectToLocations}
        />
      </div>
      <div className='actions_container'>
        <div className='button-container'>
          <Button
            content='Report a Covid case'
            onClick={caseRouter}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
