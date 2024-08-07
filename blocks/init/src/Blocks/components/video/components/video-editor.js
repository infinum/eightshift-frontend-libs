import React from 'react';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { selector, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
import { clsx } from '@eightshift/ui-components/utilities';
import manifest from '../manifest.json';

export const VideoEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
		setAttributes,

		showPlaceholderInsteadOfMediaPicker = false,
	} = attributes;

	const videoUse = checkAttr('videoUse', attributes, manifest);
	const videoUrl = checkAttr('videoUrl', attributes, manifest);
	const videoAccept = checkAttr('videoAccept', attributes, manifest);
	const videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest);

	const videoClass = clsx(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
		'es-position-relative',
	);

	if (!videoUse) {
		return null;
	}

	const hasVideo = videoUrl?.length > 0;

	return (
		<>
			{!hasVideo && !showPlaceholderInsteadOfMediaPicker &&
				<MediaPlaceholder
					icon={icons.video}
					onSelect={(value) => setAttributes({
						[getAttrKey('videoUrl', attributes, manifest)]: value.map(({ url, mime, mime_type }) => {
							return {
								url,
								mime: typeof (mime) === 'undefined' ? mime_type : mime,
							};
						})
					})
					}
					labels={{
						title: __('Video', '%g_textdomain%'),
						instructions: __('Upload a video file or pick one from your media library.', '%g_textdomain%'),
					}}
					multiple
					accept={videoAccept}
					allowedTypes={videoAllowedTypes}
				/>
			}

			{!hasVideo && showPlaceholderInsteadOfMediaPicker &&
				<Placeholder icon={icons.video} label={__('Add a video', '%g_textdomain%')}>
					{__('Check the block options', '%g_textdomain%')}
				</Placeholder>
			}

			{hasVideo &&
				<video className={videoClass} muted>
					{videoUrl.map(({ url, mime }) => <source key={url} src={url} type={mime} />)}
					<track kind='captions' />
				</video>
			}
		</>
	);
};
