import React from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const %block-name-pascal-case%Editor = ({ attributes, setAttributes }) => {
	const {
		blockClass,
	} = attributes;

	const %block-name-camel-case%Content = checkAttr('%block-name-camel-case%Content', attributes, manifest);

	return (
		<RichText
			placeholder={__('Add content', 'eightshift-frontend-libs')}
			className={blockClass}
			onChange={(value) => setAttributes({ [getAttrKey('%block-name-camel-case%Content', attributes, manifest)]: value })}
			value={%block-name-camel-case%Content}
			allowedFormats={['core/bold', 'core/link']}
		/>
	);
};
