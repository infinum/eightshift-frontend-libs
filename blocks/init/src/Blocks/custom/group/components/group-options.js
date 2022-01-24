import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, RangeControl } from '@wordpress/components';
import {
	Responsive,
	icons,
	ucfirst,
	IconLabel,
	checkAttrResponsive,
	getAttrKey,
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';
import globalManifest from '../../../manifest.json';

export const GroupOptions = ({ attributes, setAttributes }) => {
	const {
		globalVariables: {
			gutters,
		}
	} = globalManifest;

	return (
		<PanelBody title={__('Group', 'eightshift-frontend-libs')}>
			<Responsive label={<IconLabel icon={icons.width} label={__('Gutter', 'eightshift-frontend-libs')} />}>
				{Object.keys(checkAttrResponsive('groupGutter', attributes, manifest)).map(function (keyName) {

					const point = ucfirst(keyName);
					const attrOption = 'groupGutter';
					const attrOptionPoint = `${attrOption}${point}`;
					const attr = getAttrKey(attrOptionPoint, attributes, manifest);

					return (
						<Fragment key={keyName}>
							<RangeControl
								label={point}
								allowReset={true}
								value={attributes[attr]}
								onChange={(value) => setAttributes({ [attr]: value })}
								min={gutters.min}
								max={gutters.max}
								trackColor="green"
								step={gutters.step}
								resetFallbackValue={undefined}
							/>
						</Fragment>
					);
				})}
			</Responsive>
		</PanelBody>
	);
};
