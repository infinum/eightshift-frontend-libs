import React from 'react';
import classnames from 'classnames';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageEditor } from '../../../components/image/components/image-editor';
import { HeadingEditor } from '../../../components/heading/components/heading-editor';
import { ParagraphEditor } from '../../../components/paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../../components/button/components/button-editor';
import manifest from './../manifest.json';

export const JumbotronEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest, componentName),
	} = attributes;

	const jumbotronClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	const contentClass = classnames([
		`${componentClass}__content`,
	]);

	const contentWrapClass = classnames([
		`${componentClass}__content-wrap`,
	]);

	return (
		<div className={jumbotronClass}>

			<ImageEditor
				{...attributes}
				setAttributes={setAttributes}
				blockClass={componentClass}
				imageUsePlaceholder={true}
				imageBg={true}
			/>

			<div className={contentClass} data-position={jumbotronContentPosition}>
				<div className={contentWrapClass}>
					<HeadingEditor
						{...attributes}
						setAttributes={setAttributes}
						blockClass={componentClass}
					/>

					<ParagraphEditor
						{...attributes}
						setAttributes={setAttributes}
						blockClass={componentClass}
					/>

					<ButtonEditor
						{...attributes}
						setAttributes={setAttributes}
						blockClass={componentClass}
					/>
				</div>
			</div>

		</div>
	);
};
