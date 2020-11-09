import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { image } from '@wordpress/icons';
import { MediaPlaceholder } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const ImageEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		imageUse = defaults.imageUse.default,

		imageUrl,
		imageSize = defaults.imageSize.default,
		imageAlign = defaults.imageAlign.default,
		imageAccept = defaults.imageAccept.default,
		imageAllowedTypes = defaults.imageAllowedTypes.default,
		imageBg = defaults.imageBg.default,
		imageUsePlaceholder = defaults.imageUsePlaceholder.default,
	} = attributes;

	const imageClass = classnames(
		componentClass,
		imageBg && `${componentClass}--bg`,
	);

	const imageWrapClass = classnames(
		`${componentClass}__wrap`,
		imageAlign && `${componentClass}__align--${imageAlign}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{imageUse &&
				<Fragment>
					<div className={imageWrapClass}>
						{(imageUrl !== '') &&
							<Fragment>
								{imageBg ?
									<div className={imageClass} style={{ backgroundImage: `url(${imageUrl})` }} /> :
									<img className={imageClass} src={imageUrl} alt="" />
								}
							</Fragment>
						}

						{(imageUrl === '') &&
							<Fragment>
								{(!imageUsePlaceholder) ?
									<MediaPlaceholder
										icon="format-image"
										onSelect={(value) => setAttributes({ imageUrl: value.url })}
										accept={imageAccept}
										allowedTypes={imageAllowedTypes}
									/> :
									<Placeholder icon={image} label={__('Please add image using sidebar options!', 'eightshift-boilerplate')} />
								}
							</Fragment>
						}
					</div>
				</Fragment>
			}
		</Fragment>
	);
};

