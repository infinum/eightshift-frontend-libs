import { createBlock } from '@wordpress/blocks';
import manifest from '../../manifest.json';
import manifestHeading from './manifest.json';
import manifestParagraph from '../paragraph/manifest.json';

export const transforms = {
	from: [
		{
			type: 'block',
			blocks: [`${manifest.namespace}/${manifestParagraph.blockName}`],
			transform: (attributes) => {
				let headingAttributes = {};
				for (const attribute in attributes) {
					if (attribute.startsWith('block')) {
						continue;
					}
					const attrKey = attribute.replace('paragraph', 'heading').replace('Paragraph', 'Heading');
					headingAttributes[attrKey] = attributes[attribute];
				}

				return createBlock(`${manifest.namespace}/${manifestHeading.blockName}`, headingAttributes);
			},
		},
	],
};
