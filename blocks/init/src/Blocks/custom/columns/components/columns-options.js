import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, Icon, RangeControl } from '@wordpress/components';
import { Responsive, HelpModal, icons, ucfirst, checkAttrResponsive } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ColumnsOptions = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
		attributes: manifestAttributes,
		options: manifestOptions,
	} = manifest;

	return (
		<PanelBody title={__('Columns Details', 'eightshift-frontend-libs')}>

			<HelpModal
				type="columns"
				buttonLabel={__('How to use columns?', 'eightshift-frontend-libs')}
				modalLabel={__('Columns', 'eightshift-frontend-libs')}
			/>

			<br /><br />

			<Responsive
				label={
					<>
						<Icon icon={icons.gutter} />
						{__('Gutter', 'eightshift-frontend-libs')}
					</>
				}
			>
				{Object.keys(checkAttrResponsive('columnsGutter', attributes, manifest)).map(function(keyName) {

					const point = ucfirst(keyName);
					const attrOption = `${manifestBlockName}Gutter`;
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
						<Icon icon={icons.verticalSpacing} />
						{__('Vertical Spacing', 'eightshift-frontend-libs')}
					</>
				}
			>
				{Object.keys(checkAttrResponsive('columnsVerticalSpacing', attributes, manifest)).map(function(keyName) {

					const point = ucfirst(keyName);
					const attrOption = `${manifestBlockName}VerticalSpacing`;
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

		</PanelBody>
	);
};
