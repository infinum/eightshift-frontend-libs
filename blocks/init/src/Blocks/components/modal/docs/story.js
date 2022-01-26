import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import { getExample, getOptions, props } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { ModalEditor } from '../components/modal-editor';
import { ModalOptions } from '../components/modal-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const attributes = getExample('modal', manifest);

export const editor = () => {
	const [open, setOpen] = useState(false);

	const buttonContainerStyle = {
		position: 'fixed',
		top: '25%',
		left: '0',
		right: '0',
		display: 'flex',
		justifyContent: 'center',
	};

	return (
		<>
			<div style={buttonContainerStyle}>
				<Button isPrimary onClick={() => setOpen(true)}>
					Open modal
				</Button>
			</div>

			<ModalEditor
				{...props('modal', attributes, {
					additionalClass: open ? 'is-open' : '',
				})}
				onClick={() => setOpen(false)}
			/>
		</>
	);
};

export const options = () => (
	<ModalOptions
		{...props('modal', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);