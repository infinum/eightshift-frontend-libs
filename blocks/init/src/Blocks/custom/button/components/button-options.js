import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, props, OptionSelector, icons } from '@eightshift/frontend-libs/scripts';
import { ButtonOptions as ButtonOptionsComponent } from '../../../components/button/components/button-options';
import manifest from '../manifest.json';

export const ButtonOptions = ({ attributes, setAttributes }) => {
	const buttonAlign = checkAttr('buttonAlign', attributes, manifest);

	return (
		<PanelBody title={__('Button', '%g_textdomain%')}>
			<ButtonOptionsComponent
				{...props('button', attributes, { setAttributes })}

				additionalControls={
					<OptionSelector
						icon={icons.position3x3Empty}
						label={__('Alignment', '%g_textdomain%')}
						value={buttonAlign}
						options={getOption('buttonAlign', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey('buttonAlign', attributes, manifest)]: value })}
						inlineLabel
						iconOnly
					/>
				}
				noLabel
				noUseToggle
				noExpandButton
			/>
		</PanelBody>
	);
};
