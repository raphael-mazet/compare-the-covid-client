import React, {useEffect, useState} from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { authenticatedUserVar, savedLocationsVar, userAlertsVar } from "../../apolloclient/makevar";
import { Event } from '../../interfaces/query.interface'
import './index.style.scss';
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SAVED_LOCATION } from '../../apis/graphQL/mutations';

const SavedLocations = (): JSX.Element => {
  const [events, setEventsCache] = useState<Event[]>();
  const [locations, setLocations] = useState<any[]>();
  
  useEffect(() => {
    const userLocations = savedLocationsVar();
    setLocations(userLocations);
    const cachedEvents = userAlertsVar();
    const dataToMap = [...cachedEvents.confirmed, ...cachedEvents.suspected, ...cachedEvents.safe]
    setEventsCache(dataToMap);
  }, [])
  
  const updateLocations = () => {
    savedLocationsVar(locations)
  }
  
  const [deleteLocation] = useMutation(DELETE_SAVED_LOCATION, {
    onCompleted: updateLocations
  })

  const savedLocationsWithEvents = locations?.map((location) =>
    Object.assign({}, location, { events: [] })
  );

  events && events.forEach((event: any) => (
    savedLocationsWithEvents?.forEach(location => {
      if (location.id === event?.location_id.id) {
        location.events.push(event)
      }
    })
  ));

  const sortedLocations = savedLocationsWithEvents && savedLocationsWithEvents.sort((a, b) => b.events.length - a.events.length);

  const deleteAction = (location_id: number) => {
    const authData = authenticatedUserVar();
    const newLocations = locations?.filter(location => location.id !== location_id);
    setLocations(newLocations);
    deleteLocation({
      variables: {
        user_id: authData.id,
        location_id: location_id
      }
    });
  } 

  const [className, setClassName] = useState<string>('');
  const [animationFinished, setAnimationFinished] = useState<Boolean>(false);

  const startAnimation = () => {
    setClassName('animation');
  }
  onanimationend = () => {
    setAnimationFinished(true);
  }

  return (
    <div className='container'>
      <div style={{height: '100%'}}>
        {sortedLocations?.map(location=>
          <SavedLocationItem
            key={location.id}
            location={location}
            onDelete={deleteAction}
            className={className}
          />
        )}
      </div>
    </div>
  );
};

export default SavedLocations;
