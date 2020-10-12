import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { DrawerEditor } from '../components/drawer-editor';

export default {
	title: 'Components|Drawer',
	parameters: {
		notes: readme,
	},
};

const props = {
	menu: '',
	trigger: '',
	overlay: '',
};

document.body.classList.add('menu-is-open');

export const Left = () => (
	<DrawerEditor
		{...props}
		drawerPosition={'left'}
		menu={'Menu Drawer Open From the Left'}
	/>
);

export const Right = () => (
	<DrawerEditor
		{...props}
		drawerPosition={'right'}
		menu={'Menu Drawer Open From the Right'}
	/>
);

export const Top = () => (
	<DrawerEditor
		{...props}
		drawerPosition={'top'}
		menu={'Menu Drawer Open From the Top'}
	/>
);

export const Behind = () => (
	<DrawerEditor
		{...props}
		drawerPosition={'behind'}
		menu={'Menu Drawer Open From the Behind'}
	/>
);
