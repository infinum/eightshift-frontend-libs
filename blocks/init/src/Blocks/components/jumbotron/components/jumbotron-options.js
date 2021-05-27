import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';
import manifest from './../manifest.json';

export const JumbotronOptions = (attributes) => {
	const {
		componentName: manifestComponentName,
		title: manifestTitle,
	} = manifest;


	const {
		setAttributes,
		componentName = manifestComponentName,
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
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			<hr />

			{jumbotronUse &&
				<>
					<ImageOptions
						{...props(attributes, 'image')}
						setAttributes={setAttributes}
					/>

					<hr />

					<HeadingOptions
						{...props(attributes, 'heading')}
						setAttributes={setAttributes}
					/>

					<hr />

					<ParagraphOptions
						{...props(attributes, 'paragraph')}
						setAttributes={setAttributes}
					/>

					<hr />

					<ButtonOptions
						{...props(attributes, 'button')}
						setAttributes={setAttributes}
					/>
				</>
			}

		</>
	);
};
