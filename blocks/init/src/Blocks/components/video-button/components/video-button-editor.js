import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options } = manifest;

export const VideoButtonEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		videoButtonUse = checkAttr('videoButtonUse', attributes, manifest, componentName),

		videoButtonModalId = checkAttr('videoButtonModalId', attributes, manifest, componentName),
		videoButtonLabel = checkAttr('videoButtonLabel', attributes, manifest, componentName),
	} = attributes;

	const videoButtonClass = classnames(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	);

	return (
		<Fragment>
			{videoButtonUse &&
				<Fragment>
					{videoButtonModalId &&
						<button
							className={`${videoButtonClass}`}
							dangerouslySetInnerHTML={{ __html: options.icons }}
							aria-label={videoButtonLabel}
						></button>
					}
				</Fragment>
			}
		</Fragment>
	);
};
