import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingToolbar as HeadingToolbarComponent } from '../../../components/heading/components/heading-toolbar';

export const HeadingToolbar = ({ attributes, actions }) => {
	return (
		<HeadingToolbarComponent
			{...attributes}
			{...actions}
		/>
	);
};
