import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ExampleEditor = ({ attributes, actions }) => {
    const {
        blockClass,
        content,
    } = attributes;

    const {
        onChangeContent,
    } = actions;

    return (
    <RichText
      placeholder={__('Add Content', 'eightshift-boilerplate')}
      className={blockClass}
      onChange={onChangeContent}
      value={content}
    />
  );
};
