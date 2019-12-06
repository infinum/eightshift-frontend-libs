import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './manifest.json';
import { Gutenberg, id, blockDetails, hasWrapperDecorator } from '../../../../.storybook/helpers';

export default {
  title: 'Blocks|Image Text',
  ...hasWrapperDecorator(manifest),
};

const blocks = [
  {
    attributes: {
      ...blockDetails(manifest.blockName),
      styleFullHeight: manifest.attributes.styleFullHeight.default,
      mediaId: '',
      mediaUrl: manifest.attributes.mediaUrl.default,
      mediaSize: manifest.attributes.mediaSize.default,
      heading: 'Heading Title',
      paragraph: 'Paragraph Content',
      imagePosition: manifest.attributes.imagePosition.default,
      buttonTitle: 'Button Title',
      buttonUrl: '',
      buttonStyleSize: manifest.attributes.buttonStyleSize.default,
      buttonStyleSizeWidth: manifest.attributes.buttonStyleSizeWidth.default,
      buttonStyleColor: manifest.attributes.buttonStyleColor.default,
      buttonId: '',
      buttonIcon: manifest.attributes.buttonIcon.default,
    },
    clientId: id(),
    innerBlocks: [],
    isValid: true,
    name: `eightshift-boilerplate/${manifest.blockName}`,
  },
];

export const block = () => (
  <Gutenberg props={{ blocks }} />
);
