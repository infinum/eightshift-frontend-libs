import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';
import manifest from './../manifest.json';

const { title } = manifest;

export const JumbotronOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		jumbotronShowControls = true,

		jumbotronUse = checkAttr('jumbotronUse', attributes, manifest, componentName),
	} = attributes;

	if (!jumbotronShowControls) {
		return null;
	}

	return (
		<Fragment>

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
				<Fragment>
					<ImageOptions
						{...attributes}
						setAttributes={setAttributes}
						showImageBg={false}
						imageBg={true}
						imageUsePlaceholder={true}
						showImageLink={false}
					/>

					<hr />

					<HeadingOptions
						{...attributes}
						setAttributes={setAttributes}
					/>


					<hr />

					<ParagraphOptions
						{...attributes}
						setAttributes={setAttributes}
					/>

					<hr />

					<ButtonOptions
						{...attributes}
						setAttributes={setAttributes}
					/>
				</Fragment>
			}

		</Fragment>
	);
};
