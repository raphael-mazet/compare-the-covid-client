import React, { FormEvent, useEffect, useState} from "react";
import './index.style.scss';
import { Input, Select } from '../../components/Forms';
import useWindowSize from '../../helpers/getWindowSize';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { Event } from '../../interfaces/query.interface';
import { SavedLocations } from '../../apolloclient/localstateinterfaces';
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
  alertDate: new Date().toISOString(),
  alertLocation: '',
  score: 0,
  searchedLocation: ''
}

const Logger: React.FunctionComponent = () => {
  const [formValues, setFormValue] = useState<eventForm>(initialState);
  const [locations, setLocations] = useState<SavedLocations>();
  const history = useHistory();
  
  const onCompletedEvent = (response: any) => {
    const existingAlerts = userAlertsVar();
    
    if (response.createEvent.alertType === 'confirmed') existingAlerts.confirmed = [...existingAlerts.confirmed, response.createEvent];
    else if (response.createEvent.alertType === 'suspected') existingAlerts.suspected = [...existingAlerts.suspected, response.createEvent];
    else existingAlerts.safe = [...existingAlerts.safe, response.createEvent];
    userAlertsVar(existingAlerts);
    history.push('/home');
  }
  
  const [createNewEvent] = useMutation<{ createEvent: Event }>(CREATE_EVENT, {
    onCompleted: onCompletedEvent
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const expiryDate = Date.now() + 12096e5;
    const eventData = {
      alertType: formValues?.alertLevel,
      alertDate: formValues?.alertDate,
      alertScore: formValues?.score,
      location_id: Number(formValues?.alertLocation),
      created_at: new Date().toISOString(),
      expires_on: new Date(expiryDate).toISOString()
    }

    createNewEvent({
      variables: eventData
    });
  }

  useEffect(() => { 
    const locationsFromCache = savedLocationsVar();
    setLocations(locationsFromCache);
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
      value: 'safe',
      option: 'Unsafe Location'
    },
    {
      id: 'midLevel',
      value: 'suspected',
      option: 'Possible case'
    },
    {
      id: 'highLevel',
      value: 'confirmed',
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
                label="Alert Type"
                required={true}
                onChange={(e) => handleChange(e.target.value, 'alertLevel')}
                value={formValues?.alertLevel}
                hasDefaultValue={true}
                placeholder="-- Select Level --"
                options={alertOptions}
                inLineLabel={window.width > 375 ? true : false}
              />
            <Input
              type='date'
              label="Alert Date"
              value={moment(formValues?.alertDate).format('YYYY-MM-DD')}
                onChange={(e) => handleChange(moment(e.target.value).format(), 'alertDate')}
                inLineLabel={window.width > 375 ? true : false}
              />
              <Select
                label="Alert Location"
                required={true}
                onChange={(e) => handleChange(e.target.value, 'alertLocation')}
                value={formValues?.alertLocation}
                hasDefaultValue={true}
                placeholder="-- Select Existing Location --"
                options={locations.map((item: any) => ({
                  id: item.id,
                  option: item.name,
                  value: item.id
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
