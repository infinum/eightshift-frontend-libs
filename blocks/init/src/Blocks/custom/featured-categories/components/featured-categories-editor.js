import React from 'react';
import { ServerSideRender } from '@eightshift/frontend-libs/scripts';

export const FeaturedCategoriesEditor = ({ attributes }) => {
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
					featuredCategoriesServerSideRender: true,
				}
			}
		/>
	);
};
