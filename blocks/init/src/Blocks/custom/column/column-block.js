import React from 'react';
import { overrideInnerBlockAttributes } from '@eightshift/frontend-libs/scripts/editor';
import { useSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { ColumnEditor } from './components/column-editor';
import { ColumnOptions } from './components/column-options';

export const Column = (props) => {
	const {
		clientId,
	} = props;

	// Set this attributes to all inner blocks once inserted in DOM.
	const numberOfSiblings = useSelect((select) => {
		overrideInnerBlockAttributes(
			select,
			clientId,
			{
				wrapperUseSimple: true,
			}
		);
		const [parentClientId] = select('core/block-editor').getBlockParents(clientId);

		if (parentClientId) {
			return select('core/block-editor').getBlockOrder(parentClientId).length;
		}

		return 0;
	});

	return (
		<>
			<InspectorControls>
				<ColumnOptions {...props} numberOfSiblings={numberOfSiblings}/>
			</InspectorControls>
			<ColumnEditor {...props} />
		</>
	);
};
