import React from 'react'; // eslint-disable-line no-unused-vars
import { withSelect } from '@wordpress/data';
import { GroupEditor } from './components/group-editor';

export const Group = withSelect((select, ownProps) => {

	const block = select('core/block-editor').getBlock(ownProps.clientId);

	block.innerBlocks.map((item) => {
		const { attributes } = item;

		if (!attributes.wrapperUseSimple) {
			attributes.wrapperUseSimple = true;
		}
		if (attributes.wrapperUseSimpleShowControl) {
			attributes.wrapperUseSimpleShowControl = false;
		}
		if (attributes.wrapperUseShowControl) {
			attributes.wrapperUseShowControl = false;
		}

		return item;
	});

})((props) => {

	const {
		attributes,
	} = props;

	return (
		<GroupEditor
			attributes={attributes}
		/>
	);
});


