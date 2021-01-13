import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import { trash } from '@wordpress/icons';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ImageToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		imageShowControls = true,

		imageUse = checkAttr('imageUse', attributes, manifest, componentName),

		imageUrl = checkAttr('imageUrl', attributes, manifest, componentName),
		imageAlign = checkAttr('imageAlign', attributes, manifest, componentName),

		showImageAlign = true,
	} = attributes;

	if (!imageShowControls) {
		return null;
	}

	const removeMedia = () => {
		setAttributes({ [`${componentName}Url`]: '' });
	};

	return (
		<Fragment>
			{imageUse &&
				<Fragment>
					{(imageUrl !== '') &&
						<ToolbarGroup
							controls={[
								{
									icon: trash,
									title: __('Remove image', 'eightshift-frontend-libs'),
									isActive: false,
									onClick: removeMedia,
								},
							]}
						/>
					}

					{showImageAlign &&
						<BlockAlignmentMatrixToolbar
							label={__('Image Position', 'eightshift-frontend-libs')}
							value={ imageAlign }
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
