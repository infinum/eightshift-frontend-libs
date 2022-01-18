import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { GroupEditor } from './components/group-editor';
import { GroupOptions } from './components/group-options';

export const Group = (props) => {
	return (
		<>
			<InspectorControls>
				<GroupOptions {...props} />
			</InspectorControls>
			<GroupEditor {...props} />
		</>
	);
};


