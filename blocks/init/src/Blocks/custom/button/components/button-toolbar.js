import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts';
import { ButtonToolbar as ButtonToolbarComponent } from '../../../components/button/components/button-toolbar';

export const ButtonToolbar = ({ attributes, setAttributes }) => {
	return (
		<>
			<ButtonToolbarComponent
				{...props('button', attributes, {
					setAttributes,
				})}
			/>
		</>
	);
};
