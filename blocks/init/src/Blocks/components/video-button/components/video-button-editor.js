import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selectorB, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options } = manifest;

export const VideoButtonEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		videoButtonUse = checkAttr('videoButtonUse', attributes, manifest),

		videoButtonModalId = checkAttr('videoButtonModalId', attributes, manifest),
		videoButtonLabel = checkAttr('videoButtonLabel', attributes, manifest),
	} = attributes;

	const videoButtonClass = classnames(
		componentClass,
		selectorB(blockClass, selectorClass),
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
