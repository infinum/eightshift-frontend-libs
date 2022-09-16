import React from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { selector, checkAttr, icons, getAttrKey } from '@eightshift/frontend-libs/scripts';
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

		showVideoUrl = false,
		showPlaceholder = true,
	} = attributes;

	const videoUse = checkAttr('videoUse', attributes, manifest);
	const videoUrl = checkAttr('videoUrl', attributes, manifest);
	const videoAccept = checkAttr('videoAccept', attributes, manifest);
	const videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest);

	const videoClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	if (!videoUse) {
		return null;
	}

	const hasVideo = videoUrl?.length > 0;

	return (
		<>
			{!hasVideo && showVideoUrl &&
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
						title: __('Video', 'eightshift-frontend-libs'),
						instructions: __('Upload a video file or pick one from your media library. You can select multiple video files to have fallbacks with different video formats.', 'eightshift-frontend-libs'),
					}}
					multiple
					accept={videoAccept}
					allowedTypes={videoAllowedTypes}
				/>
			}

			{!hasVideo && !showVideoUrl && showPlaceholder &&
				<Placeholder icon={icons.video} label={__('Add a video', 'eightshift-frontend-libs')}>
					{__('Check the block options in the sidebar', 'eightshift-frontend-libs')}
				</Placeholder>
			}

			{hasVideo &&
				<video className={videoClass} controls muted>
					{videoUrl.map(({ url, mime }) => <source key={url} src={url} type={mime} />)}
					<track kind='captions' />
				</video>
			}
		</>
	);
};
