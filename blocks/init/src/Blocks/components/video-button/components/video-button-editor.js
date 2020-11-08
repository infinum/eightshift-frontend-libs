import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const VideoButtonEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		videoButtonUse = defaults.videoButtonUse.default,

		videoButtonModalId,
		videoButtonIcon = <svg width="106" height="106" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" strokeWidth="2" fill="none" fillRule="evenodd"><circle cx="53" cy="53" r="52" /><path d="M78.764 53L40 72.382V33.618L78.764 53z" /></g></svg>,
	} = attributes;

	const videoButtonClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{videoButtonUse &&
				<Fragment>
					{videoButtonModalId &&
						<button className={`${videoButtonClass}`}>
							{videoButtonIcon}
						</button>
					}
				</Fragment>
			}
		</Fragment>
	);
};
