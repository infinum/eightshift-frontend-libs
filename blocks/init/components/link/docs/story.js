import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../../../custom/link/manifest.json';
import readme from './readme.md';
import { LinkEditor } from '../components/link-editor';
import { LinkOptions } from '../components/link-options';

export default {
  title: 'Components|Link',
  parameters: {
    notes: readme,
  },
};

const editorProps = {
  blockClass: 'block-link',
  link: {
    title: 'Link Title',
    styleColor: manifest.attributes.link.default.styleColor,
  },
  onChangeTitle: () => {},
};

const optionsProps = {
  link: {
    title: 'Link Title',
    url: 'https://fakeurl.com',
    styleColor: manifest.attributes.link.default.styleColor,
    isAnchor: manifest.attributes.link.default.isAnchor,
  },
  onChangeUrl: () => {},
  onChangeStyleColor: () => {},
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
    link={{
      ...editorProps.link,
      styleColor: 'black',
    }}
  />
);

export const isAnchor = () => (
  <LinkEditor
    link={{
      ...editorProps.link,
      isAnchor: true,
    }}
  />
);
