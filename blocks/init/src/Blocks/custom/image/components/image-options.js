import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, MatrixAlignControl, props } from '@eightshift/frontend-libs/scripts';
import { ImageOptions as ImageOptionsComponent } from '../../../components/image/components/image-options';
import manifest from '../manifest.json';

export const ImageOptions = ({ attributes, setAttributes }) => {
	const imageAlign = checkAttr('imageAlign', attributes, manifest);

	return (
		<PanelBody title={__('Image', '%g_textdomain%')}>
			<ImageOptionsComponent
				{...props('image', attributes, {
					setAttributes,
				})}
				additionalControlsDesignLayout={
					<MatrixAlignControl
						label={__('Position', '%g_textdomain%')}
						value={imageAlign}
						onChange={(value) => setAttributes({ [getAttrKey('imageAlign', attributes, manifest)]: value })}
						type='tileButton'
					/>
				}
				noLabel
				noUseToggle
				noExpandButton
			/>
		</PanelBody>
	);
};
