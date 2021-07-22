import React from 'react';
import _ from 'lodash';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { ToggleControl, Button, SelectControl, BaseControl } from '@wordpress/components';
import { getOption, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		videoShowControls = true,

		videoUse = checkAttr('videoUse', attributes, manifest),

		videoUrl = checkAttr('videoUrl', attributes, manifest),
		videoPoster = checkAttr('videoPoster', attributes, manifest),
		videoAccept = checkAttr('videoAccept', attributes, manifest),
		videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest),
		videoLoop = checkAttr('videoLoop', attributes, manifest),
		videoAutoplay = checkAttr('videoAutoplay', attributes, manifest),
		videoControls = checkAttr('videoControls', attributes, manifest),
		videoMuted = checkAttr('videoMuted', attributes, manifest),
		videoPreload = checkAttr('videoPreload', attributes, manifest),

		showVideoUse = true,
		showVideoUrl = true,
		showVideoPoster = true,
		showVideoLoop = true,
		showVideoAdvanced = true,
		showVideoAutoplay = true,
		showVideoControls = true,
		showVideoMuted = true,
		showVideoPreload = true,
	} = attributes;

	if (!videoShowControls) {
		return null;
	}

	const [showAdvanced, setShowAdvanced] = useState(false);

	return (
		<>
			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showVideoUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={videoUse}
					onChange={(value) => setAttributes({ [getAttrKey('videoUse', attributes, manifest)]: value })}
				/>
			}

			{videoUse &&
				<>
					{showVideoUrl &&
						<BaseControl
							label={__('Video', 'eightshift-frontend-libs')}
						>
							{!_.isEmpty(videoUrl) ?
								<Button
									isSecondary
									isSmall
									className={'custom-full-width-btn'}
									onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
								>
									{__('Remove video', 'eightshift-frontend-libs')}
								</Button> :
								<MediaPlaceholder
									icon="format-video"
									onSelect={(value) => setAttributes({
											[getAttrKey('videoUrl', attributes, manifest)]: value.map((item) => {
												return {
													url: item.url,
													mime: typeof(item.mime) === 'undefined' ? item.mime_type : item.mime,
												}
											})
										})
									}
									accept={videoAccept}
									multiple={true}
									allowedTypes={videoAllowedTypes}
								/>
							}
						</BaseControl>
					}

					{showVideoPoster &&
						<BaseControl
							label={__('Video Poster', 'eightshift-frontend-libs')}
						>
							{!_.isEmpty(videoPoster) ?
								<>
									<img src={videoPoster} alt='' />
									<Button
										isSecondary
										isSmall
										className={'custom-full-width-btn'}
										onClick={() => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: {} })}
									>
										{__('Remove video poster', 'eightshift-frontend-libs')}
									</Button>
								</> :
								<MediaPlaceholder
									icon="format-video"
									onSelect={(value) => setAttributes({[getAttrKey('videoPoster', attributes, manifest)]: value.url})}
									accept={'image/*'}
									allowedTypes={["image"]}
								/>
							}
						</BaseControl>
					}

					<br />

					{showVideoAdvanced &&
						<ToggleControl
							label={__('Show advanced options', 'eightshift-frontend-libs')}
							checked={showAdvanced}
							onChange={() => setShowAdvanced(!showAdvanced)}
						/>
					}

					{showAdvanced &&
						<>
							{showVideoLoop &&
								<ToggleControl
									label={__('Play in loop', 'eightshift-frontend-libs')}
									checked={videoLoop}
									onChange={(value) => setAttributes({ [getAttrKey('videoLoop', attributes, manifest)]: value })}
								/>
							}

							{showVideoAutoplay &&
								<ToggleControl
									label={__('Autoplay', 'eightshift-frontend-libs')}
									checked={videoAutoplay}
									onChange={(value) => setAttributes({ [getAttrKey('videoAutoplay', attributes, manifest)]: value })}
								/>
							}

							{showVideoControls &&
								<ToggleControl
									label={__('Show controls', 'eightshift-frontend-libs')}
									checked={videoControls}
									onChange={(value) => setAttributes({ [getAttrKey('videoControls', attributes, manifest)]: value })}
								/>
							}

							{showVideoMuted &&
								<ToggleControl
									label={__('Play muted', 'eightshift-frontend-libs')}
									checked={videoMuted}
									onChange={(value) => setAttributes({ [getAttrKey('videoMuted', attributes, manifest)]: value })}
								/>
							}

							{showVideoPreload &&
								<SelectControl
									label={__('Preload type', 'eightshift-frontend-libs')}
									value={videoPreload}
									options={getOption('videoPreload', attributes, manifest)}
									onChange={(value) => setAttributes({ [getAttrKey('videoPreload', attributes, manifest)]: value })}
								/>
							}
						</>
					}

				</>
			}

		</>
	);
};
