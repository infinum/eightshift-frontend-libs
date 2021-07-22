import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const VideoButtonEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const videoButtonUse = checkAttr('videoButtonUse', attributes, manifest);
	const videoButtonModalId = checkAttr('videoButtonModalId', attributes, manifest);
	const videoButtonLabel = checkAttr('videoButtonLabel', attributes, manifest);

	const videoButtonClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	return (
		<>
			{videoButtonUse &&
				<>
					{videoButtonModalId &&
						<button
							className={`${videoButtonClass}`}
							dangerouslySetInnerHTML={{ __html: manifest.icon }}
							aria-label={videoButtonLabel}
						></button>
					}
				</>
			}
		</>
	);
};
