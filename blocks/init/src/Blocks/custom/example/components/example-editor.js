import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ExampleEditor = (attributes) => {
	const {
		setAttributes,
		blockClass,

		content,
	} = attributes;

	return (
		<RichText
			placeholder={__('Add Content', 'eightshift-boilerplate')}
			className={blockClass}
			onChange={(value) => setAttributes({ content: value })}
			value={content}
			formattingControls={['bold', 'link']}
		/>
	);
};
