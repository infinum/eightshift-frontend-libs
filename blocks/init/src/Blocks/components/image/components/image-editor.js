import React, { useMemo } from 'react';
import _ from 'lodash';
import { MediaPlaceholder } from '@wordpress/block-editor';
import classnames from 'classnames';
import { selector, checkAttr, getAttrKey, outputCssVariables, getUnique, icons } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ImageEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const imageUse = checkAttr('imageUse', attributes, manifest);
	const imageAlt = checkAttr('imageAlt', attributes, manifest);
	const imageAccept = checkAttr('imageAccept', attributes, manifest);
	const imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest);
	const imageUrl = checkAttr('imageUrl', attributes, manifest);

	const pictureClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const imgClass = classnames([
		selector(componentClass, componentClass, 'img'),
		selector(blockClass, blockClass, `${selectorClass}-img`),
	]);

	if (!imageUse) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			{_.isEmpty(imageUrl) &&
				<MediaPlaceholder
					icon={icons.image}
					onSelect={(value) => setAttributes({ [getAttrKey('imageUrl', attributes, manifest)]: value.url })}
					accept={imageAccept}
					allowedTypes={imageAllowedTypes}
				/>
			}

			{!_.isEmpty(imageUrl) &&
				<picture className={pictureClass} data-id={unique}>
					<img className={imgClass} src={imageUrl} alt={imageAlt} />
				</picture>
			}

		</>
	);
};
