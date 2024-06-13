import { createBlock } from '@wordpress/blocks';
import globalManifest from '../../manifest.json';
import manifest from './manifest.json';

const regex = {
	youtube: /(http(s)?:\/\/)?(www.)?(youtube|youtu\.be)(.*)/g,
	vimeo: /(http(s)?:\/\/)?(www.)?(player.vimeo.com)(.*)/g,
	codepen: /(http(s)?:\/\/)?(www.)?(codepen.io)(.*)/g,
};

export const transforms = {
	from: [
		{
			type: 'raw',
			isMatch: (node) => node.nodeName === 'P' && node.textContent?.match(regex.youtube)?.length === 1,
			transform(node) {
				const {
					namespace,
				} = globalManifest;

				const {
					blockName,
				} = manifest;

				const reg = node.textContent?.match(regex.youtube);

				return createBlock(
					`${namespace}/${blockName}`,
					{
						embedEmbedUrl: reg[0],
						embedEmbedType: 'embed'
					}
				);
			},
		},
		{
			type: 'raw',
			isMatch: (node) => node.nodeName === 'P' && node.textContent?.match(regex.vimeo)?.length === 1,
			transform(node) {
				const {
					namespace,
				} = globalManifest;

				const {
					blockName,
				} = manifest;

				const reg = node.textContent?.match(regex.vimeo);

				return createBlock(
					`${namespace}/${blockName}`,
					{
						embedEmbedUrl: reg[0],
						embedEmbedType: 'embed'
					}
				);
			},
		},
		{
			type: 'raw',
			isMatch: (node) => node.nodeName === 'P' && node.textContent?.match(regex.codepen)?.length === 1,
			transform(node) {
				const {
					namespace,
				} = globalManifest;

				const {
					blockName,
				} = manifest;

				const reg = node.textContent?.match(regex.codepen);

				return createBlock(
					`${namespace}/${blockName}`,
					{
						embedEmbedUrl: reg[0],
						embedEmbedType: 'embed'
					}
				);
			},
		},
	],
};
