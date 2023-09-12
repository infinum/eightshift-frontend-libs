import { addons } from '@storybook/addons';
import customEightshiftThemes from './theme';

// Set default sidebar width.
const storybookLayout = JSON.parse(localStorage['storybook-layout'] || '{}');
const newLayout = { resizerNav: { x: 310, y: 0 } };
localStorage['storybook-layout'] = JSON.stringify({ ...storybookLayout, ...newLayout });

addons.setConfig({
	showPanel: false,
	theme: customEightshiftThemes,
	isFullscreen: false,
	showNav: true,
	enableShortcuts: false,
	showToolbar: true,
	selectedPanel: undefined,
	initialActive: 'sidebar',
	sidebar: {
		showRoots: true,
		collapsedRoots: ['other'],
	},
	toolbar: {
		zoom: { hidden: true },
		eject: { hidden: true },
		copy: { hidden: true },
		fullscreen: { hidden: true },
		addons: { hidden: true },
	},
});
