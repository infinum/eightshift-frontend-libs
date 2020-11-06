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
		wrapperShowDividerTop = true,
		wrapperShowDividerBottom = true,
		wrapperShowHideBlock = true,
	} = attributes;

	return (
		<Fragment>
			<hr />
			<br />

			{wrapperShowSpacingTop &&
				<RangeControl
					label={
						<Fragment>
							<Icon icon={icons.spacingTop} />
							{__('Spacing Top', 'eightshift-boilerplate')}
						</Fragment>
					}
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
					allowReset={true}
					value={attributes[`wrapperSpacingBottom${ucfirst(breakPoint)}`]}
					onChange={(value) => setAttributes({ [`wrapperSpacingBottom${ucfirst(breakPoint)}`]: value })}
					min={spacingOptions.min}
					max={spacingOptions.max}
					step={spacingOptions.step}
				/>
			}

			<hr />
			<br />

			{wrapperShowDividerTop &&
				<ToggleControl
					label={__('Divider Top', 'eightshift-boilerplate')}
					checked={attributes[`wrapperDividerTop${ucfirst(breakPoint)}`]}
					onChange={(value) => setAttributes({ [`wrapperDividerTop${ucfirst(breakPoint)}`]: value })}
				/>
			}

			{wrapperShowDividerBottom &&
				<ToggleControl
					label={__('Divider Bottom', 'eightshift-boilerplate')}
					checked={attributes[`wrapperDividerBottom${ucfirst(breakPoint)}`]}
					onChange={(value) => setAttributes({ [`wrapperDividerBottom${ucfirst(breakPoint)}`]: value })}
				/>
			}

			<hr />
			<br />

			{wrapperShowHideBlock &&
				<ToggleControl
					label={__('Hide Block', 'eightshift-boilerplate')}
					checked={attributes[`wrapperHideBlock${ucfirst(breakPoint)}`]}
					onChange={(value) => setAttributes({ [`wrapperHideBlock${ucfirst(breakPoint)}`]: value })}
				/>
			}

			<hr />
			<br />

		</Fragment>
	);
};
