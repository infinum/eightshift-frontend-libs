import React from 'react';
import classnames from 'classnames';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';

export const JumbotronEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		jumbotronUse = checkAttr('jumbotronUse', attributes, manifest, componentName),

		jumbotronContentPosition = checkAttr('jumbotronContentPosition', attributes, manifest, componentName),
	} = attributes;

	const jumbotronClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	const contentClass = classnames([
		selector(componentClass, componentClass, 'content'),
	]);

	const contentWrapClass = classnames([
		selector(componentClass, componentClass, 'content-wrap'),
	]);

	return (
		<>
			{jumbotronUse &&
				<div className={jumbotronClass}>

					<ImageEditor
						{...props(attributes, 'image')}
						setAttributes={setAttributes}
						blockClass={componentClass}
					/>

					<div className={contentClass} data-position={jumbotronContentPosition}>
						<div className={contentWrapClass}>
							<HeadingEditor
								{...props(attributes, 'heading')}
								setAttributes={setAttributes}
								blockClass={componentClass}
							/>

							<ParagraphEditor
								{...props(attributes, 'paragraph')}
								setAttributes={setAttributes}
								blockClass={componentClass}
							/>

							<ButtonEditor
								{...props(attributes, 'button')}
								setAttributes={setAttributes}
								blockClass={componentClass}
							/>
						</div>
					</div>

				</div>
			}
		</>
	);
};
