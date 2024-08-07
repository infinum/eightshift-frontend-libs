import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { generateResponsiveNumberPickerConfig, ResponsiveNumberPicker } from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
import manifest from './../manifest.json';

export const ColumnsOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Columns', '%g_textdomain%')}>
			<ResponsiveNumberPicker
				icon={icons.gutter}
				label={__('Column gap', '%g_textdomain%')}
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
				label={__('Row gap', '%g_textdomain%')}
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
