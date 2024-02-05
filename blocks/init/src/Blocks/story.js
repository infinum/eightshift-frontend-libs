/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { __ } from '@wordpress/i18n';
import { jsx } from '@emotion/react';
import { ColorSwatch } from '@eightshift/frontend-libs/scripts';
import manifest from './manifest.json';

export default {
	title: 'Global',
};

export const colors = () => {
	return (
		<div className='es-v-spaced'>
			{manifest.globalVariables.colors.map(({ slug, name, color }) => (
				<div className='es-h-spaced es-pb-3 es-w-full' key={slug}>
					<ColorSwatch
						color={color ?? 'es-undefined'}
						additionalClasses='es-w-24 es-h-12 es-rounded-1.5!'
					/>

					<div className='es-v-spaced es-gap-1!'>
						<span className='es-text-3.5 es-font-weight-500 es-line-h-1!'>
							{name ?? __('Select a color', 'eightshift-frontend-libs')}
						</span>

						{color &&
							<span className='es-text-3 es-color-cool-gray-400 es-line-h-1'>{color}</span>
						}
					</div>
				</div>
			))}
		</div>
	);
};
