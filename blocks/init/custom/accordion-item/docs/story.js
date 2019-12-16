import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from '../manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from 'EighshiftBlocksStorybookHelpers';

export default {
  title: 'NOT FINISHED Blocks|Accordion Item',
  ...hasWrapperDecorator(manifest),
  parameters: {
    notes: readme,
  },
};

export const block = () => (
  <Gutenberg props={
    {
      blocks: [
        {
          attributes: {
            ...blockDetails(manifest.blockName),
            title: 'Accordion Title',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo tellus eget sem ullamcorper molestie. Phasellus nec gravida arcu, id ultrices diam. Cras vestibulum lectus feugiat dolor blandit, ac tincidunt urna rhoncus. Phasellus suscipit non dui ac pretium. Praesent ac nunc nec dui pretium molestie eget non nisl. Nulla tristique fringilla risus eget scelerisque. Pellentesque in nibh ut est condimentum ullamcorper quis ut tellus. Maecenas fermentum nisi sed sollicitudin rhoncus. Aliquam aliquam ultrices tincidunt. Nulla vitae diam vel magna maximus mollis nec nec augue. Fusce eget molestie tortor, eu feugiat tortor. Vestibulum facilisis ex quis nibh vestibulum mattis. Integer tristique interdum augue, ut feugiat mi viverra eget.',
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
