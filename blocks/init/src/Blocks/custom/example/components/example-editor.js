import React from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ExampleEditor = ({ attributes, setAttributes }) => {
	const {
		blockClass,
	} = attributes;

	const exampleContent = checkAttr('exampleContent', attributes, manifest);

	return (
		<RichText
			placeholder={__('Add Content', 'eightshift-frontend-libs')}
			className={blockClass}
			onChange={(value) => setAttributes({ [getAttrKey('exampleContent', attributes, manifest)]: value })}
			value={exampleContent}
			allowedFormats={['core/bold', 'core/link']}
		/>
	);
};
