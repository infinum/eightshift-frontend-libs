import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { HeadingToolbar as HeadingToolbarComponent } from '../../../components/heading/components/heading-toolbar';
import manifest from './../manifest.json';

export const HeadingToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		headingAlign = checkAttr('headingAlign', attributes, manifest),
	} = attributes;

	return (
		<>
			<HeadingToolbarComponent
				setAttributes={setAttributes}
				{...props(attributes, blockName, '', true)}
			/>

			<AlignmentToolbar
				value={headingAlign}
				options={manifestOptions.headingAlign}
				label={sprintf(__('%s text align', 'eightshift-frontend-libs'), manifestTitle)}
				onChange={(value) => setAttributes({ 'headingAlign': value })}
			/>

		</>
	);
};
