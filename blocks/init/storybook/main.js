module.exports = {
	stories: [
		'./../src/Blocks/**/story.js',
		'./../src/Blocks/story.js',
	],
	addons: ['@storybook/addon-essentials'],
	core: {
		builder: 'webpack5',
	},
	features: {
		emotionAlias: false,
	}
};
