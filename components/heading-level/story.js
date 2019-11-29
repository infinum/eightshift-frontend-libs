import React from 'react'; // eslint-disable-line no-unused-vars

import { HeadingLevel } from './heading-level';

export default {
  title: 'Options|Heading Level',
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
