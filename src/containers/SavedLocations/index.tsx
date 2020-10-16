import React from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar } from "../../apolloclient/makevar";

const SavedLocations: React.FunctionComponent = () => {
  
  const savedLocations = savedLocationsVar();
  

  return (
    <div className='container'>
      {savedLocations.map(location=>
      <SavedLocationItem key={location.id} location={location}/>
      )}
    </div>
  );
};

export default SavedLocations;
