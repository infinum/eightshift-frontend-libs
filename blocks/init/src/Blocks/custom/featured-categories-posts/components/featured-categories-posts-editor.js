import React from 'react'; // eslint-disable-line no-unused-vars
import ServerSideRender from '@wordpress/server-side-render';
import globalSettings from '../../../manifest.json';
import block from '../manifest.json';

export const FeaturedCategoriesPostsEditor = ({ attributes }) => {
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
