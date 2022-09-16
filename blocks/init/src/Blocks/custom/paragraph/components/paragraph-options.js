import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, props, SimpleHorizontalSingleSelect } from '@eightshift/frontend-libs/scripts';
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
				showLabel={false}
				showParagraphUse={false}
				showExpanderButton={false}
				additionalControlsSplitArea={
					<SimpleHorizontalSingleSelect
						value={paragraphAlign}
						options={getOption('paragraphAlign', attributes, manifest)}
						label={__('Text align', 'eightshift-frontend-libs')}
						onChange={(value) => setAttributes({ [getAttrKey('paragraphAlign', attributes, manifest)]: value })}
						border='offset'
						iconOnly
					/>
				}
			/>
		</PanelBody>
	);
};
