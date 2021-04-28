import React from 'react';
import _ from 'lodash';
import { MediaPlaceholder } from '@wordpress/block-editor';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ImageEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		imageUse = checkAttr('imageUse', attributes, manifest, componentName),
		imageAlt = checkAttr('imageAlt', attributes, manifest, componentName),
		imageAccept = checkAttr('imageAccept', attributes, manifest, componentName),
		imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest, componentName),
		imageUrl = checkAttr('imageUrl', attributes, manifest, componentName),
		imageFull = checkAttr('imageFull', attributes, manifest, componentName),
	} = attributes;

	const pictureClass = classnames([
		selector(componentClass, componentClass),
		selector(imageFull, componentClass, '', 'full'),
		selector(blockClass, blockClass, `${selectorClass}-picture`),
	]);

	const imgClass = classnames([
		selector(componentClass, componentClass, 'img'),
		selector(blockClass, blockClass, `${selectorClass}-img`),
	]);

	return (
		<>
			{imageUse &&
				<>
					{_.isEmpty(imageUrl) ?
						<MediaPlaceholder
							icon="format-image"
							onSelect={(value) => setAttributes({
								[`${componentName}Url`]: {
									id: value.id,
									url: value.url,
								}
							})}
							accept={imageAccept}
							allowedTypes={imageAllowedTypes}
						/> :
						<picture className={pictureClass}>
							<img className={imgClass} src={imageUrl.url} alt={imageAlt} />
						</picture>
					}
				</>
			}
		</>
	);
};

