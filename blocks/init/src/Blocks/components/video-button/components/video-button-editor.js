import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';

export const VideoButtonEditor = (props) => {
	const componentClass = 'video-button';

	const {
		modalId = '',
		icon = <svg className={`${componentClass}__icon`} width="106" height="106" xmlns="http://www.w3.org/2000/svg"><g stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd"><circle cx="53" cy="53" r="52" /><path d="M78.764 53L40 72.382V33.618L78.764 53z" /></g></svg>,
	} = props;

	return (
		<Fragment>
			{modalId &&
				<button className={`${componentClass}`}>
					{icon}
				</button>
			}
		</Fragment>
	);
};
