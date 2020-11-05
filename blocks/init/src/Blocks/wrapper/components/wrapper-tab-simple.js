import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RangeControl, ToggleControl, Icon } from '@wordpress/components';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import globalSettings from '../../manifest.json';

export const spacingOptions = {
	min: -10,
	max: globalSettings.globalVariables.sectionSpacing.max,
	step: globalSettings.globalVariables.sectionSpacing.step,
};

export const WrapperTabSimple = ({ attributes, breakPoint, setAttributes }) => {
	const {
		wrapperShowSpacingTop = true,
		wrapperShowSpacingBottom = true,
		wrapperShowHideBlock = true,
	} = attributes;

	return (
		<Fragment>
			{wrapperShowSpacingTop &&
				<RangeControl
					label={
						<Fragment>
							<Icon icon={icons.spacingTop} />
							{__('Spacing Top', 'eightshift-boilerplate')}
						</Fragment>
					}
					help={__('Change Block Spacing from the top. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
					allowReset={true}
					value={attributes[`wrapperSpacingTop${ucfirst(breakPoint)}`]}
					onChange={(value) => setAttributes({ [`wrapperSpacingTop${ucfirst(breakPoint)}`]: value })}
					min={spacingOptions.min}
					max={spacingOptions.max}
					step={spacingOptions.step}
				/>
			}

			{wrapperShowSpacingBottom &&
				<RangeControl
					label={
						<Fragment>
							<Icon icon={icons.spacingBottom} />
							{__('Spacing Bottom', 'eightshift-boilerplate')}
						</Fragment>
					}
					help={__('Change Block Spacing from the bottom. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
					allowReset={true}
					value={attributes[`wrapperSpacingBottom${ucfirst(breakPoint)}`]}
					onChange={(value) => setAttributes({ [`wrapperSpacingBottom${ucfirst(breakPoint)}`]: value })}
					min={spacingOptions.min}
					max={spacingOptions.max}
					step={spacingOptions.step}
				/>
			}

			{wrapperShowHideBlock &&
				<ToggleControl
					label={__('Hide Block', 'eightshift-boilerplate')}
					help={__('Toggle block visibility.', 'eightshift-boilerplate')}
					checked={attributes[`wrapperHideBlock${ucfirst(breakPoint)}`]}
					onChange={(value) => setAttributes({ [`wrapperHideBlock${ucfirst(breakPoint)}`]: value })}
				/>
			}
		</Fragment>
	);
};
