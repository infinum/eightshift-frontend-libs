import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { LottieEditor } from './components/lottie-editor';
import { LottieOptions } from './components/lottie-options';

export const Lottie = (props) => {
	return (
		<>
			<InspectorControls>
				<LottieOptions {...props} />
			</InspectorControls>
			<LottieEditor {...props} />
		</>
	);
};
