import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, BaseControl, Placeholder, TextControl } from '@wordpress/components';
import { getOption, checkAttr, getAttrKey, IconLabel, icons, IconToggle, UseToggle, OptionSelector, Notification, SimpleRepeater, SimpleRepeaterItem, Section, Control, AnimatedContentVisibility, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		setAttributes,

		showVideoUrl = true,
		showVideoPoster = true,
		showVideoLoop = true,
		showVideoAutoplay = true,
		showVideoControls = true,
		showVideoMuted = true,
		showVideoPreload = true,
		showVideoCaptions = true,

		additionalControlsDesignLayout,
	} = attributes;

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
		return icons.emptyRect;
	};

	if (!hasVideo) {
		return (
			<UseToggle {...generateUseToggleConfig(attributes, manifest, 'videoUse')}>
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
			</UseToggle>
		);
	}

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'videoUse')}>
			<AnimatedContentVisibility showIf={videoAutoplay && !videoMuted && !videoControls}>
				<Notification
					type='warning'
					text={__('Video plays automatically, with sound, and without controls', 'eightshift-frontend-libs')}
					subtitle={__('This will bother most users and is an accessibility issue. Consider changing some of the options.', 'eightshift-frontend-libs')}
				/>
			</AnimatedContentVisibility>

			<AnimatedContentVisibility showIf={hasPoster && !videoControls}>
				<Notification
					type='warning'
					text={__('Video controls disabled', 'eightshift-frontend-libs')}
					subtitle={__('Poster image might prevent starting video playback.', 'eightshift-frontend-libs')}
				/>
			</AnimatedContentVisibility>

			<Control additionalClasses='es-display-flex es-content-center'>
				{videoUrl?.length > 0 &&
					<Button
						onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
						icon={icons.trash}
						className='es-button-icon-24 es-slight-button-border-cool-gray-100 es-hover-slight-button-border-red-500 es-hover-color-red-500 es-rounded-1 es-nested-color-red-500 es-v-center es-content-center! es-h-18 es-w-18 es-gap-1! es-p-1! es-nested-m-0!'
					>
						{__('Remove video', 'eightshift-frontend-libs')}
					</Button>
				}
			</Control>

			<Section showIf={showVideoLoop || showVideoMuted || showVideoAutoplay} icon={icons.playbackOptions} label={__('Playback options', 'eightshift-frontend-libs')} additionalClasses='es-h-spaced-wrap'>
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
						icon={icons.autoplayAlt}
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
			</Section>

			<Section showIf={showVideoControls || additionalControlsDesignLayout} icon={icons.design} label={__('Design & functionality', 'eightshift-frontend-libs')} additionalClasses='es-h-spaced-wrap'>
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
			</Section>

			<Section showIf={showVideoCaptions} icon={icons.a11y} label={__('Accessibility', 'eightshift-frontend-libs')}>
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

										<OptionSelector
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

										<span className='es-display-block es-mb-1'>{__('List of language tags', 'eightshift-frontend-libs')}</span>

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
			</Section>

			<Section
				showIf={showVideoPoster || showVideoPreload}
				icon={icons.tools}
				label={__('Advanced', 'eightshift-frontend-libs')}
				subtitle={__('Poster image, preloading', 'eightshift-frontend-libs')}
				noBottomSpacing
				collapsable
			>
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
								className='es-button-icon-24 es-slight-button-border-cool-gray-300 es-rounded-1 es-nested-color-red-500'
							>
								{__('Remove', 'eightshift-frontend-libs')}
							</Button>
						}
					</BaseControl>
				}

				{showVideoPreload &&
					<OptionSelector
						label={<IconLabel icon={icons.preload} label={__('Preload', 'eightshift-frontend-libs')} standalone />}
						value={videoPreload}
						options={getOption('videoPreload', attributes, manifest)}
						alignment='vertical'
						onChange={(value) => setAttributes({ [getAttrKey('videoPreload', attributes, manifest)]: value })}
						noBottomSpacing
					/>
				}
			</Section>
		</UseToggle >
	);
};
