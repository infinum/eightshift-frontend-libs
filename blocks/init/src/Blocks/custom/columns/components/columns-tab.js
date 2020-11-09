/* eslint-disable no-unused-vars */

import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, Icon, RangeControl } from '@wordpress/components';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { attributes: reset, options } = manifest;

export const ColumnsTab = ({ attributes, breakPoint, setAttributes }) => {

	const gutter = `gutter${ucfirst(breakPoint)}`;
	const verticalSpacing = `verticalSpacing${ucfirst(breakPoint)}`;

	return (
		<Fragment>
			<SelectControl
				label={
					<Fragment>
						<Icon icon={icons.containerWidth} />
						{__('Gutter', 'eightshift-boilerplate')}
					</Fragment>
				}
				help={__('Option to change gutter (left and right).', 'eightshift-boilerplate')}
				options={options.gutters}
				value={attributes[gutter]}
				onChange={(value) => setAttributes({ [gutter]: value })}
			/>

			<SelectControl
				label={
					<Fragment>
						<Icon icon={icons.containerHeight} />
						{__('Vertical Spacing', 'eightshift-boilerplate')}
					</Fragment>
				}
				help={__('Option to change vertical spacing (top and bottom).', 'eightshift-boilerplate')}
				options={options.verticalSpacings}
				value={attributes[verticalSpacing]}
				onChange={(value) => setAttributes({ [verticalSpacing]: value })}
			/>

		</Fragment>
	);
};
