import React from 'react';
import { ServerSideRender, props } from '@eightshift/frontend-libs/scripts';
import { LoadMoreEditor } from './../../../components/load-more/components/load-more-editor';

export const FeaturedContentEditor = ({ attributes, setAttributes }) => {
	const {
		blockFullName,
	} = attributes;

	return (
		<>
			<ServerSideRender
				block={blockFullName}
				attributes={{
					...attributes,
					featuredContentServerSideRender: true,
				}}
			/>
			<LoadMoreEditor
				{...props('load-more', attributes, {
					setAttributes,
				})}
			/>
		</>
	);
};
