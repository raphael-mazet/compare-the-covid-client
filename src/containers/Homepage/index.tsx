import React, {useState} from "react";
import Searchbar from '../../components/Searchbar'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import { geometrysVar } from '../../client'

const Homepage: React.FunctionComponent = () => {

  const [queryMaps, setQueryMaps] = useState<any | (() => any)>("");
  const [searchValue, setSearchValue] = useState<any | (() => any)>("");

  let lat = null;
  let lng = null;

  if (queryMaps.geometry !== undefined) lat = queryMaps.geometry.location.lat();
  if (queryMaps.geometry !== undefined) lng = queryMaps.geometry.location.lng();

  const obj = {
    id: 1,
    latitude: lat,
    longitude: lng,
  }
  
  geometrysVar(obj)

  console.log('lat', lat)
  console.log('lng', lng)

//   const geometryQuery = gql `
//   query GetGeometry {
//     geometrys @client {
//       id 
//       latitude
//       longitude
//     }
//   }
// `;

// const { data } = useQuery(geometryQuery) 
const data2 = geometrysVar()

  return (
    <>
      <Searchbar 
        placeholder="Search a location"
        inputAction={setQueryMaps}
        searchValue={searchValue}
        setSearch={setSearchValue}
      />
      <div>
        {/* <p>{data.geometrys.id}</p>
        <p>{data.geometrys.latitude}</p>
        <p>{data.geometrys.longitude}</p> */}
        <p>{data2.latitude}</p>
        <p>{data2.longitude}</p>
      </div>  
    </>
  );
};

export default Homepage;
