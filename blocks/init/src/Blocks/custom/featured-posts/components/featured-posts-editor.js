import React from 'react';
import { ServerSideRender } from '@eightshift/frontend-libs/scripts/components';

export const FeaturedPostsEditor = ({ attributes }) => {
	const {
		blockFullName,
	} = attributes;

	return (
		<ServerSideRender
			block={blockFullName}
			attributes={
				{
					...attributes,
					wrapperUse: false,
					featuredPostsServerSideRender: true,
				}
			}
		/>
	);
};
