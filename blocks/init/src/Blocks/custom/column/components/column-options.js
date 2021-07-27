import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, RangeControl, ButtonGroup, Button } from '@wordpress/components';
import { icons, ucfirst, Responsive, HelpModal, getAttrKey, getOption, IconLabel, IconToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from '../../../manifest.json';

export const ColumnOptions = ({ attributes, setAttributes }) => {
	const {
		attributes: manifestAttributes,
	} = manifest;

	const breakpoints = Object.keys(globalManifest.globalVariables.breakpoints).reverse();

	return (
		<PanelBody title={__('Column', 'newboilerplate')}>

			<HelpModal
				type='column'
				buttonLabel={__('How to use a Column?', 'newboilerplate')}
				modalLabel={__('Column', 'newboilerplate')}
			/>

			<br /><br />

			<Responsive label={<IconLabel icon={icons.width} label={__('Width', 'newboilerplate')} />}>
				{breakpoints.map((keyName) => {
					const point = ucfirst(keyName);
					const attr = `${getAttrKey('columnWidth', attributes, manifest)}${point}`;
					const { min, max, step } = getOption('columnWidth', attributes, manifest);

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
								onChange={(value) => setAttributes({ [attr]: value })}
								resetFallbackValue={manifestAttributes[attr].default}
								value={attributes[attr]}
								min={min}
								max={max}
								step={step}
								allowReset
							/>
						</Fragment>
					);
				})}
			</Responsive>

			<Responsive label={<IconLabel icon={icons.offset} label={__('Offset', 'newboilerplate')} />}>
				{breakpoints.map(function (keyName) {
					const point = ucfirst(keyName);
					const attr = `${getAttrKey('columnOffset', attributes, manifest)}${point}`;
					const { min, max, step } = getOption('columnOffset', attributes, manifest);

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
								onChange={(value) => setAttributes({ [attr]: value })}
								resetFallbackValue={manifestAttributes[attr].default}
								value={attributes[attr]}
								min={min}
								max={max}
								step={step}
								allowReset
							/>
						</Fragment>
					);
				})}
			</Responsive>

			<Responsive label={<IconLabel icon={icons.order} label={__('Order', 'newboilerplate')} />}>
				{breakpoints.map((keyName, index) => {
					const point = ucfirst(keyName);
					const attr = `${getAttrKey('columnOrder', attributes, manifest)}${point}`;
					const { min, max, step } = getOption('columnOrder', attributes, manifest);

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
								onChange={(value) => setAttributes({ [attr]: value })}
								resetFallbackValue={manifestAttributes[attr].default}
								value={attributes[attr]}
								min={min}
								max={max}
								step={step}
								allowReset
							/>
							{index === 0 &&
								<p className='es-decorative-text'>{__('Needs to be set on all columns!', 'newboilerplate')}</p>
							}
						</Fragment>
					);
				})}
			</Responsive>

			<Responsive label={<IconLabel icon={icons.verticalAlign} label={__('Vertical align', 'newboilerplate')} />}>
				{breakpoints.map((keyName, index) => {
					const point = ucfirst(keyName);
					const attr = `${getAttrKey('columnVerticalAlign', attributes, manifest)}${point}`;
					const options = getOption('columnVerticalAlign', attributes, manifest);

					return (
						<div className='es-responsive-inset es-v-spaced' key={index}>
							<IconLabel icon={icons[`screen${point}`]} label={point} standalone />
							<ButtonGroup>
								{options.map(({ label, value }, index) => {
									return (
										<Button
											key={index}
											label={label}
											isPressed={attributes[attr] === value}
											onClick={() => setAttributes({ [attr]: value })}
											icon={icons[`verticalAlign${ucfirst(value)}`]}
											iconSize={24}
										/>
									);
								}
								)}
							</ButtonGroup>
						</div>
					);
				})}
			</Responsive>

			<Responsive label={<IconLabel icon={icons.hide} label={__('Hide', 'newboilerplate')} />}>
				{breakpoints.map((keyName) => {
					const point = ucfirst(keyName);
					const attr = `${getAttrKey('columnHide', attributes, manifest)}${point}`;

					return (
						<Fragment key={keyName}>
							<IconToggle
								icon={icons[`screen${point}`]}
								label={point}
								checked={attributes[attr]}
								onChange={(value) => setAttributes({ [attr]: value })}
							/>
						</Fragment>
					);
				})}
			</Responsive>
		</PanelBody>
	);
};
