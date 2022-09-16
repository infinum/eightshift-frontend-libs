import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { icons, SpacingSlider } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ColumnsOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Columns', 'eightshift-frontend-libs')}>
			<SpacingSlider
				icon={icons.gutter}
				label={__('Column spacing', 'eightshift-frontend-libs')}
				attributeName='columnsColumnGap'
				attributes={attributes}
				setAttributes={setAttributes}
				manifest={manifest}
				markSteps={25}
				compensateForRemBase10
			/>

			<SpacingSlider
				icon={icons.verticalSpacing}
				label={__('Row spacing', 'eightshift-frontend-libs')}
				attributeName='columnsRowGap'
				attributes={attributes}
				setAttributes={setAttributes}
				manifest={manifest}
				markSteps={25}
				compensateForRemBase10
			/>
		</PanelBody>
	);
};
