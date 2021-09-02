import React from 'react';
import { props, getOptions } from '@eightshift/frontend-libs/scripts';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import manifest from './../manifest.json';

export const QuoteToolbar = (attributes) => {
	return (
		<HeadingToolbar
			{...props('heading', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	);
};
