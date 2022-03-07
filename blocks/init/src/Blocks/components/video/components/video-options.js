import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, BaseControl, Placeholder, ExternalLink, TextControl, Popover } from '@wordpress/components';
import { getOption, checkAttr, getAttrKey, IconLabel, icons, ComponentUseToggle, IconToggle, SimpleVerticalSingleSelect, FancyDivider, CustomSelect, CustomSelectCustomOption, CustomSelectCustomValueDisplay } from '@eightshift/frontend-libs/scripts';
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

	const [trackEditOpen, setTrackEditOpen] = useState({});

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

			{showVideoCaptions && hasVideo &&
				<>
					<FancyDivider label={__('Captions', 'eightshift-frontend-libs')} />

					<div className='es-v-spaced'>
						{videoSubtitleTracks.map((_, index) => {
							const trackIcon = getTrackIcon(videoSubtitleTracks[index].kind);

							return (
								<div className='onefr-auto' key={index}>

									<Button onClick={() => setTrackEditOpen({...trackEditOpen, [index]: true})} icon={trackIcon}>
										{videoSubtitleTracks[index].label.length > 0 ? videoSubtitleTracks[index].label : __('New caption track', 'eightshift-frontend-libs')}
									</Button>

									{trackEditOpen[index] === true &&

										<Popover onClose={() => setTrackEditOpen({...trackEditOpen, [index]: false})} noArrow={false} position='middle right'>

											<div className='es-popover-content'>
												{!videoSubtitleTracks[index].src &&
													<MediaPlaceholder
														accept={['.vtt', 'text/vtt']}
														labels = {{
															title: __('Track file', 'eightshift-frontend-libs'),
														}}
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
														<b>{sprintf(__('Track #%d', 'eightshift-frontend-libs'), index + 1)}</b>

														<hr />

														<ExternalLink href={videoSubtitleTracks[index].src}>
															{__('Open track file', 'eightshift-frontend-libs')}
														</ExternalLink>

														<TextControl
															label={__('Track label', 'eightshift-frontend-libs')}
															help={__('A user-readable title of the text track, shown to viewers when listing available text tracks', 'eightshift-frontend-libs')}
															value={videoSubtitleTracks[index].label}
															onChange={(label) => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks[index].label = label;
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
														/>

														<CustomSelect
															label={__('Track type', 'eightshift-frontend-libs')}
															value={videoSubtitleTracks[index].kind}
															options={getOption('videoSubtitleTrackKind', attributes, manifest)}
															simpleValue={true}
															onChange={(kind) => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks[index].kind = kind;
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
															customOptionComponent = { props => {
																return (
																	<CustomSelectCustomOption {...props}>
																		<span className='es-h-start'>{getTrackIcon(props.value)} {props.label}</span>
																	</CustomSelectCustomOption>
																);
															}}
															customSingleValueDisplayComponent = { props => {
																return (
																	<CustomSelectCustomValueDisplay {...props}>
																		<span className='es-h-start'>{getTrackIcon(props.children.toLowerCase())} {props.children}</span>
																	</CustomSelectCustomValueDisplay>
																);
															}}
														/>

														<TextControl
															label={__('Language code', 'eightshift-frontend-libs')}
															help={__('An IETF (BCP47) language tag for the language of the track text data. Only required for subtitles.', 'eightshift-frontend-libs')}
															value={videoSubtitleTracks[index].srclang}
															onChange={(srclang) => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks[index].srclang = srclang;
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
														/>

														<ExternalLink href={'https://en.wikipedia.org/wiki/IETF_language_tag#List_of_major_primary_language_subtags'}>
															{__('Language tags for major languages', 'eightshift-frontend-libs')}
														</ExternalLink>

														<br />

														<ExternalLink href={'https://r12a.github.io/app-subtags/'}>
															{__('Language tags for all languages', 'eightshift-frontend-libs')}
														</ExternalLink>

														<hr />

														<Button
															isDestructive
															isSecondary
															onClick={() => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks.splice(index, 1);
																setTrackEditOpen({...trackEditOpen, [index]: false});
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
															icon={icons.trash}
														>
															{__('Remove track', 'eightshift-frontend-libs')}
														</Button>

													</>
												}
											</div>
										</Popover>
									}
								</div>
							);
						})}
					</div>
					<Button
						isPrimary
						icon={icons.add}
						onClick={addCaptionItem}
					>
						{__('Add track', 'eightshift-frontend-libs')}
					</Button>
				</>
			}
		</>
	);
};
