import React from 'react';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import { ImageToolbar } from '../../../components/image/components/image-toolbar';
import { HeadingToolbar } from '../../../components/heading/components/heading-toolbar';
import { ParagraphToolbar } from '../../../components/paragraph/components/paragraph-toolbar';
import { ButtonToolbar } from '../../../components/button/components/button-toolbar';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const JumbotronToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,

		jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest, componentName),
	} = attributes;

	console.log(jumbotronContentPosition);

	return (
		<Fragment>
			<BlockAlignmentMatrixToolbar
				label={__('Content Position', 'eightshift-frontend-libs')}
				value={ jumbotronContentPosition }
				onChange={(value) => setAttributes({ [`${componentName}ContentPosition`]: value })}
			/>

			<ImageToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>

			<HeadingToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>

			<ParagraphToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>

			<ButtonToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>
		</Fragment>
	);
};
