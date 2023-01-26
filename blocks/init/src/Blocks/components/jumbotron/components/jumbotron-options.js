import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, generateUseToggleConfig, getAttrKey, MatrixAlignControl, props, UseToggle } from '@eightshift/frontend-libs/scripts';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';
import manifest from './../manifest.json';

export const JumbotronOptions = (attributes) => {
	const {
		setAttributes,
		hideContentPosition = false,
	} = attributes;

	const jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest);

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'jumbotronUse')}>
			{!hideContentPosition &&
				<MatrixAlignControl
					label={__('Content position', 'eightshift-frontend-libs')}
					value={jumbotronContentPosition}
					onChange={(value) => setAttributes({ [getAttrKey('jumbotronContentPosition', attributes, manifest)]: value })}
					type='tileButton'
					additionalTriggerClasses='es-mb-5'
				/>
			}

			<ImageOptions
				{...props('image', attributes)}
				reducedBottomSpacing
			/>

			<HeadingOptions
				{...props('heading', attributes)}
				reducedBottomSpacing
			/>

			<ParagraphOptions
				{...props('paragraph', attributes)}
				reducedBottomSpacing
			/>

			<ButtonOptions
				{...props('button', attributes)}
				noBottomSpacing
			/>
		</UseToggle>
	);
};
