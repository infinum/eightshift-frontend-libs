import React, { useMemo } from 'react';
import _ from 'lodash';
import { MediaPlaceholder } from '@wordpress/block-editor';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ImageEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

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
	} = attributes;

	const imageUse = checkAttr('imageUse', attributes, manifest);
	const imageAlt = checkAttr('imageAlt', attributes, manifest);
	const imageAccept = checkAttr('imageAccept', attributes, manifest);
	const imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest);
	const imageUrl = checkAttr('imageUrl', attributes, manifest);

	const pictureClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
	]);

	const imgClass = classnames([
		selector(componentClass, componentClass, 'img'),
		selector(blockClass, blockClass, `${selectorClass}-img`),
	]);

	return (
		<>
			{imageUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}

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
						<picture className={pictureClass} data-id={unique}>
							<img className={imgClass} src={imageUrl.url} alt={imageAlt} />
						</picture>
					}
				</>
			}
		</>
	);
};

