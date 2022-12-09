import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, MatrixAlignControl, props } from '@eightshift/frontend-libs/scripts';
import { ImageOptions as ImageOptionsComponent } from '../../../components/image/components/image-options';
import manifest from '../manifest.json';

export const ImageOptions = ({ attributes, setAttributes }) => {
	const imageAlign = checkAttr('imageAlign', attributes, manifest);

	return (
		<PanelBody title={__('Image', 'eightshift-frontend-libs')}>
			<ImageOptionsComponent
				{...props('image', attributes, {
					setAttributes,
				})}
				showLabel={false}
				showImageUse={false}
				showExpanderButton={false}
				additionalControlsDesignLayout={
					<div className='es-v-center es-gap-1.25! es-rounded-1.0 es-border-cool-gray-100 es-w-17 es-h-17 es-text-3! es-line-h-1'>
						<div className='es-rounded-0.75 es-border-cool-gray-300 es-line-h-0'>
							<MatrixAlignControl
								label={__('Image position', 'eightshift-frontend-libs')}
								value={imageAlign}
								onChange={(value) => setAttributes({ [getAttrKey('imageAlign', attributes, manifest)]: value })}
							/>
						</div>
						<span>{__('Position', 'eightshift-frontend-libs')}</span>
					</div>
				}
			/>
		</PanelBody>
	);
};
