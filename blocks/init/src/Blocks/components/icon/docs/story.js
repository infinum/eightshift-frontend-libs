import React from 'react'; // eslint-disable-line
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { IconEditor } from '../components/icon-editor';
import { IconOptions } from '../components/icon-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Icon',
};

const attributes = getExample('icon', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<IconEditor {...props('icon', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<IconOptions
			{...props('icon', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
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
