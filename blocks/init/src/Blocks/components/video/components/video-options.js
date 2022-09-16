import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, BaseControl, Placeholder, TextControl } from '@wordpress/components';
import { getOption, checkAttr, getAttrKey, IconLabel, icons, Collapsable, IconToggle, CollapsableComponentUseToggle, SimpleHorizontalSingleSelect, InlineNotification, InlineNotificationType, FancyDivider, SimpleRepeater, SimpleRepeaterItem } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		videoShowControls = true,

		showVideoUse = true,
		showLabel = true,
		showVideoUrl = true,
		showVideoPoster = true,
		showVideoLoop = true,
		showVideoAutoplay = true,
		showVideoControls = true,
		showVideoMuted = true,
		showVideoPreload = true,
		showVideoCaptions = true,

		showExpanderButton = true,

		additionalControlsDesignLayout,
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

	const getTrackIcon = (kind) => {
		switch (kind) {
			case 'subtitles':
				return icons.videoSubtitle;
			case 'captions':
				return icons.closedCaptions;
			case 'descriptions':
				return icons.hide;
			case 'chapters':
				return icons.videoChapters;
		}
		return icons.warning;
	};

	const useToggleProps = {
		label: label,
		checked: videoUse,
		onChange: (value) => setAttributes({ [getAttrKey('videoUse', attributes, manifest)]: value }),
		showUseToggle: showVideoUse,
		showLabel: showLabel,
		showExpanderButton: showExpanderButton,
	};

	if (!hasVideo) {
		return (
			<CollapsableComponentUseToggle {...useToggleProps}>
				{!showVideoUrl &&
					<Placeholder
						icon={icons.help}
						label={__('No video... yet', 'eightshift-frontend-libs')}
					>
						{__('Add one in the Block editor', 'eightshift-frontend-libs')}
					</Placeholder>
				}

				{showVideoUrl &&
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
			</CollapsableComponentUseToggle>
		);
	}

	return (
		<CollapsableComponentUseToggle {...useToggleProps}>
			{videoAutoplay && !videoMuted && !videoControls &&
				<InlineNotification
					type={InlineNotificationType.WARNING}
					text={__('Video plays automatically, with sound, and without controls', 'eightshift-frontend-libs')}
					subtitle={__('This will bother most users and is an accessibility issue. Consider changing some of the options.', 'eightshift-frontend-libs')}
				/>
			}

			{hasPoster && !videoControls &&
				<InlineNotification
					type={InlineNotificationType.WARNING}
					text={__('Video controls disabled', 'eightshift-frontend-libs')}
					subtitle={__('Poster image might prevent starting video playback.', 'eightshift-frontend-libs')}
				/>
			}

			{!showVideoUrl &&
				<Button
					onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
					icon={icons.trash}
					className='es-button-icon-24 es-slight-button-border-cool-gray-300 es-rounded-1.0 es-nested-color-red-500 es-mb-5'
				>
					{__('Remove video', 'eightshift-frontend-libs')}
				</Button>
			}

			{showVideoUrl &&
				<div className='es-h-between es-mb-5'>
					<IconLabel icon={icons.videoFile} label={__('Video', 'eightshift-frontend-libs')} standalone />

					<Button
						onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
						icon={icons.trash}
						className='es-button-icon-24 es-slight-button-border-cool-gray-300 es-rounded-1.0 es-nested-color-red-500'
					>
						{__('Remove', 'eightshift-frontend-libs')}
					</Button>
				</div>

			}

			{(showVideoLoop || showVideoMuted || showVideoAutoplay) &&
				<BaseControl label={<IconLabel icon={icons.playbackOptions} label={__('Playback options', 'eightshift-frontend-libs')} />}>
					<div className='es-h-spaced-wrap'>
						{showVideoLoop &&
							<IconToggle
								icon={icons.loopMode}
								label={__('Loop', 'eightshift-frontend-libs')}
								checked={videoLoop}
								onChange={(value) => setAttributes({ [getAttrKey('videoLoop', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}

						{showVideoAutoplay &&
							<IconToggle
								icon={icons.autoplay}
								label={__('Autoplay', 'eightshift-frontend-libs')}
								checked={videoAutoplay}
								onChange={(value) => setAttributes({ [getAttrKey('videoAutoplay', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}

						{showVideoMuted &&
							<IconToggle
								icon={icons.muteCentered}
								label={__('Mute', 'eightshift-frontend-libs')}
								checked={videoMuted}
								onChange={(value) => setAttributes({ [getAttrKey('videoMuted', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}
					</div>
				</BaseControl>
			}

			{(showVideoControls || additionalControlsDesignLayout) &&
				<BaseControl label={<IconLabel icon={icons.design} label={__('Design & functionality', 'eightshift-frontend-libs')} />}>
					<div className='es-h-spaced-wrap'>
						{showVideoControls &&
							<IconToggle
								icon={icons.videoControls}
								label={__('Playback controls', 'eightshift-frontend-libs')}
								checked={videoControls}
								onChange={(value) => setAttributes({ [getAttrKey('videoControls', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}

						{additionalControlsDesignLayout}
					</div>
				</BaseControl>
			}

			<Collapsable label={<IconLabel icon={icons.tools} label={__('Advanced', 'eightshift-frontend-libs')} subtitle={__('Poster image, preloading', 'eightshift-frontend-libs')} standalone />}>
				{showVideoPoster &&
					<BaseControl
						label={<IconLabel icon={icons.videoPosterImage} label={__('Poster image', 'eightshift-frontend-libs')} subtitle={__('Visible before the video is played', 'eightshift-frontend-libs')} addSubtitleGap standalone />}
						className='es-image-preview'
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
							<img src={videoPoster} alt='Video poster' />
						}

						{hasPoster &&
							<Button
								onClick={() => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: {} })}
								icon={icons.trash}
								className='es-button-icon-24 es-slight-button-border-cool-gray-300 es-rounded-1.0 es-nested-color-red-500'
							>
								{__('Remove', 'eightshift-frontend-libs')}
							</Button>
						}
					</BaseControl>
				}

				{showVideoPreload &&
					<SimpleHorizontalSingleSelect
						label={<IconLabel icon={icons.preload} label={__('Preload', 'eightshift-frontend-libs')} />}
						value={videoPreload}
						options={getOption('videoPreload', attributes, manifest)}
						border='offset'
						alignment='vertical'
						onChange={(value) => setAttributes({ [getAttrKey('videoPreload', attributes, manifest)]: value })}
					/>
				}
			</Collapsable>

			{showVideoCaptions &&
				<>
					<FancyDivider label={<IconLabel icon={icons.a11y} label={__('Accessibility', 'eightshift-frontend-libs')} />} additionalClasses='es-mt-6! es-mb-0!' />

					<SimpleRepeater
						icon={icons.videoSubtitleAlt}
						label={__('Captions', 'eightshift-frontend-libs')}

						items={videoSubtitleTracks}
						attributeName={getAttrKey('videoSubtitleTracks', attributes, manifest)}
						setAttributes={setAttributes}
					>
						{videoSubtitleTracks.map((item, index) => {
							return (
								<SimpleRepeaterItem
									key={item.id}
									icon={getTrackIcon(item?.kind)}
									title={item?.label ? sprintf(__('Track %d', 'eightshift-frontend-libs'), index + 1) : <i>{__('New track', 'eightshift-frontend-libs')}</i>}
									subtitle={item?.label}
									additionalLabelClass={!item?.label ? 'es-nested-color-orange-500!' : ''}
								>
									{!videoSubtitleTracks[index].src &&
										<MediaPlaceholder
											accept={['.vtt', 'text/vtt']}
											labels={{ title: __('Track file', 'eightshift-frontend-libs') }}
											onSelect={
												(track) => {
													const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
													modifiedVideoSubtitleTracks[index].src = track.url;
													setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
												}
											}
										>
											{__('Upload a VTT file containing captions, subtitles, descriptions or chapters for this video', 'eightshift-frontend-libs')}
										</MediaPlaceholder>
									}

									{videoSubtitleTracks[index].src &&
										<>
											<TextControl
												label={<IconLabel icon={icons.titleGeneric} label={__('Label', 'eightshift-frontend-libs')} />}
												help={__('Shows in the list of available tracks', 'eightshift-frontend-libs')}
												value={videoSubtitleTracks[index].label}
												onChange={(label) => {
													const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
													modifiedVideoSubtitleTracks[index].label = label;
													setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
												}}
											/>

											<SimpleHorizontalSingleSelect
												label={<IconLabel icon={icons.optionListAlt} label={__('Type', 'eightshift-frontend-libs')} />}
												value={videoSubtitleTracks[index].kind}
												options={getOption('videoSubtitleTrackKind', attributes, manifest)}
												onChange={(kind) => {
													const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
													modifiedVideoSubtitleTracks[index].kind = kind;
													setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
												}}
												alignment='vertical'
												border='offset'
											/>

											<TextControl
												label={<IconLabel icon={icons.flag} label={__('Language code', 'eightshift-frontend-libs')} />}
												help={
													<>
														{__('Should follow IETF (BCP47).', 'eightshift-frontend-libs')}
														{videoSubtitleTracks[index].kind === 'subtitles' && ' ' + __('Required.', 'eightshift-frontend-libs')}
													</>
												}
												value={videoSubtitleTracks[index].srclang}
												onChange={(srclang) => {
													const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
													modifiedVideoSubtitleTracks[index].srclang = srclang;
													setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
												}}
											/>

											<hr className='es-mt-0!' />

											<span className='es-display-block es-mb-1.0'>{__('List of language tags', 'eightshift-frontend-libs')}</span>

											<Button
												href='https://en.wikipedia.org/wiki/IETF_language_tag#List_of_major_primary_language_subtags'
												target='_blank'
												rel='external'
												icon={icons.externalLink}
												className='es-button-icon-18 es-p-0! es-h-8! es-rounded-0.75!'
											>
												{__('Common languages', 'eightshift-frontend-libs')}
											</Button>

											<Button
												href='https://r12a.github.io/app-subtags/'
												target='_blank'
												rel='external'
												icon={icons.externalLink}
												className='es-button-icon-18 es-p-0! es-h-8! es-rounded-0.75!'
											>
												{__('All languages', 'eightshift-frontend-libs')}
											</Button>
										</>
									}
								</SimpleRepeaterItem>
							);
						})}
					</SimpleRepeater>
				</>
			}
		</CollapsableComponentUseToggle >
	);
};
