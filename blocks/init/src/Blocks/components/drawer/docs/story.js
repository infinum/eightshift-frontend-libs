import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { DrawerEditor } from '../components/drawer-editor';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Drawer',
};

const attributes = getExample('drawer', manifest);

const DrawerDemo = ({position}) => {
	const [open, setOpen] = useState(false);

	const containerStyle = {
		height: '90vh',
		display: 'flex',
	};

	const drawerContentStyle = {
		padding: '1rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
		background: '#EEEEEE',
	};

	const buttonContainerStyle = {
		position: 'fixed',
		top: '25%',
		left: '0',
		right: '0',
		display: 'flex',
		justifyContent: 'center',
	};

	return (
		<div style={containerStyle}>
			<div style={{ ...buttonContainerStyle, zIndex: open ? 0 : 1000, }}>
				<Button isPrimary onClick={() => setOpen(true)}>
					Open drawer
				</Button>
			</div>
			<DrawerEditor
				{...props('drawer', attributes, {
					drawerPosition: position,
					drawerMenu: (<div style={drawerContentStyle}>
						<Button isPrimary onClick={() => setOpen(false)}>
							Close drawer
						</Button>
					</div>),
					additionalClass: open ? 'is-open' : '',
				})}
			/>
		</div>
	);
};

export const Left = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<DrawerDemo position='left' />
	</GetStoryComponentDescription>
);
export const Right = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<DrawerDemo position='right' />
	</GetStoryComponentDescription>
);
export const Top = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<DrawerDemo position='top' />
	</GetStoryComponentDescription>
);
export const Behind = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<DrawerDemo position='behind' />
	</GetStoryComponentDescription>
);
