import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../manifest.json';
import readme from './readme.md';
import { Gutenberg, blockDetails, hasWrapperDecorator } from '../../../../../.storybook/helpers';

export default {
  title: 'Blocks|Card List',
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
            media: {
              id: 0,
              url: 'https://picsum.photos/1000/700',
              title: 'Card Title',
            },
            heading: 'Lorem ipsum dolor sit amet',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam est id semper aliquet. Aenean accumsan lacus justo, a lacinia turpis semper condimentum. ',
            mediaPosition: manifest.attributes.mediaPosition.default,
            buttonTitle: 'Button Title',
            buttonUrl: '',
            buttonStyleSize: manifest.attributes.buttonStyleSize.default,
            buttonStyleSizeWidth: manifest.attributes.buttonStyleSizeWidth.default,
            buttonStyleColor: manifest.attributes.buttonStyleColor.default,
            buttonId: '',
            buttonIcon: manifest.attributes.buttonIcon.default,
          },
          innerBlocks: [],
          name: `eightshift-boilerplate/${manifest.blockName}`,
        },
      ],
    }
  } />
);
