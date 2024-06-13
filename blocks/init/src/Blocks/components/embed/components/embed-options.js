import React from 'react';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import {
	UseToggle,
	checkAttr,
	getAttrKey,
	Notification,
	icons,
	Section
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const EmbedOptions = (attributes) => {
	const { title: manifestTitle } = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		embedShowControls = true,
		showEmbedUse = true,
		showEmbedUrl = true,
		showEmbedTitle = true,
		showEmbedAdvanced = true,
		showEmbedAutoplay = true,
		showEmbedEncryptedMedia = true,
		showEmbedPictureInPicture = true,
		showEmbedAllowFullScreen = true,
	} = attributes;

	if (!embedShowControls) {
		return null;
	}

	const embedUse = checkAttr('embedUse', attributes, manifest);
	const embedUrl = checkAttr('embedUrl', attributes, manifest);
	const embedTitle = checkAttr('embedTitle', attributes, manifest);
	const embedAutoplay = checkAttr('embedAutoplay', attributes, manifest);
	const embedEncryptedMedia = checkAttr('embedEncryptedMedia', attributes, manifest);
	const embedPictureInPicture = checkAttr('embedPictureInPicture', attributes, manifest);
	const embedAllowFullScreen = checkAttr('embedAllowFullScreen', attributes, manifest);

	return (
		<UseToggle
			label={label}
			checked={embedUse}
			onChange={(value) => setAttributes({ [getAttrKey('embedUse', attributes, manifest)]: value })}
			noUseToggle={!showEmbedUse}
			noLabel={!label}
		>
			{embedUse && (
				<>
					{showEmbedUrl && (
						<>
							<TextControl
								label={__('URL', '%g_textdomain%')}
								value={embedUrl}
								onChange={(value) => setAttributes({ [getAttrKey('embedUrl', attributes, manifest)]: value })}
								help={__('Video link format ex: https://www.youtube.com/embed/VIDEO_ID', '%g_textdomain%')}
							/>
							<Notification
								type="warning"
								text={__('Please pay attention so everything is GDPR compliant', '%g_textdomain%')}
								iconOverride={icons.a11yWarning}
								noBottomSpacing
							/>
						</>
					)}

					{showEmbedTitle && (
						<TextControl
							label={__('Title', '%g_textdomain%')}
							value={embedTitle}
							onChange={(value) => setAttributes({ [getAttrKey('embedTitle', attributes, manifest)]: value })}
							help={__('Not visible, used for improving accessibility', '%g_textdomain%')}
						/>
					)}

					<br />

					{showEmbedAdvanced && (
						<Section
							icon={icons.plusCircleFillAlt}
							label={__('Advanced options', '%g_textdomain%')}
							collapsable
							reducedBottomSpacing
						>
							{showEmbedAutoplay && (
								<UseToggle
									label={__('Autoplay', '%g_textdomain%')}
									checked={embedAutoplay}
									onChange={(value) => setAttributes({ [getAttrKey('embedAutoplay', attributes, manifest)]: value })}
								/>
							)}

							{showEmbedEncryptedMedia && (
								<UseToggle
									label={__('Encrypted Media', '%g_textdomain%')}
									checked={embedEncryptedMedia}
									onChange={(value) => setAttributes({ [getAttrKey('embedEncryptedMedia', attributes, manifest)]: value })}
								/>
							)}

							{showEmbedPictureInPicture && (
								<UseToggle
									label={__('Picture in picture', '%g_textdomain%')}
									checked={embedPictureInPicture}
									onChange={(value) => setAttributes({ [getAttrKey('embedPictureInPicture', attributes, manifest)]: value })}
								/>
							)}

							{showEmbedAllowFullScreen && (
								<UseToggle
									label={__('Allow full screen', '%g_textdomain%')}
									checked={embedAllowFullScreen}
									onChange={(value) => setAttributes({ [getAttrKey('embedAllowFullScreen', attributes, manifest)]: value })}
								/>
							)}
						</Section>
					)}
				</>
			)}
		</UseToggle>
	);
};
