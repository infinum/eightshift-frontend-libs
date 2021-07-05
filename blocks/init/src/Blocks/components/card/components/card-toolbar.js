import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { props, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';
import manifest from './../manifest.json';

export const CardToolbar = (attributes) => {
	const {
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
	} = attributes;

	const cardAlign = checkAttr('cardAlign', attributes, manifest);

	return (
		<>

			<HeadingToolbar
				{...props(attributes, 'intro')}
				setAttributes={setAttributes}
				options={getOptions(attributes, manifest)}
			/>

			<HeadingToolbar
				{...props(attributes, 'heading')}
				setAttributes={setAttributes}
				options={getOptions(attributes, manifest)}
			/>

			<ButtonToolbar
				{...props(attributes, 'button')}
				setAttributes={setAttributes}
				options={getOptions(attributes, manifest)}
			/>

			<AlignmentToolbar
				value={cardAlign}
				options={manifestOptions.cardAlign}
				label={sprintf(__('%s text align', 'eightshift-frontend-libs'), manifestTitle)}
				onChange={(value) => setAttributes({ [getAttrKey('cardAlign', attributes, manifest)]: value })}
			/>
		</>
	);
};
