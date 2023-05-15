import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { MapEditor } from './components/map-editor';
import { MapOptions } from './components/map-options';

export const Map = (props) => {
	return (
		<>
			<InspectorControls>
				<MapOptions {...props} />
			</InspectorControls>

			<MapEditor {...props} />
		</>
	);
};
