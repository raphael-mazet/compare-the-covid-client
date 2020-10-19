import React, { useEffect, useState} from "react";
import './index.style.scss';
import { Input, Select } from '../../components/Forms';
import useWindowSize from '../../helpers/getWindowSize';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { SavedLocationsArray, Event } from '../../interfaces/query.interface';

import { CREATE_EVENT } from '../../apis/graphQL/mutations/eventMutations';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import { savedLocationsVar, userAlertsVar } from '../../apolloclient/makevar';

type eventForm = { 
  alertLevel: string | undefined;
  alertDate: string | undefined;
  alertLocation: string | undefined;
  score: number;
  searchedLocation: string;
}

const initialState = {
  alertLevel: undefined,
  alertDate: moment().format(),
  alertLocation: '',
  score: 0,
  searchedLocation: ''
}

const Logger: React.FunctionComponent = () => {
  const [formValues, setFormValue] = useState<eventForm>(initialState);
  const [locations, setLocations] = useState<any>();
  const history = useHistory();

  const onCompletedEvent: any = () => {
    console.log('registered event');
    history.push('/home');
  }

  const [createNewEvent] = useMutation<{ createEvent: Event }>(CREATE_EVENT, {
    onCompleted: onCompletedEvent
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const eventData = {
      alertType: formValues?.alertLevel,
      alertDate: formValues?.alertDate,
      alertScore: formValues?.score,
      location_id: formValues?.alertLocation,
      created_at: Date.now(),
      expires_on: Date.now() + 12096e5
    }
    
    createNewEvent({
      variables: eventData
    });
    const existingAlerts = userAlertsVar()
    if (eventData.alertType === 'confirmed') existingAlerts.confirmed = [...existingAlerts.confirmed, eventData];
    else if (eventData.alertType === 'suspected') existingAlerts.suspected = [...existingAlerts.suspected, eventData];
    else existingAlerts.safe = [...existingAlerts.safe, eventData];
    userAlertsVar(existingAlerts);
  }

  useEffect(() => { 
    const locationsFromCache = savedLocationsVar();
    console.log(locationsFromCache);
  }, []);

  const handleChange = (value: string, field: string) => {
    setFormValue((formValues) => ({
      ...formValues,
      [field]: value
    }));
  }

  const window = useWindowSize();

  const alertOptions = [
    {
      id: 'lowLevel',
      value: 'Unsafe',
      option: 'Unsafe Location'
    },
    {
      id: 'midLevel',
      value: 'Possible Case',
      option: 'Possible case'
    },
    {
      id: 'highLevel',
      value: 'Confirmed Case',
      option: 'Confirmed Case'
    }
  ];

  return (
    <div className='page-wrapper'>
      <div className='form-wrapper'>
        <form className='form-container' onSubmit={(e) => onSubmit(e)}>
          {locations &&
            <>
              <Select 
                label="Alert Level"
                required={true}
                onChange={(e: any) => handleChange(e.target.value, 'alertType')}
                value={formValues?.alertLevel}
                hasDefaultValue={true}
                placeholder="-- Select Level --"
                options={alertOptions}
                inLineLabel={window.width > 375 ? true : false}
              />
              <Input
                type='date'
                label="Alert Date"
                value={formValues?.alertDate}
                onChange={(e: any) => handleChange(moment(e.target.value).format(), 'alertDate')}
                inLineLabel={window.width > 375 ? true : false}
              />
              <Select
                label="Alert Level"
                required={true}
                onChange={(e: any) => handleChange(e.target.value, 'alertLocation')}
                value={formValues?.alertLocation}
                hasDefaultValue={true}
                placeholder="-- Select Existing Location --"
                options={locations.map((item: any) => ({
                  id: item.id,
                  option: item.id,
                  value: item.name
                }))}
                inLineLabel={window.width > 375 ? true : false}
              />
              <Button
                content='Create Event'
                onClick={(e) => onSubmit(e)}
              />
            </>
          }
          {!locations && 
            <>
              <p style={{ textAlign: 'center', color: '#5D7A98' }}> Please save a location first</p>
              <Button
                content='Save Location'
                onClick={() => history.push('/locations')}
              />
            </>
          }
        </form> 
      </div>
    </div>
  );
};

export default Logger;
