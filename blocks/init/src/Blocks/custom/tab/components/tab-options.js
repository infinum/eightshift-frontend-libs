import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TextControl} from '@wordpress/components';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';

import manifest from './../manifest.json';

export const TabOptions = ({ attributes, setAttributes }) => {

	const tabTitle = checkAttr('tabTitle', attributes, manifest);

	return (
		<PanelBody title={__('Tab Settings', 'testing-theme')}>

			<Fragment>
				<TextControl
					label={__('Tab Title', 'testing-theme')}
					value={tabTitle}
					onChange={(value) => setAttributes({ [getAttrKey('tabTitle', attributes, manifest)]: value })}
				/>

			</Fragment>
			

		</PanelBody>
	);
};
