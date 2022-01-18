import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RangeControl, KeyboardShortcuts } from '@wordpress/components';
import {
	Responsive,
	icons,
	ucfirst,
	checkAttr,
	IconLabel,
	checkAttrResponsive,
	getAttrKey
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';
import globalManifest from '../../manifest.json';

export const WrapperOptionsLayout = ({ attributes, setAttributes }) => {
	const {
		attributes: manifestAttributes,
	} = manifest;

	const wrapperStartShow = checkAttr('wrapperStartShow', attributes, manifest);
	const wrapperEndShow = checkAttr('wrapperEndShow', attributes, manifest);

	const wrapperStart = checkAttrResponsive('wrapperStart', attributes, manifest);
	const wrapperEnd = checkAttrResponsive('wrapperEnd', attributes, manifest);

	const maxCols = globalManifest.globalVariables.maxCols;

	const gridRange = new Array(parseInt(maxCols/2, 10)).fill().map((e,i) => {
			let index = i * 3;

			if (index === 0) {
				index = 1;
			}

			return {
				value: index,
				label: index.toString(),
			};
		}).concat(
		[
			{
				value: maxCols,
				label: maxCols.toString(),
			}
		]
	);

	const startPlusCallback = () => {
		const wrapperStartLarge = checkAttr('wrapperStartLarge', attributes, manifest);

		if (wrapperStartLarge < maxCols) {
			setAttributes({ 'wrapperStartLarge': wrapperStartLarge + 1 });
		}
	};

	const startMinusCallback = () => {
		const wrapperStartLarge = checkAttr('wrapperStartLarge', attributes, manifest);

		if (wrapperStartLarge > 1) {
			setAttributes({ 'wrapperStartLarge': wrapperStartLarge - 1 });
		}
	};

	const endPlusCallback = () => {
		const wrapperEndLarge = checkAttr('wrapperEndLarge', attributes, manifest);

		if (wrapperEndLarge < maxCols) {
			setAttributes({ 'wrapperEndLarge': wrapperEndLarge + 1 });
		}
	};

	const endMinusCallback = () => {
		const wrapperEndLarge = checkAttr('wrapperEndLarge', attributes, manifest);

		if (wrapperEndLarge > 1) {
			setAttributes({ 'wrapperEndLarge': wrapperEndLarge - 1 });
		}
	};

	return (
		<>
			<KeyboardShortcuts
					shortcuts={ {
							'option+q': startMinusCallback,
							'option+w': startPlusCallback,
							'option+a': endMinusCallback,
							'option+s': endPlusCallback,
					} }
			/>

			{wrapperStartShow &&
				<Responsive label={<IconLabel icon={icons.width} label={__('Start column', 'eightshift-boilerplate')} />}>
					{Object.keys(wrapperStart).map(function (keyName) {

						const point = ucfirst(keyName);
						const attrOptionPointStart = `wrapperStart${point}`;
						const attrOptionPointEnd = `wrapperEnd${point}`;
						const attrStart = getAttrKey(attrOptionPointStart, attributes, manifest);
						const attrEnd = getAttrKey(attrOptionPointEnd, attributes, manifest);

						return (
							<Fragment key={keyName}>
								<RangeControl
									label={point}
									allowReset={true}
									value={attributes[attrStart]}
									onChange={(value) => {
										setAttributes({ [attrStart]: value });
										setAttributes({ [attrEnd]: maxCols - value + 1 });
									}}
									min={1}
									max={maxCols}
									trackColor="green"
									step={1}
									resetFallbackValue={manifestAttributes[attrOptionPointStart].default}
									marks={gridRange}
								/>
							</Fragment>
						);
					})}
				</Responsive>
			}

			{wrapperEndShow &&
				<Responsive label={<IconLabel icon={icons.width} label={__('End column', 'eightshift-boilerplate')} />}>
					{Object.keys(wrapperEnd).map(function (keyName) {

						const point = ucfirst(keyName);
						const attrOption = 'wrapperEnd';
						const attrOptionPoint = `${attrOption}${point}`;
						const attr = getAttrKey(attrOptionPoint, attributes, manifest);

						const wrapperStartValue = typeof wrapperStart[keyName] === 'string' ? 0 : wrapperStart[keyName];

						return (
							<Fragment key={keyName}>
								<RangeControl
									label={point}
									allowReset={true}
									value={attributes[attr]}
									onChange={(value) => {
										let calc = value - wrapperStartValue + 1;

										if (value < wrapperStartValue) {
											calc = value;
										}

										setAttributes({ [attr]: calc });
									}}
									min={1}
									max={maxCols - wrapperStartValue + 1}
									trackColor="green"
									step={1}
									resetFallbackValue={manifestAttributes[attrOptionPoint].default}
									marks={gridRange}
								/>
							</Fragment>
						);
					})}
				</Responsive>
			}
		</>
	);
};
