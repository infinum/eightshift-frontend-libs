import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { HeadingLevel } from './heading-level';

export default {
  title: 'Options|Heading Level',
  parameters: {
    notes: readme,
  },
};

const defaultProps = {
  minLevel: 1,
  maxLevel: 6,
  selectedLevel: 2,
  onChange: '',
};

export const component = () => (
  <HeadingLevel
    {...defaultProps}
  />
);
