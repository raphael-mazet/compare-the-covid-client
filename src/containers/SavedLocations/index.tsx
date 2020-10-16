import React from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar } from "../../apolloclient/makevar";
import { GET_SAVED_LOCATION_BY_USER_ID, GET_LOCATION_BY_ID } from '../../apis/graphQL/queries/index'
import client from '../../client';

const SavedLocations: React.FunctionComponent = () => {
  
  const savedLocations = savedLocationsVar();

  console.log('saevedlocation', savedLocations)

  // const locationsarray = savedLocations.map(location => {
  //   console.log(location)
  //   return getsavedLocations(location)
  // })

  // console.log('locationsarray', locationsarray)

  function getsavedLocations (id :any) {
    return client.readQuery({query: GET_LOCATION_BY_ID, 
      variables: {
        id: id
      }
    });
  }

  console.log('test', getsavedLocations(4));





  // const [savedLocations]:any = client.readQuery({query: GET_SAVED_LOCATION_BY_USER_ID, 
  //   variables: {
  //     location_id: userInfo.id
  //   }
  // });

  // console.log(savedLocations)

  // const {data: userSavedLocations} = useQuery<{}>(GET_SAVED_LOCATION_BY_USER_ID, {
  //   variables: {
  //     location_id: userInfo.id
  //   }
  // })

  // const [addLocation] = useMutation(CREATE_LOCATION);

  // console.log('stringtosend',data.longitude.toString())
  // console.log('xxx',typeof data.longitude.toString())

  return (
    <div className='container'>
      <SavedLocationItem/>
    </div>
  );
};

export default SavedLocations;
