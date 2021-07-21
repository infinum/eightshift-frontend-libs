import React from 'react';
import { __ } from '@wordpress/i18n';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';
import manifest from './../manifest.json';

export const JumbotronToolbar = (attributes) => {
	const {
		setAttributes,
		jumbotronShowControls = true,

		showJumbotronContentPosition = true,
	} = attributes;

	if (!jumbotronShowControls) {
		return null;
	}

	const jumbotronUse = checkAttr('jumbotronUse', attributes, manifest);
	const jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest);

	return (
		<>
			{jumbotronUse &&
				<>
					{showJumbotronContentPosition &&
						<BlockAlignmentMatrixToolbar
							label={__('Content Position', 'eightshift-frontend-libs')}
							value={jumbotronContentPosition}
							onChange={(value) => setAttributes({ [getAttrKey('jumbotronContentPosition', attributes, manifest)]: value })}
						/>
					}

				<HeadingToolbar
					{...props('heading', attributes)}
				/>

				<ButtonToolbar
					{...props('button', attributes)}
				/>
				</>
			}
		</>
	);
};
