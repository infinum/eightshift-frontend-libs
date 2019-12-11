import React from 'react'; // eslint-disable-line no-unused-vars
import { Gutenberg } from '../../.storybook/helpers';
import readme from './readme.md';

export default {
  title: 'Playground|Block Editor',
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={
    {
      blocks: [],
    }
  } />
);
