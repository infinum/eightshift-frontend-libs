module.exports = {
	stories: [
		'./../blocks/init/**/story.js',
		'./../scripts/components/**/story.js',
		'./../scripts/editor/icons/story.js',
	],
	addons: ['@storybook/addon-essentials'],
	core: {
		builder: 'webpack5',
	},
	features: {
		emotionAlias: false,
	}
};
