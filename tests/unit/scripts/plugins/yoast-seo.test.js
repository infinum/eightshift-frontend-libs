import { yoastSeo } from "../../../../scripts/plugins";
import { postData, parsedContent } from "../../../data/post-data";

it('seo correctly parses the block content', () => {

	global.YoastSEO = {
		'app': {
			registerPlugin: (name, prop) => '',
			registerModification: (name, cb, eventName, priority) => '',
		},
		'analysis': {
			'worker': 'mock'
		}
	};

	const seo = yoastSeo();

	const parsedBlocks = seo.addContent(postData);

	expect(parsedBlocks).toBe(parsedContent);
});
