import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SavedLocations, SavedLocationsArray } from '../../interfaces/query.interface';
import { GET_SAVED_LOCATION_BY_USER_ID } from '../../apis/graphQL/queries/index';
// import client from '../../client';

const TestLogin: React.FunctionComponent = () => {
  
const [userLocationsLoaded, setUserLocationsLoaded] = useState<boolean>(false);
const [userLocations, setUserLocations] = useState<(number | null)[]>([])

// let locations = {data: {}, loading: false, error: {}}

// useEffect(() => {
//   if (userLocationsLoaded) {
//     locations
//   }
// }, [userLocationsLoaded])

const {data: locationData, loading: locationLoading, error: locationDataError} = useQuery<{getSavedLocationbyUser_Id: SavedLocationsArray}>(GET_SAVED_LOCATION_BY_USER_ID, {
  variables: {
    user_id:1
  },
  onCompleted: setLocations
})

function setLocations (locationData: {getSavedLocationbyUser_Id: SavedLocationsArray}) {
  const tempArray: (number | null)[] = [];
  locationData?.getSavedLocationbyUser_Id.forEach((location: SavedLocations) => {
    tempArray.push(location.location_id.id)
  })
  setUserLocations(tempArray)
}

console.log('userLocations --> ', userLocations)


return (
  <>Hello</>
  )
  
  
  // function setExpiry (date: Date) {
    //   const expiryDate = new Date(date)
    //   expiryDate.setDate(date.getDate() + 14);
    //   return expiryDate
    // }
    
    // const creationDate = new Date();
    // const expiryDate = setExpiry(creationDate);
    
  }
  
export default TestLogin;