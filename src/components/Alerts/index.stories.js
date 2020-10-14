import React from 'react';
import Alert from './index';

export default {
  title: 'Components/Alert',
  component: Alert
}

export const ConfirmedAlerts = () => (
  <Alert 
    confirmedCases={5} 
    suspectedCases={2} 
    safeCases={1}
  />
);

export const SuspectedAlerts = () => (
  <Alert 
    confirmedCases={0} 
    suspectedCases={2} 
    safeCases={1}
  />
);

export const SafeAlerts = () => (
  <Alert 
    confirmedCases={0} 
    suspectedCases={0} 
    safeCases={1}
  />
);

export const NoAlerts = () => (
  <Alert 
    confirmedCases={0} 
    suspectedCases={0} 
    safeCases={0}
  />
);