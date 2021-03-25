import React from 'react';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import { ImageToolbar } from '../../image/components/image-toolbar';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ParagraphToolbar } from '../../paragraph/components/paragraph-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const JumbotronToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		jumbotronShowControls = true,

		jumbotronUse = checkAttr('jumbotronUse', attributes, manifest, componentName),

		jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest, componentName),

		showJumbotronContentPosition = true,
	} = attributes;

	if (!jumbotronShowControls) {
		return null;
	}

	return (
		<>
			{jumbotronUse &&
				<>
					{showJumbotronContentPosition &&
						<BlockAlignmentMatrixToolbar
							label={__('Content Position', 'eightshift-frontend-libs')}
							value={jumbotronContentPosition}
							onChange={(value) => setAttributes({ [`${componentName}ContentPosition`]: value })}
						/>
					}

				<ImageToolbar
					{...props(attributes, 'image')}
					setAttributes={setAttributes}
				/>

				<HeadingToolbar
					{...props(attributes, 'heading')}
					setAttributes={setAttributes}
				/>

				<ParagraphToolbar
					{...props(attributes, 'paragraph')}
					setAttributes={setAttributes}
				/>

				<ButtonToolbar
					{...props(attributes, 'button')}
					setAttributes={setAttributes}
				/>
				</>
			}
		</>
	);
};
