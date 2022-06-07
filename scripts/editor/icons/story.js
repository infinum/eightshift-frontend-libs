/** @jsx jsx */
import React from 'react'; // eslint-disable-line
import { jsx } from '@emotion/core';
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
		isJsxSvg = true,
		blockIcons = false,
	} = props;

	return (
		<Fragment>
			<div
				css={{
					fontSize: '1.5rem',
					fontWeight: 'bold',
					marginBottom: '1rem',
				}}
			>
				{label}
			</div>
			<div
				css={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, 14rem)',
					gridAutoRows: 'auto',
					gap: '0.5rem',
				}}
			>
				{Object.entries(icons).map(([key, value], index) => (
					<div
						css={{
							display: 'grid',
							gridTemplateRows: '1fr auto',
							alignItems: 'center',
							justifyItems: 'center',
							padding: '0.75rem 1rem',
						}}
						key={index}>
						<div
							css={{
								marginBottom: '1rem',
								color: blockIcons ? '#FFF' : '#3858E9',
								backgroundColor: blockIcons ? '#3858E9' : 'transparent',
								transform: 'scale(1.5)',
								minWidth: '1.75rem',
								minHeight: '1.75rem',
								borderRadius: '0.25rem',
								display: 'grid',
								placeItems: 'center',
								lineHeight: 0,
							}}
						>
							{isJsxSvg && value}
							{!isJsxSvg && <div dangerouslySetInnerHTML={{ __html: value }}></div>}
						</div>
						<span
							css={{
								fontSize: '0.75rem',
								textAlign: 'center',
								fontFamily: 'monospace',
							}}
						>
							{key}
						</span>
					</div>
				))}
			</div>
		</Fragment>
	);
};

export const UIIcons = () => (
	<IconsOutput label={'UI icons'} icons={icons} />
);

export const HelperIllustrations = () => (
	<IconsOutput label={'Helper illustrations'} icons={illustrations} />
);

export const BlockIcons = () => (
	<IconsOutput blockIcons label={'Block icons'} icons={blockIcons} isJsxSvg={false} />
);
