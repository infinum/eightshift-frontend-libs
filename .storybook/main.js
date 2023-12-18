module.exports = {
	stories: [
		'./../blocks/init/src/Blocks/story.js',
		'./../blocks/init/src/Blocks/custom/**/docs/story.js',
		'./../blocks/init/src/Blocks/components/**/docs/story.js',
		'./../blocks/init/src/Blocks/variations/**/docs/story.js',


		// './../blocks/init/src/Blocks/variations/**/docs/story.js',
		// './../blocks/init/src/Blocks/wrapper/**/docs/story.js',
		// './../blocks/init/src/Blocks/readme.mdx',
		// './../scripts/components/**/story.js',
		// './../scripts/components/**/readme.mdx',
		// './../scripts/editor/icons/story.js',
		// './../scripts/editor/icons/readme.mdx',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y'
	],
	features: {
		emotionAlias: false,
	},
	framework: {
		name: '@storybook/react-webpack5',
	},
	docs: {
		autodocs: false,
		defaultName: 'Docs',
	}
};
