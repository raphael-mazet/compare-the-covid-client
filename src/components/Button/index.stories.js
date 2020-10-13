import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './index.tsx';

export default {
  title: 'Components/Button',
  component: Button
};

export const Normal = () => (
  <Button
    onClick={action('clicked')}
    content="text button"
  />
);

export const Cancel = () => (
  <Button
    onClick={action('clicked')}
    content="text button"
    buttonType="cancel"
  />
);

export const Confirm = () => (
  <Button
    onClick={action('clicked')}
    content="text button"
    buttonType="confirm"
  />
);

export const Back = () => (
  <Button
    onClick={action('clicked')}
    content="text button"
    buttonType="back"
  />
);
