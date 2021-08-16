import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { DrawerEditor } from '../components/drawer-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const attributes = getExample('drawer', manifest);

const drawerDemo = (position) => {
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

export const Left = () => drawerDemo('left');
export const Right = () => drawerDemo('right');
export const Top = () => drawerDemo('top');
export const Behind = () => drawerDemo('behind');
