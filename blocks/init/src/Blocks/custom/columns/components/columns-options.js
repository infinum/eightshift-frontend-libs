import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { generateResponsiveNumberPickerConfig, icons, ResponsiveNumberPicker } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ColumnsOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Columns', 'eightshift-frontend-libs')}>
			<ResponsiveNumberPicker
				icon={icons.gutter}
				label={__('Column gap', 'eightshift-frontend-libs')}
				resetButton={0}

				{...generateResponsiveNumberPickerConfig({
					attributeName: 'columnsColumnGap',
					attributes: attributes,
					setAttributes: setAttributes,
					manifest: manifest,
				})}
			/>

			<ResponsiveNumberPicker
				icon={icons.verticalSpacing}
				label={__('Row gap', 'eightshift-frontend-libs')}
				resetButton={0}
				noBottomSpacing

				{...generateResponsiveNumberPickerConfig({
					attributeName: 'columnsRowGap',
					attributes: attributes,
					setAttributes: setAttributes,
					manifest: manifest,
				})}
			/>
		</PanelBody>
	);
};
