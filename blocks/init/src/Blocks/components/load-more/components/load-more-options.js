import React from 'react';
import { props, getOptions, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';
import { ButtonOptions } from '../../button/components/button-options';

export const LoadMoreOptions = (attributes) => {
	return (
		<ButtonOptions
			hideId
			hideUrl
			label={attributes?.label ?? manifest.title}
			{...props('button', attributes, { options: getOptions(attributes, manifest) })}
			{...generateUseToggleConfig(attributes, manifest, 'loadMoreUse')}
		/>
	);
};
