/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: [
		'./../blocks/init/**/readme.mdx',
		'./../scripts/components/**/readme.mdx',
		'./../scripts/editor/icons/readme.mdx',
		'./../blocks/init/**/story.js',
		'./../scripts/components/**/story.js',
		'./../scripts/editor/icons/story.js',
	],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false,
				backgrounds: false,
				controls: false,
				docs: false,
				viewport: false,
				toolbars: false,
				measure: false,
				outline: false,
				highlight: false
			},
		},
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
	],
	framework: '@storybook/react-webpack5',
	docs: {
		autodocs: false,
	},
};
export default config;
