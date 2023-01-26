import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, props, OptionSelector } from '@eightshift/frontend-libs/scripts';
import { ParagraphOptions as ParagraphOptionsComponent } from '../../../components/paragraph/components/paragraph-options';
import manifest from '../manifest.json';

export const ParagraphOptions = ({ attributes, setAttributes }) => {
	const paragraphAlign = checkAttr('paragraphAlign', attributes, manifest);

	return (
		<PanelBody title={__('Paragraph', 'eightshift-frontend-libs')}>
			<ParagraphOptionsComponent
				{...props('paragraph', attributes, {
					setAttributes,
				})}
				additionalControlsSplitArea={
					<OptionSelector
						value={paragraphAlign}
						options={getOption('paragraphAlign', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey('paragraphAlign', attributes, manifest)]: value })}
						noBottomSpacing
						iconOnly
					/>
				}
				noLabel
				noUseToggle
				noExpandButton
			/>
		</PanelBody>
	);
};
