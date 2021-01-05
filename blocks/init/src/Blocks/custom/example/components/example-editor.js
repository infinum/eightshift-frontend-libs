import React from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ExampleEditor = ({ attributes, setAttributes }) => {
	const {
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		content = checkAttr('content', attributes, manifest),
	} = attributes;

	return (
		<RichText
			placeholder={placeholder}
			className={blockClass}
			onChange={(value) => setAttributes({ content: value })}
			value={content}
			formattingControls={['bold', 'link']}
		/>
	);
};
