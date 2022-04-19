import { createBlock } from '@wordpress/blocks';
import globalManifest from '../../manifest.json';
import manifestParagraph from './manifest.json';
import manifestHeading from '../heading/manifest.json';

export const transforms = {
	from: [
		{
			type: 'block',
			blocks: [`${globalManifest.namespace}/${manifestHeading.blockName}`],
			transform: (attributes) => {
				let paragraphAttributes = {};
				for (const attribute in attributes) {
					if (attribute.startsWith('block')) {
						continue;
					}
					const attrKey = attribute.replace('heading', 'paragraph').replace('Heading', 'Paragraph');
					paragraphAttributes[attrKey] = attributes[attribute];
				}

				return createBlock(`${globalManifest.namespace}/${manifestParagraph.blockName}`, paragraphAttributes);
			},
		},
		{
			type: 'raw',
			priority: 20,
			selector: 'p',
			schema: ({phrasingContentSchema, isPaste}) => ({
				p: {
					children: phrasingContentSchema,
					attributes: isPaste ? [] : [ 'style', 'id' ],
				},
			}),
			transform( node ) {
				const {
					namespace,
				} = globalManifest;

				const {
					blockName,
				} = manifestParagraph;

				return createBlock(
					`${namespace}/${blockName}`,
					{
						paragraphParagraphContent: node.innerHTML
					}
				);
			},
		},
	],
};
