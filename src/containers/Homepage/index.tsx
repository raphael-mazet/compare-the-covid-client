import React, {useState} from "react";
import Searchbar from '../../components/Searchbar'
import Button from '../../components/Button'
import Alerts from '../../components/Alerts'

import { useHistory } from 'react-router-dom';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import { userSearchDataVar } from '../../client'

const Homepage: React.FunctionComponent = () => {

  const data2 = userSearchDataVar();

  const [queryMaps, setQueryMaps] = useState<any | (() => any)>("");
  const [searchValue, setSearchValue] = useState<any | (() => any)>("");

  let lat = data2.latitude;
  let lng = data2.longitude;

  if (queryMaps.geometry !== undefined) lat = queryMaps.geometry.location.lat();
  if (queryMaps.geometry !== undefined) lng = queryMaps.geometry.location.lng();

  const obj = {
    id: 1,
    latitude: lat,
    longitude: lng,
  };
  
  userSearchDataVar(obj);

  const userSearchDataQuery = gql `
    query GetUserSearchData {
      searchdata @client { 
        id
        latitude
        longitude
      }
    }
  `;

  const { data } = useQuery(userSearchDataQuery); 

  const history = useHistory();
  const locationRouter = () => history.push('/locations');
  const caseRouter = () => history.push('/log-case');

  return (
    <div className='container'>

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
        <p>{data.searchdata.id}</p>
        <p>{data.searchdata.latitude}</p>
        <p>{data.searchdata.longitude}</p>
        <p>{data2.latitude}</p>
        <p>{data2.longitude}</p>
      </div>  
    </div>
  );
};

export default Homepage;
