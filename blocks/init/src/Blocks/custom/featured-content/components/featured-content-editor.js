import React from 'react';
import { __ } from '@wordpress/i18n';
import { ServerSideRender, props, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const FeaturedContentEditor = ({ attributes, setAttributes }) => {
	const {
		blockFullName,
	} = attributes;

	const {
		attributesSsr,
	} = manifest;

	const featuredContentServerSideRender = checkAttr('featuredContentServerSideRender', attributes, manifest);

	// Remove unnecessary attributes from ssr.
	const newAttributes = Object.entries(attributes).reduce((output, [key, value]) => {
		if (attributesSsr.includes(key)) {
				output[key] = value;
		}

		return output;

		}, {
				featuredContentServerSideRender: true,
		});

	return (
		<ServerSideRender
			block={blockFullName}
			attributes={newAttributes}
		/>
	);
};
