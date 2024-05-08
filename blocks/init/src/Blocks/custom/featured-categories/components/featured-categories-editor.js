import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, Notification, ServerSideRender } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const FeaturedCategoriesEditor = ({ attributes }) => {
	const {
		blockFullName,
	} = attributes;

	const featuredCategoriesTaxonomy = checkAttr('featuredCategoriesTaxonomy', attributes, manifest);

	if (!featuredCategoriesTaxonomy) {
		return (
			<Notification
				type='info'
				text={__('No taxonomy selected', '%g_textdomain%')}
			/>
		);
	}

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
