import React from 'react';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, BaseControl, Placeholder } from '@wordpress/components';
import { getOption, checkAttr, getAttrKey, IconLabel, icons, ComponentUseToggle, IconToggle, SimpleVerticalSingleSelect } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		videoShowControls = true,

		showVideoUse = false,
		showLabel = false,
		showVideoUrl = true,
		showVideoPoster = true,
		showVideoLoop = true,
		showVideoAdvanced = true,
		showVideoAutoplay = true,
		showVideoControls = true,
		showVideoMuted = true,
		showVideoPreload = true,
		showVideoCaptions = true,
	} = attributes;

	const videoUse = checkAttr('videoUse', attributes, manifest);
	const videoUrl = checkAttr('videoUrl', attributes, manifest);
	const videoPoster = checkAttr('videoPoster', attributes, manifest);
	const videoAccept = checkAttr('videoAccept', attributes, manifest);
	const videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest);
	const videoLoop = checkAttr('videoLoop', attributes, manifest);
	const videoAutoplay = checkAttr('videoAutoplay', attributes, manifest);
	const videoControls = checkAttr('videoControls', attributes, manifest);
	const videoMuted = checkAttr('videoMuted', attributes, manifest);
	const videoPreload = checkAttr('videoPreload', attributes, manifest);
	const videoSubtitleTracks = checkAttr('videoSubtitleTracks', attributes, manifest);

	if (!videoShowControls) {
		return null;
	}

	const hasVideo = videoUrl?.length > 0;
	const hasPoster = videoPoster?.length > 0;

	const [showAdvanced, setShowAdvanced] = useState(false);

	const addCaptionItem = () => {
		const modifiedVideoSubtitleTracks = ([...videoSubtitleTracks, {
			src: '',
			kind: '',
			label: '',
			srclang: '',
		}]);

		setAttributes({
			[getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks
		});
	};
	const useToggle = (
		<ComponentUseToggle
			label={label}
			checked={videoUse}
			onChange={(value) => setAttributes({ [getAttrKey('videoUse', attributes, manifest)]: value })}
			showUseToggle={showVideoUse}
			showLabel={showLabel}
		/>
	);

	if (!videoUse) {
		return useToggle;
	}

	return (
		<>
			{useToggle}

			{!showVideoUrl && hasVideo &&
				<>
					<Button
						isSecondary
						isDestructive
						onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
						icon={icons.trash}
					>
						{__('Remove video', 'eightshift-frontend-libs')}
					</Button>
					<hr />
				</>
			}

			{!showVideoUrl && !hasVideo &&
				<Placeholder
					icon={icons.help}
					label={__('No video... yet', 'eightshift-frontend-libs')}
				>
					{__('Add one in the Block editor', 'eightshift-frontend-libs')}
				</Placeholder>
			}

			{showVideoUrl &&
				<BaseControl
					label={
						<>
							<IconLabel icon={icons.video} label={__('Video', 'eightshift-frontend-libs')} />

							{hasVideo &&
								<Button
									isSecondary
									isSmall
									isDestructive
									className='es-small-square-icon-button'
									onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
									icon={icons.trash}
									label={__('Remove video', 'eightshift-frontend-libs')}
								/>
							}
						</>
					}
				>
					{!hasVideo &&
						<MediaPlaceholder
							icon={icons.videoFile}
							onSelect={(value) => setAttributes({
								[getAttrKey('videoUrl', attributes, manifest)]: value.map(({ url, mime, mime_type }) => {
									return {
										url,
										mime: typeof (mime) === 'undefined' ? mime_type : mime,
									};
								})
							})
							}
							labels={{ title: __('Add a video', 'eightshift-frontend-libs') }}
							accept={videoAccept}
							allowedTypes={videoAllowedTypes}
							multiple
						/>
					}

					{hasVideo &&
						<Placeholder
							icon={icons.checkCircle}
							label={__('Video added', 'eightshift-frontend-libs')}
						>
							{__('Check the Block editor', 'eightshift-frontend-libs')}
						</Placeholder>
					}

				</BaseControl>
			}

			{showVideoPoster && hasVideo &&
				<BaseControl
					label={
						<>
							<IconLabel icon={icons.videoPosterImage} label={__('Poster image', 'eightshift-frontend-libs')} />

							{hasPoster &&
								<Button
									isSecondary
									isSmall
									isDestructive
									className='es-small-square-icon-button'
									onClick={() => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: {} })}
									icon={icons.trash}
									label={__('Remove video poster image', 'eightshift-frontend-libs')}
								/>
							}
						</>
					}
					help={__('Visible before the video is played. Make sure to enable the video controls so the video can be started!', 'eightshift-frontend-libs')}
				>
					{!hasPoster &&
						<MediaPlaceholder
							labels={{ title: __('Add an image', 'eightshift-frontend-libs') }}
							icon={icons.imageFile}
							onSelect={(value) => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: value.url })}
							accept={'image/*'}
							allowedTypes={['image']}
						/>
					}

					{hasPoster &&
						<img src={videoPoster} alt='Video poster' className='es-ratio-sixteen-nine es-rounded-4' />
					}
				</BaseControl>
			}

			<br />

			{showVideoAdvanced && hasVideo &&
				<div className='es-flex-between'>
					<IconLabel icon={icons.options} label={__('Advanced settings', 'eightshift-frontend-libs')} standalone />
					<Button
						onClick={() => setShowAdvanced(!showAdvanced)}
						label={showAdvanced ? __('Hide', 'eightshift-frontend-libs') : __('Show', 'eightshift-frontend-libs')}
						icon={showAdvanced ? icons.chevronUp : icons.chevronDown}
						iconSize={24}
						isSecondary
					/>
				</div>
			}

			{showAdvanced && hasVideo &&
				<>
					<br />

					{showVideoLoop &&
						<IconToggle
							icon={icons.loopMode}
							label={__('Loop', 'eightshift-frontend-libs')}
							checked={videoLoop}
							onChange={(value) => setAttributes({ [getAttrKey('videoLoop', attributes, manifest)]: value })}
						/>
					}

					{showVideoAutoplay &&
						<IconToggle
							icon={icons.autoplay}
							label={__('Autoplay', 'eightshift-frontend-libs')}
							checked={videoAutoplay}
							onChange={(value) => setAttributes({ [getAttrKey('videoAutoplay', attributes, manifest)]: value })}
						/>
					}

					{showVideoControls &&
						<IconToggle
							icon={icons.videoControls}
							label={__('Video controls', 'eightshift-frontend-libs')}
							checked={videoControls}
							onChange={(value) => setAttributes({ [getAttrKey('videoControls', attributes, manifest)]: value })}
						/>
					}

					{showVideoMuted &&
						<IconToggle
							icon={icons.muteCentered}
							label={__('No sound', 'eightshift-frontend-libs')}
							checked={videoMuted}
							onChange={(value) => setAttributes({ [getAttrKey('videoMuted', attributes, manifest)]: value })}
						/>
					}

					{showVideoPreload && <br />}

					{showVideoPreload &&
						<SimpleVerticalSingleSelect
							label={<IconLabel icon={icons.play} label={__('Preload type', 'eightshift-frontend-libs')} />}
							options={getOption('videoPreload', attributes, manifest).map(({ label, value, icon: iconName }) => {
								return {
									onClick: () => setAttributes({ [getAttrKey('videoPreload', attributes, manifest)]: value }),
									label,
									isActive: videoPreload === value,
									icon: icons[iconName],
								};
							})}
						/>
					}
				</>
			}
		</>
	);
};
