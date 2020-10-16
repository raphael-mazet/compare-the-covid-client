import React, {useState} from "react";
import Searchbar from '../../components/Searchbar'
import Button from '../../components/Button'
import Alerts from '../../components/Alerts'
import { useHistory } from 'react-router-dom';
import { userSearchDataVar } from '../../apolloclient/makevar'
import { geolocate } from '../../helpers/geolocate'

const Homepage: React.FunctionComponent = () => {

  const data2 = userSearchDataVar();

  const [queryMaps, setQueryMaps] = useState<any | (() => any)>("");
  const [searchValue, setSearchValue] = useState<any | (() => any)>("");

  let name = data2.name;
  let place_id = data2.googlemap_URL;
  let lat = data2.latitude;
  let lng = data2.longitude;
  
  console.log(queryMaps)

  if (queryMaps.name !== undefined) name = queryMaps.name;
  if (queryMaps.place_id !== undefined) place_id = queryMaps.place_id;
  if (queryMaps.geometry !== undefined) lat = queryMaps.geometry.location.lat();
  if (queryMaps.geometry !== undefined) lng = queryMaps.geometry.location.lng();

  const obj = {
    name: name,
    googlemap_URL: place_id,
    latitude: lat,
    longitude: lng,
  };
  
  userSearchDataVar(obj);

  const history = useHistory();
  const locationRouter = async () => {
    await geolocate()
    history.push('/locations');
  } 
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
    </div>
  );
};

export default Homepage;
