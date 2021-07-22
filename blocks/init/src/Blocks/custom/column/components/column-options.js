import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, Icon, RangeControl, ToggleControl, ButtonGroup, Button } from '@wordpress/components';
import { checkAttrResponsive, icons, ucfirst, Responsive, HelpModal } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ColumnOptions = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
		attributes: manifestAttributes,
		options: manifestOptions,
	} = manifest;

	return (
		<PanelBody title={__('Column Details', 'eightshift-frontend-libs')}>

			<HelpModal
				type="column"
				buttonLabel={__('How to use a column?', 'eightshift-frontend-libs')}
				modalLabel={__('Column', 'eightshift-frontend-libs')}
			/>

			<br /><br />

			<Responsive
				label={
					<>
						<Icon icon={icons.width} />
						{__('Width', 'eightshift-frontend-libs')}
					</>
				}
			>
				{Object.keys(checkAttrResponsive('columnWidth', attributes, manifest)).map(function(keyName) {

					const point = ucfirst(keyName);
					const attrOption = `${manifestBlockName}Width`;
					const attr = `${attrOption}${point}`;

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={point}
								allowReset={true}
								value={attributes[attr]}
								onChange={(value) => setAttributes({ [attr]: value })}
								min={manifestOptions[attrOption].min}
								max={manifestOptions[attrOption].max}
								step={manifestOptions[attrOption].step}
								resetFallbackValue={manifestAttributes[attr].default}
							/>
						</Fragment>
					);
				})}
			</Responsive>

			<Responsive
				label={
					<>
						<Icon icon={icons.offset} />
						{__('Offset', 'eightshift-frontend-libs')}
					</>
				}
			>
				{Object.keys(checkAttrResponsive('columnOffset', attributes, manifest)).map(function(keyName) {

					const point = ucfirst(keyName);
					const attrOption = `${manifestBlockName}Offset`;
					const attr = `${attrOption}${point}`;

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={point}
								allowReset={true}
								value={attributes[attr]}
								onChange={(value) => setAttributes({ [attr]: value })}
								min={manifestOptions[attrOption].min}
								max={manifestOptions[attrOption].max}
								step={manifestOptions[attrOption].step}
								resetFallbackValue={manifestAttributes[attr].default}
							/>
						</Fragment>
					);
				})}
			</Responsive>

			<Responsive
				label={
					<>
						<Icon icon={icons.order} />
						{__('Order', 'eightshift-frontend-libs')}
					</>
				}
			>
				{Object.keys(checkAttrResponsive('columnOrder', attributes, manifest)).map(function(keyName) {

					const point = ucfirst(keyName);
					const attrOption = `${manifestBlockName}Order`;
					const attr = `${attrOption}${point}`;

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={point}
								allowReset={true}
								value={attributes[attr]}
								onChange={(value) => setAttributes({ [attr]: value })}
								min={manifestOptions[attrOption].min}
								max={manifestOptions[attrOption].max}
								step={manifestOptions[attrOption].step}
								resetFallbackValue={manifestAttributes[attr].default}
							/>
						</Fragment>
					);
				})}
			</Responsive>

			<Responsive
				label={
					<>
						<Icon icon={icons.verticalAlign} />
						{__('Vertical align', 'eightshift-frontend-libs')}
					</>
				}
			>
				{Object.keys(checkAttrResponsive('columnAlign', attributes, manifest)).map(function(keyName, index) {

					const point = ucfirst(keyName);
					const attrOption = `${manifestBlockName}Align`;
					const attr = `${attrOption}${point}`;

					return (
						<Fragment key={index}>
							<span className="button-group__label">{point}</span>
							<ButtonGroup>
								{manifestOptions.columnAlign.map((alignment, alignIndex) => {
									const onClick = attributes[attr] === alignment.value ? undefined : alignment.value;

									return (
										<Button
											key={alignIndex}
											isPressed={attributes[attr] === alignment.value}
											label={alignment.label}
											onClick={() => setAttributes({ [attr]: onClick })}
											icon={icons[`verticalAlign${ucfirst(alignment.value)}24`]}
										/>
									);
								}
								)}
							</ButtonGroup>
						</Fragment>
					);
				})}
			</Responsive>

			<Responsive
				label={
					<>
						<Icon icon={icons.hide} />
						{__('Hide', 'eightshift-frontend-libs')}
					</>
				}
			>
				{Object.keys(checkAttrResponsive('columnHide', attributes, manifest)).map(function(keyName) {

					const point = ucfirst(keyName);
					const attrOption = `${manifestBlockName}Hide`;
					const attr = `${attrOption}${point}`;

					return (
						<Fragment key={keyName}>
							<ToggleControl
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
