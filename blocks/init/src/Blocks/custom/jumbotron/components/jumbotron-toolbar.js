import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts';
import { JumbotronToolbar as JumbotronToolbarComponent } from '../../../components/jumbotron/components/jumbotron-toolbar';

export const JumbotronToolbar = ({ attributes, setAttributes }) => {
	return (
		<JumbotronToolbarComponent
			{...props('jumbotron', attributes, {
				setAttributes,
			})}
		/>
	);
};
