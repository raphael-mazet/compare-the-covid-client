import React, {useEffect, useState} from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { authenticatedUserVar, savedLocationsVar, userAlertsVar } from "../../apolloclient/makevar";
import { Event } from '../../interfaces/query.interface'
import './index.style.scss';
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SAVED_LOCATION } from '../../apis/graphQL/mutations';
import Sorter from '../../components/Sorter'
import { DateTime } from 'luxon';

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
  
  // // const dateLocations = savedLocationsWithEvents && savedLocationsWithEvents?.map(location => {
  // //   location.events.sort((a:any,b:any) => DateTime.fromISO(b.alertDate).toMillis() - DateTime.fromISO(a.alertDate).toMillis());
  // // });
  
  // const dateLocations = savedLocationsWithEvents?.map(location=>DateTime.fromISO(location.events[0].alertDate).toMillis())
  
  // const dateLocations1 = savedLocationsWithEvents?.sort((a:any,b:any)=>DateTime.fromISO(a.events[0].alertDate).toMillis() - DateTime.fromISO(b.events[0].alertDate).toMillis())

  // console.log(dateLocations)
  // console.log(dateLocations1)

  const sortTotalAlert = () => {
    return savedLocationsWithEvents?.sort((a, b) => b.events.length - a.events.length);
  }
  // const datesorter = (arg: any) => {
  //   return arg?.sort((a:any, b:any) => b[0].alertDate - a[0].alertDate)
  // }

  // const sortLastAlert = () => {
  //   return datesorter(dateLocations);
  // }

  const sortedLocations = savedLocationsWithEvents && sortTotalAlert();

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
  
  return (
    <div className='saved_locations_container'>
      <div className='sorter_wrapper'>
      <Sorter 
        sortName={'Alerts'}
        onClick={sortTotalAlert}
      />
      <Sorter 
        sortName={'Last Alert Date'}
        onClick={sortTotalAlert}
      />
      </div>
      <div style={{height: '100%'}}>
        {sortedLocations?.map((location:any)=>
          <SavedLocationItem
            key={location.id}
            location={location}
            onDelete={deleteAction}
            />
        )}
      </div>
    </div>
  );
};

export default SavedLocations;
