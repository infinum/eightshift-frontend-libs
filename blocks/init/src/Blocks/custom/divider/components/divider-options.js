import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';

export const DividerOptions = ({ attributes, actions }) => {
	const {
		color,
	} = attributes;

	const {
		onChangeColor,
	} = actions;

	return (
		<PanelBody title={__('Divider Details', 'eightshift-boilerplate')}>

			{onChangeColor &&
				<ColorPaletteCustom
					label={__('Color', 'eightshift-boilerplate')}
					value={color}
					onChange={onChangeColor}
				/>
			}

		</PanelBody>
	);
};
