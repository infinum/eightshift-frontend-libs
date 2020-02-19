import React from 'react'; // eslint-disable-line no-unused-vars
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ImageEditor } from '../../../components/image/components/image-editor';

export const CardEditor = (props) => {
  const {
    attributes: {
      blockClass,
      heading,
      paragraph,
      media,
    },
    actions: {
      onChangeHeading,
      onChangeParagraph,
    },
  } = props;

  return (
    <div className={blockClass}>
      <div className={`${blockClass}__media`}>
        <ImageEditor
          blockClass={blockClass}
          media={(typeof media === 'undefined') || media}
        />
      </div>
      <div className={`${blockClass}__content`}>
        <div className={`${blockClass}__heading`}>
          <RichText
            placeholder={__('Add Heading', 'eightshift-boilerplate')}
            onChange={onChangeHeading}
            value={heading}
          />
        </div>
        <div className={`${blockClass}__paragraph`}>
          <RichText
            placeholder={__('Add Paragraph', 'eightshift-boilerplate')}
            onChange={onChangeParagraph}
            value={paragraph}
          />
        </div>
      </div>
    </div>
  );
};
