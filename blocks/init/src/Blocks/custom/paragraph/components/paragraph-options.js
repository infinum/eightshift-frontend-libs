import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ParagraphOptions as ParagraphOptionsComponent } from '../../../components/paragraph/components/paragraph-options';

export const ParagraphOptions = ({ attributes, actions }) => {
	const {
		paragraph,
	} = attributes;

	const {
		onChangeParagraphStyleColor,
		onChangeParagraphStyleSize,
	} = actions;

	const paragraphObject = (typeof paragraph === 'undefined') || paragraph;

	return (
		<PanelBody title={__('Paragraph Details', 'eightshift-boilerplate')}>

			<ParagraphOptionsComponent
				paragraph={paragraphObject}
				onChangeStyleSize={onChangeParagraphStyleSize}
				onChangeStyleColor={onChangeParagraphStyleColor}
			/>

		</PanelBody>
	);
};
