import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';

export const DrawerEditor = (props) => {
	const {
		blockClass,
		componentClass = 'drawer',
		drawerPosition = 'left',
		menu,
		trigger,
		overlay,
		use = true,
	} = props;

	const drawerClass = classnames(
		componentClass,
		`js-${componentClass}`,
		drawerPosition && `${componentClass}--${drawerPosition}`,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<div
					className={drawerClass}
					data-trigger={trigger}
					data-overlay={overlay}
				>
					{menu}
				</div>
			}
		</Fragment>
	);
};
