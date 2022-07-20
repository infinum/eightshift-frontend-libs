module.exports = {
	stories: [
		'./../src/Blocks/**/story.js',
		'./../src/Blocks/story.js',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y'
	],
	core: {
		builder: 'webpack5',
	},
	features: {
		emotionAlias: false,
	}
};
