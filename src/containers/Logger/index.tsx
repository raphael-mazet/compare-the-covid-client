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
  score: string | undefined;
  searchedLocation: string;
}

const initialState = {
  alertLevel: undefined,
  alertDate: new Date().toISOString(),
  alertLocation: '',
  score: '0',
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
      alertScore: Number(formValues?.score),
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

  const scoreLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
    {
      id: level.toString(),
      value: level.toString(),
      option: level.toString()
    }
  ));

  return (
    <div className='logger-page-wrapper'>
      <div className="logger-explain">
        <p className="logger-explain-text">Have you tested positive <br/> for Covid-19  or suspect <br/> you are ill?</p>
      </div>
      <div className='logger-form-wrapper'>
        <form className='logger-form-container' onSubmit={(e) => onSubmit(e)}>
          {locations &&
            <>
            <div className="covid-alert-type">
              <Select 
                label="Severity"
                required={true}
                onChange={(e) => handleChange(e.target.value, 'alertLevel')}
                value={formValues?.alertLevel}
                hasDefaultValue={true}
                placeholder="-- Select Level --"
                options={alertOptions}
                inLineLabel={window.width > 375 ? true : false}
              />
            </div>
            <div className="covid-alert-date">
              <Input
                type='date'
                label="When"
                value={moment(formValues?.alertDate).format('YYYY-MM-DD')}
                  onChange={(e) => handleChange(moment(e.target.value).format(), 'alertDate')}
                  inLineLabel={window.width > 375 ? true : false}
                />
            </div>
            <div className="covid-alert-location">
              <Select
                label="Where"
                required={true}
                onChange={(e) => handleChange(e.target.value, 'alertLocation')}
                value={formValues?.alertLocation}
                hasDefaultValue={true}
                placeholder="-- Select Location --"
                options={locations.map((item: any) => ({
                  id: item.id,
                  option: item.name,
                  value: item.id
                }))}
                inLineLabel={window.width > 375 ? true : false}
              />
            </div>
            <div className="covid-alert-date">
              <Select
                label="Sanitary Rating"
                required={true}
                onChange={(e) => handleChange(e.target.value, 'score')}
                value={formValues?.score}
                hasDefaultValue={true}
                placeholder="-- Select Level --"
                options={scoreLevels}
                inLineLabel={window.width > 375 ? true : false}
              />
            </div>
            <div className="logger-button-container">
              <Button
                content='Report case'
                onClick={(e) => onSubmit(e)}
              />
            </div>
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
