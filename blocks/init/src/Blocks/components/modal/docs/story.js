import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import { getExample, getOptions, props } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { ModalEditor } from '../components/modal-editor';
import { ModalOptions } from '../components/modal-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Modal',
};

const attributes = getExample('modal', manifest);

export const editor = () => {
	const [open, setOpen] = useState(false);

	const buttonContainerStyle = {
		display: 'flex',
		justifyContent: 'center',
	};

	return (
		<GetStoryComponentDescription manifest={manifest}>
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
		</GetStoryComponentDescription>
	);
};

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<ModalOptions
			{...props('modal', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);
