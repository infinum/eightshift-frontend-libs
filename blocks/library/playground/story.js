import { Gutenberg } from './../../../.storybook/helpers';

export default {
  title: 'Playground|Block Editor',
};

export const defaultBlock = () => (
  <Gutenberg blocks={[]} />
);
