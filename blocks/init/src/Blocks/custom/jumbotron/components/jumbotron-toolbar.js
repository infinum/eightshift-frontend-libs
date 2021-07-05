import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { JumbotronToolbar as JumbotronToolbarComponent } from '../../../components/jumbotron/components/jumbotron-toolbar';

export const JumbotronToolbar = ({ attributes, setAttributes }) => {
	return (
		<JumbotronToolbarComponent
			{...props(attributes, 'jumbotron')}
			setAttributes={setAttributes}
		/>
	);
};
