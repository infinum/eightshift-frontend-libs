import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import globalSettings from '../../../manifest.json';
import block from '../manifest.json';

export const FeaturedCategoriesEditor = ({ attributes }) => {
	return (
		<ServerSideRender
			block={`${globalSettings.namespace}/${block.blockName}`}
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
