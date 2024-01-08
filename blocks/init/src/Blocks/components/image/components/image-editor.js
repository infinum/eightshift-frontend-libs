import React, { useMemo } from 'react';
import { MediaPlaceholder } from '@wordpress/block-editor';
import {
	isEmpty,
	selector,
	checkAttr,
	checkAttrResponsive,
	getAttrKey,
	outputCssVariables,
	getUnique,
	icons,
	classnames,
	getDefaultBreakpointNames,
} from '@eightshift/frontend-libs/scripts';
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
	const imageUrl = checkAttrResponsive('imageUrl', attributes, manifest);

	const pictureClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	const imgClass = classnames(
		selector(componentClass, componentClass, 'img'),
		selector(blockClass, blockClass, `${selectorClass}-img`),
	);

	if (!imageUse) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			{isEmpty(imageUrl['large']) &&
				<MediaPlaceholder
					icon={icons.image}
					onSelect={(value) => setAttributes({ [getAttrKey('imageUrl', attributes, manifest)]: value.url })}
					accept={imageAccept}
					allowedTypes={imageAllowedTypes}
				/>
			}

			{!isEmpty(imageUrl['large']) &&
				<picture className={pictureClass} data-id={unique}>
					{getDefaultBreakpointNames().reverse().map((breakpointName) => {
						if (breakpointName === 'large') {
							return (
								<img className={imgClass} src={imageUrl[breakpointName]} alt={imageAlt} key={breakpointName} />
							);
						}

						if (imageUrl?.[breakpointName]?.length < 1) {
							return null;
						}

						const breakpointWidth = globalManifest?.globalVariables?.breakpoints?.[breakpointName];

						if (!breakpointWidth) {
							return null;
						}

						return (
							<source srcSet={imageUrl[breakpointName]} media={`(max-width: ${breakpointWidth}px)`} key={breakpointName} />
						);
					})}
				</picture>
			}

		</>
	);
};
