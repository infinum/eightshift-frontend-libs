import React from 'react';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { %block-name-pascal-case%Editor } from './components/%block-name-kebab-case%-editor';
import { %block-name-pascal-case%Options } from './components/%block-name-kebab-case%-options';
import { %block-name-pascal-case%Toolbar } from './components/%block-name-kebab-case%-toolbar';

export const %block-name-pascal-case% = (props) => {
	return (
		<>
			<InspectorControls>
				<%block-name-pascal-case%Options {...props} />
			</InspectorControls>
			<BlockControls>
				<%block-name-pascal-case%Toolbar {...props} />
			</BlockControls>
			<%block-name-pascal-case%Editor {...props} />
		</>
	);
};
