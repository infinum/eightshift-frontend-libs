import React from 'react';
import { checkAttr, ComponentUseToggle, getAttrKey, props } from '@eightshift/frontend-libs/scripts';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';
import manifest from './../manifest.json';

export const JumbotronOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		jumbotronShowControls = true,
		showJumbotronUse = false,
		showLabel = false,
	} = attributes;

	if (!jumbotronShowControls) {
		return null;
	}

	const jumbotronUse = checkAttr('jumbotronUse', attributes, manifest);

	return (
		<>
			<ComponentUseToggle
				label={label}
				checked={jumbotronUse}
				onChange={(value) => setAttributes({ [getAttrKey('jumbotronUse', attributes, manifest)]: value })}
				showUseToggle={showJumbotronUse}
				showLabel={showLabel}
			/>

			{jumbotronUse &&
				<>
					<ImageOptions
						{...props('image', attributes)}
						showImageUse
						showLabel
					/>

					<HeadingOptions
						{...props('heading', attributes)}
						showHeadingUse
						showLabel
					/>

					<ParagraphOptions
						{...props('paragraph', attributes)}
						showParagraphUse
						showLabel
					/>

					<ButtonOptions
						{...props('button', attributes)}
						showButtonUse
						showLabel
					/>
				</>
			}

		</>
	);
};
