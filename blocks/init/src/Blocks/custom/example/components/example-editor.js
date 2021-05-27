import React from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ExampleEditor = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	const {
		blockClass,

		exampleContent = checkAttr('exampleContent', attributes, manifest),
	} = attributes;

	return (
		<RichText
			placeholder={__('Add Content', 'eightshift-frontend-libs')}
			className={blockClass}
			onChange={(value) => setAttributes({ [`${manifestBlockName}Content`]: value })}
			value={exampleContent}
			allowedFormats={['core/bold', 'core/link']}
		/>
	);
};
