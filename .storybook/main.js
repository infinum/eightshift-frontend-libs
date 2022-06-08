module.exports = {
	stories: [
		'./../blocks/init/**/story.js',
		'./../scripts/components/**/story.js',
		'./../scripts/editor/icons/story.js',
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
