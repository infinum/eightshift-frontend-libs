import { yoastSeo } from "../../../../scripts/plugins";
import { postData } from "../../../data/post-data";

it('seo correctly parses the block content', () => {
	const seo = yoastSeo();

	const content = seo.addContent(postData);
});
