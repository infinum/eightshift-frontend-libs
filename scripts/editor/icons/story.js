import React from 'react';
import { Fragment } from '@wordpress/element';
import { icons, illustrations, blockIcons } from './icons';
import readme from './readme.mdx';

export default {
	title: 'Editor/Icons',
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const IconsOutput = (props) => {
	const {
		label,
		icons,
	} = props;

	return (
		<Fragment>
			<div
				css={{
					fontSize: '30px',
					fontWeight: 'bold',
				}}
			>
				{label}
			</div>
			<div
				css={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
			{Object.keys(icons).map((key, index) => (
				<div
					css={{
						display: 'flex',
						alignItems: 'center',
						flex: '0 0 33%',
						maxWidth: '33%',
						padding: '10px 15px',
					}}
					key={index}>
						<span
							css={{
								marginRight: '10px',
							}}
						>
							{icons[key]}
						</span>
						{key}
					</div>
				))}
			</div>
		</Fragment>
	);
};

export const ComponentsIcons = () => (
	<IconsOutput label={'Components Icons'} icons={icons} />
);

export const IllustrationIcons = () => (
	<IconsOutput label={'Illustration Icons'} icons={illustrations} />
);

export const BlockIcons = () => (
	<IconsOutput label={'Block Icons'} icons={blockIcons} />
);
