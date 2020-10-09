import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';

export const ImageEditor = (props) => {
	const {
		media: {
			url,
			accept = 'image/*',
			allowedTypes = ['image'],
		},
		bgImg = false,
		usePlaceholder = false,
		componentClass = 'image',
		componentBgClass = 'image-bg',
		componentPlaceholderClass = 'image-placeholder',
		blockClass,
		onChangeMedia,
	} = props;

	console.log(props);

	const imageClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	const imageBgClass = classnames(
		componentBgClass,
		blockClass && `${blockClass}__${componentBgClass}`,
	);

	const placeholderClass = classnames(
		componentPlaceholderClass,
		blockClass && `${blockClass}__${componentPlaceholderClass}`,
	);

	return (
		<Fragment>
			{(url && !bgImg) &&
				<img className={imageClass} src={url} alt="" />
			}

			{(url && bgImg) &&
				<div className={imageBgClass} style={{ backgroundImage: `url(${url})` }} />
			}

			{(!url && bgImg) &&
				<div className={placeholderClass}></div>
			}

			{(!url && !usePlaceholder) &&
				<MediaPlaceholder
					icon="format-image"
					onSelect={onChangeMedia}
					accept={accept}
					allowedTypes={allowedTypes}
				/>
			}
		</Fragment>
	);
};

