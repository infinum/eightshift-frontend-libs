import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';

export const JumbotronEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
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
		<Fragment>
			{jumbotronUse &&
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
			}
		</Fragment>
	);
};
