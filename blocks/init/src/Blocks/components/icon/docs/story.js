/** @jsx jsx */
import React from 'react'; // eslint-disable-line
import { jsx } from '@emotion/react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { IconEditor } from '../components/icon-editor';
import { IconOptions } from '../components/icon-options';

export default {
	title: 'Components/Icon',
};

const attributes = getExample('icon', manifest);

export const editor = () => (
	<IconEditor {...props('icon', attributes)} />
);

export const options = () => (
	<IconOptions
		{...props('icon', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const icons = () => (
	<>
		{manifest.options.iconName.map((values, index) => (
			<div
			style={{
				display: 'flex',
				marginBottom: '20px',
			}}
			key={index}>
				<IconEditor
					{...props('icon', attributes, {
						iconName: values.value,
					})}
				/>

				<div style={{
					marginLeft: '20px',
				}}>
					{values.label}
				</div>
				<br />
			</div>
		))}
	</>
);
