import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { checkAttr, getAttrKey, props } from '@eightshift/frontend-libs/scripts';
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
	} = attributes;

	if (!jumbotronShowControls) {
		return null;
	}

	const jumbotronUse = checkAttr('jumbotronUse', attributes, manifest);

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={jumbotronUse}
				onChange={(value) => setAttributes({ [getAttrKey('jumbotronUse', attributes, manifest)]: value })}
			/>

			<hr />

			{jumbotronUse &&
				<>
					<ImageOptions
						{...props('image', attributes)}
					/>

					<hr />

					<HeadingOptions
						{...props('heading', attributes)}
					/>

					<hr />

					<ParagraphOptions
						{...props('paragraph', attributes)}
					/>

					<hr />

					<ButtonOptions
						{...props('button', attributes)}
					/>
				</>
			}

		</>
	);
};
