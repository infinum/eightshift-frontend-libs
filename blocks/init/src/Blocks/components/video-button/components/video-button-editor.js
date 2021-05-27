import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const VideoButtonEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
		options: manifestOptions,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		videoButtonUse = checkAttr('videoButtonUse', attributes, manifest),

		videoButtonModalId = checkAttr('videoButtonModalId', attributes, manifest),
		videoButtonLabel = checkAttr('videoButtonLabel', attributes, manifest),
	} = attributes;

	const options = {...manifestOptions, ...attributes.options};

	const videoButtonClass = classnames(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	);

	return (
		<>
			{videoButtonUse &&
				<>
					{videoButtonModalId &&
						<button
							className={`${videoButtonClass}`}
							dangerouslySetInnerHTML={{ __html: options.icons }}
							aria-label={videoButtonLabel}
						></button>
					}
				</>
			}
		</>
	);
};
