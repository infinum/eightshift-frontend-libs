import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { LinkEditor } from '../components/link-editor';
import { LinkOptions, linkColors } from '../components/link-options';

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
    url: 'https://fakeurl.com',
    styleColor: 'primary',
  },
  onChangeTitle: () => {},
};

const optionsProps = {
  link: {
    title: 'Link Title',
    url: 'https://fakeurl.com',
    styleColor: 'primary',
    isAnchor: false,
    id: 'ID',
  },
  onChangeUrl: () => {},
  onChangeStyleColor: () => {},
  onChangeIsAnchor: () => {},
  onChangeId: () => {},
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

export const styleColor = () => (
  <Fragment>
    {linkColors().map((values, index) => (
      <Fragment key={index}>
        <LinkEditor
          {...editorProps}
          link={{
            ...editorProps.link,
            title: values.name,
            styleColor: values.slug,
          }}
        />
        <br />
      </Fragment>
    ))}
  </Fragment>
);

export const isAnchor = () => (
  <LinkEditor
    link={{
      ...editorProps.link,
      isAnchor: true,
    }}
  />
);
