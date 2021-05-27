import React, { useMemo } from 'react';
import classnames from 'classnames';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const JumbotronEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
	} = attributes;

	const jumbotronUse = checkAttr('jumbotronUse', attributes, manifest);

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
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}

					<div className={jumbotronClass} data-id={unique}>

						<ImageEditor
							{...props(attributes, 'image')}
							setAttributes={setAttributes}
							blockClass={componentClass}
						/>

						<div className={contentClass}>
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
				</>
			}
		</>
	);
};
