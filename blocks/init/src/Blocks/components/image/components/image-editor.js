import React from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { Placeholder } from '@wordpress/components';
import { image } from '@wordpress/icons';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ImageEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		imageUse = checkAttr('imageUse', attributes, manifest, componentName),

		imageUrl = checkAttr('imageUrl', attributes, manifest, componentName),
		imageAlt = checkAttr('imageAlt', attributes, manifest, componentName),
		imageAccept = checkAttr('imageAccept', attributes, manifest, componentName),
		imageAllowedTypes = checkAttr('imageAllowedTypes', attributes, manifest, componentName),
		imageBg = checkAttr('imageBg', attributes, manifest, componentName),
		imageUsePlaceholder = checkAttr('imageBg', attributes, manifest, componentName),
		imageAlign = checkAttr('imageAlign', attributes, manifest, componentName),
	} = attributes;

	const imageWrapClass = classnames([
		selector(componentClass, `${componentClass}-wrap`),
		selector(blockClass, blockClass, `${selectorClass}-wrap`),
	]);

	const imageClass = classnames([
		componentClass,
		selector(imageBg, componentClass, '', 'bg'),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{imageUse &&
				<>
					<div className={imageWrapClass} data-align={imageAlign}>
						{(imageUrl !== '') &&
							<>
								{imageBg ?
									<div className={imageClass} style={{ backgroundImage: `url(${imageUrl})` }} /> :
									<img className={imageClass} src={imageUrl} alt={imageAlt} />
								}
							</>
						}

						{(imageUrl === '') &&
							<>
								{(!imageUsePlaceholder) ?
									<MediaPlaceholder
										icon="format-image"
										onSelect={(value) => {
											setAttributes({
												[`${componentName}Url`]: value.url,
												[`${componentName}Alt`]: value.alt
											});
										}}
										accept={imageAccept}
										allowedTypes={imageAllowedTypes}
									/> :
									<Placeholder icon={image} label={__('Please add image using sidebar options!', 'eightshift-frontend-libs')} />
								}
							</>
						}
					</div>
				</>
			}
		</>
	);
};

