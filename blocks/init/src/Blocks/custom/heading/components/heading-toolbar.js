import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { props, getOption } from '@eightshift/frontend-libs/scripts/editor';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { HeadingToolbar as HeadingToolbarComponent } from '../../../components/heading/components/heading-toolbar';
import manifest from './../manifest.json';

export const HeadingToolbar = ({ attributes, setAttributes }) => {
	const {
		title: manifestTitle,
	} = manifest;

	const headingAlign = checkAttr('headingAlign', attributes, manifest);

	return (
		<>
			<HeadingToolbarComponent
				{...props('heading', attributes, {
					setAttributes: setAttributes,
				})}
			/>

			<AlignmentToolbar
				value={headingAlign}
				options={getOption('headingAlign', attributes, manifest)}
				label={sprintf(__('%s text align', 'eightshift-frontend-libs'), manifestTitle)}
				onChange={(value) => setAttributes({ [getAttrKey('headingAlign', attributes, manifest)]: value })}
			/>

		</>
	);
};
