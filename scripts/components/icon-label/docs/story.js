import React from 'react';
import { IconLabel } from '../icon-label';
import { icons } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import readme from './readme.mdx';

export default {
	title: 'Options/IconLabel',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	return (
		<div>
			<h4>Regular label</h4>
			<IconLabel
				icon={icons.roundedCorners}
				label={__('Rounded corners', 'eightshift-frontend-libs')}
				standalone
			/>
			<br />

			<h4>With subtitle</h4>
			<IconLabel
				icon={icons.layoutAlt3}
				label={__('Layout', 'eightshift-frontend-libs')}
				subtitle='3 columns'
				standalone
			/>

			<h4>With subtitle and subtitle gap</h4>
			<IconLabel
				icon={icons.colorAlt}
				label={__('Color', 'eightshift-frontend-libs')}
				subtitle='Orange'
				standalone
				addSubtitleGap
			/>

			<br />
			<small><code>addSubtitleGap</code></small>
			<br />
			<br />
			<small><i>Useful in some complex layouts where default Gutenberg styles would make the gap too small</i></small>

			<h4>Additional classes</h4>
			<IconLabel
				icon={icons.colorAlt}
				label={__('Color', 'eightshift-frontend-libs')}
				subtitle='Blue'
				standalone
				additionalClasses='es-nested-color-blue-500!'
			/>
			<br />
			<small><code>additionalClasses=&apos;es-nested-color-blue-500!&apos;</code></small>

		</div>
	);
};
