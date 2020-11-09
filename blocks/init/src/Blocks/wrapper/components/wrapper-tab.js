import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
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
			<WrapperTabSimple
				attributes={attributes}
				breakPoint={breakPoint}
				setAttributes={setAttributes}
			/>

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
							value={attributes[`wrapperContainerWidth${ucfirst(breakPoint)}`]}
							onChange={(value) => setAttributes({ [`wrapperContainerWidth${ucfirst(breakPoint)}`]: value })}
							options={options.containerWidths}
						/>
					}

					{wrapperShowGutter &&
						<SelectControl
							label={
								<Fragment>
									<Icon icon={icons.containerSpacing} />
									{__('Container Spacing', 'eightshift-boilerplate')}
								</Fragment>
							}
							options={options.gutters}
							value={attributes[`wrapperGutter${ucfirst(breakPoint)}`]}
							onChange={(value) => setAttributes({ [`wrapperGutter${ucfirst(breakPoint)}`]: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
