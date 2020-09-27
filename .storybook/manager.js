import '@storybook/addon-knobs/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-a11y/register';

import { addons } from '@storybook/addons';
import customEightshiftThemes from './theme';


addons.setConfig({
	showPanel: false,
	theme: customEightshiftThemes,
})
