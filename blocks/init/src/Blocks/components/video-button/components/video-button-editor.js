import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';

export const VideoButtonEditor = (props) => {
	const {
		blockClass,
		componentClass = 'video-button',
		modalId = '',
		icon = <svg className={`${componentClass}__icon`} width="106" height="106" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" strokeWidth="2" fill="none" fillRule="evenodd"><circle cx="53" cy="53" r="52" /><path d="M78.764 53L40 72.382V33.618L78.764 53z" /></g></svg>,
		use = true,
	} = props;

	const videoButtonClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<Fragment>
					{modalId &&
						<button className={`${videoButtonClass}`}>
							{icon}
						</button>
					}
				</Fragment>
			}
		</Fragment>
	);
};
