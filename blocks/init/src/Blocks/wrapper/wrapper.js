import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { WrapperEditor } from './components/wrapper-editor';
import { WrapperOptions } from './components/wrapper-options';

export const Wrapper = (props) => {
	const {
		props: {
			setAttributes,
			attributes,
		},
		children,
	} = props;

	return (
		<>
			<InspectorControls>
				<WrapperOptions
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>

			<WrapperEditor
				attributes={attributes}
				children={children}
			/>
		</>
	);
};
