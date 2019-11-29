import React from 'react'; // eslint-disable-line no-unused-vars
import { Gutenberg } from '../../.storybook/helpers';

export default {
  title: 'Playground|Block Editor',
};

export const block = () => (
  <Gutenberg blocks={[]} />
);
