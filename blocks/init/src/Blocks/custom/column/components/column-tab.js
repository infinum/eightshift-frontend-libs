/* eslint-disable no-unused-vars */

import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import { RangeControl, ToggleControl, Icon } from '@wordpress/components';
import globalSettings from '../../../manifest.json';
import manifest from './../manifest.json';

const { attributes: reset, options } = manifest;

export const ColumnTab = ({ attributes, breakPoint, setAttributes }) => {
	const width = `width${ucfirst(breakPoint)}`;
	const offset = `offset${ucfirst(breakPoint)}`;
	const hide = `hide${ucfirst(breakPoint)}`;

	return (
		<Fragment>
			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.width} />
						{__('Width', 'solplanet')}
					</Fragment>
				}
				help={sprintf(__('Option to change the block width in the grid from the left. Change column width in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'solplanet'), globalSettings.globalVariables.maxCols)}
				allowReset={true}
				value={attributes[width]}
				onChange={(value) => setAttributes({ [width]: value })}
				min={options.widths.min}
				max={options.widths.max}
				step={options.widths.step}
				resetFallbackValue={reset[width].default}
			/>

			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.offset} />
						{__('Offset', 'solplanet')}
					</Fragment>
				}
				help={sprintf(__('Option to change the block offset in the grid from the left. Change block offset in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'solplanet'), globalSettings.globalVariables.maxCols)}
				allowReset={true}
				value={attributes[offset]}
				onChange={(value) => setAttributes({ [offset]: value })}
				min={options.widths.min}
				max={options.widths.max}
				step={options.widths.step}
				resetFallbackValue={reset[offset].default}
			/>

			<ToggleControl
				label={__('Hide', 'solplanet')}
				help={__('Toggle visibility.', 'solplanet')}
				checked={attributes[hide]}
				onChange={(value) => setAttributes({ [hide]: value })}
			/>
		</Fragment>
	);
};
