import React, {useState} from "react";
import Searchbar from '../../components/Searchbar'
import Button from '../../components/Button'
import Alerts from '../../components/Alerts'
import { useHistory } from 'react-router-dom';
import { userSearchDataVar } from '../../apolloclient/makevar'

const Homepage: React.FunctionComponent = () => {

  const data2 = userSearchDataVar();

  const [queryMaps, setQueryMaps] = useState<any | (() => any)>("");
  const [searchValue, setSearchValue] = useState<any | (() => any)>("");

  let lat = data2.latitude;
  let lng = data2.longitude;

  if (queryMaps.geometry !== undefined) lat = queryMaps.geometry.location.lat();
  if (queryMaps.geometry !== undefined) lng = queryMaps.geometry.location.lng();

  const obj = {
    latitude: lat,
    longitude: lng,
  };
  
  userSearchDataVar(obj);

  const history = useHistory();
  const locationRouter = () => history.push('/locations');
  const caseRouter = () => history.push('/log-case');

  return (
    <div className='container'>

      <Alerts/>

      <Button
        content='Save a Location'
        onClick={locationRouter}
      />

      <Button
        content='Log a Covid'
        onClick={caseRouter}
      />
      
      <Searchbar 
        placeholder="Search a location"
        inputAction={setQueryMaps}
        searchValue={searchValue}
        setSearch={setSearchValue}
      />
      <div>
        <p>{data2.latitude}</p>
        <p>{data2.longitude}</p>
      </div>  
    </div>
  );
};

export default Homepage;
