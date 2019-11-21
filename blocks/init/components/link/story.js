import React from 'react';
import manifest from './../../custom/link/manifest.json';

import { LinkEditor } from './components/link-editor';
import { LinkOptions } from './components/link-options';

export default {
  title: 'Components|Link',
};

const editorProps = {
  blockClass: 'block-link',
  title: 'Link Title',
  onChangeTitle: () => {},
  styleColor: manifest.attributes.styleColor.default,
};

const optionsProps = {
  url: 'https://fakeurl.com',
  onChangeUrl: () => {},
  styleColor: manifest.attributes.styleColor.default,
  onChangeStyleColor: () => {},
  isAnchor: manifest.attributes.isAnchor.default,
  onChangeIsAnchor: () => {},
};

export const editor = () => (
  <LinkEditor
    {...editorProps}
  />
);

export const options = () => (
  <LinkOptions
    {...optionsProps}
  />
);

export const colorBlack = () => (
  <LinkEditor
    {...editorProps}
    styleColor={'black'}
  />
);

export const isAnchor = () => (
  <LinkEditor
    {...editorProps}
    isAnchor={true}
  />
);
