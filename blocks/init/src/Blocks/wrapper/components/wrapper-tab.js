import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, RangeControl, Icon } from '@wordpress/components';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import globalSettings from './../../manifest.json';
import { WrapperTabSimple } from './wrapper-tab-simple';
import manifest from './../manifest.json';

const { options } = manifest;

export const WrapperTab = ({ attributes, breakPoint, setAttributes }) => {
	const {
		wrapperUseSimple,

		wrapperShowWidth = true,
		wrapperShowOffset = true,
		wrapperShowContainerWidth = true,
		wrapperShowGutter = true,
	} = attributes;

	const widthOptions = {
		min: 0,
		max: globalSettings.globalVariables.maxCols,
		step: 1,
	};

	return (
		<Fragment>
			{!wrapperUseSimple &&
				<Fragment>
					{wrapperShowWidth && (
						<RangeControl
							label={
								<Fragment>
									<Icon icon={icons.width} />
									{__('Content Width', 'eightshift-boilerplate')}
								</Fragment>
							}
							help={sprintf(__('Option to change the block width in the grid from the left. Change column width in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}
							allowReset={true}
							value={attributes[`wrapperWidth${ucfirst(breakPoint)}`]}
							onChange={(value) => setAttributes({ [`wrapperWidth${ucfirst(breakPoint)}`]: value })}
							min={widthOptions.min}
							max={widthOptions.max}
							step={widthOptions.step}
						/>
					)}

					{wrapperShowOffset && (
						<RangeControl
							label={
								<Fragment>
									<Icon icon={icons.offset} />
									{__('Content Offset', 'eightshift-boilerplate')}
								</Fragment>
							}
							help={sprintf(__('Option to change the block offset in the grid from the left. Change block offset in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}
							allowReset={true}
							value={attributes[`wrapperOffset${ucfirst(breakPoint)}`]}
							onChange={(value) => setAttributes({ [`wrapperOffset${ucfirst(breakPoint)}`]: value })}
							min={widthOptions.min}
							max={widthOptions.max}
							step={widthOptions.step}
						/>
					)}

					{wrapperShowContainerWidth &&
						<SelectControl
							label={
								<Fragment>
									<Icon icon={icons.containerWidth} />
									{__('Container Width', 'eightshift-boilerplate')}
								</Fragment>
							}
							help={__('Change Container width. Changing this option will affect total width of the block and the total size of grid inside the block.', 'eightshift-boilerplate')}
							value={attributes[`wrapperContainerWidth${ucfirst(breakPoint)}`]}
							onChange={(value) => setAttributes({ [`wrapperContainerWidth${ucfirst(breakPoint)}`]: value })}
							options={options.containerWidths}
						/>
					}

					{wrapperShowGutter &&
						<SelectControl
							label={
								<Fragment>
									<Icon icon={icons.gutter} />
									{__('Container Spacing', 'eightshift-boilerplate')}
								</Fragment>
							}
							help={__('Change Container spacing on the left and right. More popular name is Container Gutter.', 'eightshift-boilerplate')}
							options={options.gutters}
							value={attributes[`wrapperGutter${ucfirst(breakPoint)}`]}
							onChange={(value) => setAttributes({ [`wrapperGutter${ucfirst(breakPoint)}`]: value })}
						/>
					}
				</Fragment>
			}

			<WrapperTabSimple
				attributes={attributes}
				breakPoint={breakPoint}
				setAttributes={setAttributes}
			/>

		</Fragment>
	);
};
