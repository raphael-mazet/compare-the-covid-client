import React from "react";
// import GoogleMap from '../../components/GoogleMap'
import SavedLocationItem from '../../components/SavedLocationItem'
// import Button from '../../components/Button'
// import { geolocate } from '../../helpers/geolocate'
// // import { addLocation } from '../../helpers/addLocation'
// import { userSearchDataVar } from '../../apolloclient/makevar'
// import { CREATE_LOCATION } from '../../apis/graphQL/mutations';
// import { useMutation } from '@apollo/client';

const SavedLocations: React.FunctionComponent = () => {
  
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
