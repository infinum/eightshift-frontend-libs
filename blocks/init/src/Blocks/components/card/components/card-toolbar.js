import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr, getAttrKey, props, getOptions, getOption, AlignmentToolbar, AlignmentToolbarType } from '@eightshift/frontend-libs/scripts';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';
import manifest from './../manifest.json';

export const CardToolbar = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
	} = attributes;

	const cardAlign = checkAttr('cardAlign', attributes, manifest);

	return (
		<>
			<HeadingToolbar
				{...props('intro', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>

			<HeadingToolbar
				{...props('heading', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>

			<ButtonToolbar
				{...props('button', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>

			<AlignmentToolbar
				value={cardAlign}
				options={getOption('cardAlign', attributes, manifest)}
				label={sprintf(__('%s content align', 'eightshift-boilerplate'), manifestTitle)}
				onChange={(value) => setAttributes({ [getAttrKey('cardAlign', attributes, manifest)]: value })}
				type={AlignmentToolbarType.HORIZONTAL}
			/>
		</>
	);
};
