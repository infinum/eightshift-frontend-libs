import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import globalSettings from '../../../manifest.json';
import manifest from '../manifest.json';

export const FeaturedCategoriesEditor = ({ attributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<ServerSideRender
			block={`${globalSettings.namespace}/${manifestBlockName}`}
			attributes={
				{
					...attributes,
					wrapperUse: false,
					serverSideRender: true,
				}
			}
		/>
	);
};
