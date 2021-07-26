import React from 'react';
import { __ } from '@wordpress/i18n';
import { ToolbarGroup } from '@wordpress/components';
import { checkAttr, getAttrKey, MatrixAlignControl, props } from '@eightshift/frontend-libs/scripts';
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

	const jumbotronUse = checkAttr('jumbotronUse', attributes, manifest)
	const jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest);

	if (!jumbotronUse) {
		return null;
	}

	return (
		<>
			{showJumbotronContentPosition &&
				<ToolbarGroup>
					<MatrixAlignControl
						label={__('Content position', 'newboilerplate')}
						value={jumbotronContentPosition}
						onChange={(value) => setAttributes({ [getAttrKey('jumbotronContentPosition', attributes, manifest)]: value })}
					/>
				</ToolbarGroup>
			}

			<ToolbarGroup>
				<HeadingToolbar
					{...props('heading', attributes)}
				/>
			</ToolbarGroup>

			<ToolbarGroup>
				<ButtonToolbar
					{...props('button', attributes)}
				/>
			</ToolbarGroup>
		</>
	);
};
