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

const open = () => document.body.classList.add('menu-is-open');

export const Left = () => {
	open();

	return (
		<DrawerEditor
			{...props}
			drawerPosition={'left'}
			menu={'Menu Drawer Open From the Left'}
		/>
	);
};

export const Right = () => {
	open();

	return (
		<DrawerEditor
			{...props}
			drawerPosition={'Right'}
			menu={'Menu Drawer Open From the Right'}
		/>
	);
};

export const Top = () => {
	open();

	return (
		<DrawerEditor
			{...props}
			drawerPosition={'Top'}
			menu={'Menu Drawer Open From the Top'}
		/>
	);
};

export const Behind = () => {
	open();

	return (
		<DrawerEditor
			{...props}
			drawerPosition={'Be'}
			menu={'Menu Drawer Open From the Be'}
		/>
	);
};
