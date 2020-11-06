import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RangeControl, ToggleControl, Icon } from '@wordpress/components';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import globalSettings from '../../manifest.json';
import manifest from './../manifest.json';

const { attributes: reset } = manifest;
const { globalVariables: defaults } = globalSettings;

export const WrapperTabSimple = ({ attributes, breakPoint, setAttributes }) => {
	const {
		wrapperShowSpacingTop = true,
		wrapperShowSpacingBottom = true,
		wrapperShowSpacingInTop = true,
		wrapperShowSpacingInBottom = true,
		wrapperShowDividerTop = true,
		wrapperShowDividerBottom = true,
		wrapperShowHideBlock = true,
	} = attributes;

	const wrapperSpacingTop = `wrapperSpacingTop${ucfirst(breakPoint)}`;
	const wrapperSpacingBottom = `wrapperSpacingBottom${ucfirst(breakPoint)}`;
	const wrapperSpacingInTop = `wrapperSpacingInTop${ucfirst(breakPoint)}`;
	const wrapperSpacingInBottom = `wrapperSpacingInBottom${ucfirst(breakPoint)}`;
	const wrapperDividerTop = `wrapperDividerTop${ucfirst(breakPoint)}`;
	const wrapperDividerBottom = `wrapperDividerBottom${ucfirst(breakPoint)}`;
	const wrapperHideBlock = `wrapperHideBlock${ucfirst(breakPoint)}`;

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
					value={attributes[wrapperSpacingTop]}
					onChange={(value) => setAttributes({ [wrapperSpacingTop]: value })}
					min={defaults.sectionSpacing.min}
					max={defaults.sectionSpacing.max}
					step={defaults.sectionSpacing.step}
					resetFallbackValue={reset[wrapperSpacingTop].default}
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
					value={attributes[wrapperSpacingBottom]}
					onChange={(value) => setAttributes({ [wrapperSpacingBottom]: value })}
					min={defaults.sectionSpacing.min}
					max={defaults.sectionSpacing.max}
					step={defaults.sectionSpacing.step}
					resetFallbackValue={reset[wrapperSpacingBottom].default}
				/>
			}

			<hr />
			<br />

			{wrapperShowSpacingInTop &&
				<RangeControl
					label={
						<Fragment>
							<Icon icon={icons.spacingTop} />
							{__('Spacing In Top', 'eightshift-boilerplate')}
						</Fragment>
					}
					allowReset={true}
					value={attributes[wrapperSpacingInTop]}
					onChange={(value) => setAttributes({ [wrapperSpacingInTop]: value })}
					min={defaults.sectionInSpacing.min}
					max={defaults.sectionInSpacing.max}
					step={defaults.sectionInSpacing.step}
					resetFallbackValue={reset[wrapperSpacingInTop].default}
				/>
			}

			{wrapperShowSpacingInBottom &&
				<RangeControl
					label={
						<Fragment>
							<Icon icon={icons.spacingBottom} />
							{__('Spacing In Bottom', 'eightshift-boilerplate')}
						</Fragment>
					}
					allowReset={true}
					value={attributes[wrapperSpacingInBottom]}
					onChange={(value) => setAttributes({ [wrapperSpacingInBottom]: value })}
					min={defaults.sectionInSpacing.min}
					max={defaults.sectionInSpacing.max}
					step={defaults.sectionInSpacing.step}
					resetFallbackValue={reset[wrapperSpacingInBottom].default}
				/>
			}

			<hr />
			<br />

			{wrapperShowDividerTop &&
				<ToggleControl
					label={__('Divider Top', 'eightshift-boilerplate')}
					checked={attributes[wrapperDividerTop]}
					onChange={(value) => setAttributes({ [wrapperDividerTop]: value })}
				/>
			}

			{wrapperShowDividerBottom &&
				<ToggleControl
					label={__('Divider Bottom', 'eightshift-boilerplate')}
					checked={attributes[wrapperDividerBottom]}
					onChange={(value) => setAttributes({ [wrapperDividerBottom]: value })}
				/>
			}

			<hr />
			<br />

			{wrapperShowHideBlock &&
				<ToggleControl
					label={__('Hide Block', 'eightshift-boilerplate')}
					checked={attributes[wrapperHideBlock]}
					onChange={(value) => setAttributes({ [wrapperHideBlock]: value })}
				/>
			}

			<hr />
			<br />

		</Fragment>
	);
};
