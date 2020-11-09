export const overrideInnerBlockAttributes = (select, clientId, attributesObject = {}) => {
	const { getBlock } = select('core/block-editor');

	const block = getBlock(clientId);

	block.innerBlocks.map((item) => {
		const { attributes } = item;

		for (const attribute in attributesObject) {
			if (attributesObject.hasOwnProperty(attribute)) {
				if (attribute !== attributes[attribute]) {
					attributes[attribute] = attributesObject[attribute];
				}
			}
		}

		return item;
	});
};

export const overrideInnerBlockSimpleWrapperAttributes = (select, clientId) => {
	overrideInnerBlockAttributes(
		select,
		clientId,
		{
			wrapperUseSimple: true,
			wrapperUseSimpleShowControl: false,
			wrapperUseShowControl: false,
		}
	);
};
