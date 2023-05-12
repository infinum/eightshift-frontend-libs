import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { WrapperEditor } from './components/wrapper-editor';
import { WrapperOptions } from './components/wrapper-options';
import { initWrapperStore } from './wrapper-stores';
import { WrapperDragNDropEditOptionsComponent } from './wrapper-drag-n-drop-editing';

initWrapperStore();

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
				<WrapperDragNDropEditOptionsComponent attributes={attributes} />

				<WrapperOptions
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>

			<WrapperEditor
				attributes={attributes}
				children={children}
				setAttributes={setAttributes}
			/>
		</>
	);
};
