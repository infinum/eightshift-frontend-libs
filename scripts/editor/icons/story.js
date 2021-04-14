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
		isJsxSvg = true,
	} = props;

	return (
		<Fragment>
			<div
				css={{
					fontSize: '30px',
					fontWeight: 'bold',
					marginBottom: '1rem',
				}}
			>
				{label}
			</div>
			<div
				css={{
					display: 'grid',
					gridTemplateColumns: 'repeat(12, 1fr)',
					gridAutoRows: 'auto',
					gap: '0.5rem',
				}}
			>
				{Object.entries(icons).map(([key, value], index) => (
					<div
						css={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '0.75rem 1rem',
						}}
						key={index}>
						<div
							css={{
								marginBottom: '0.75rem',
								color: '#0D3636',
							}}
						>
							{isJsxSvg && value}
							{!isJsxSvg &&
								<div
									dangerouslySetInnerHTML={{
										__html: value.replace('<svg', '<svg style="height: 1.25rem; width: 1.25rem"')
									}}
								>
								</div>}
						</div>
						<span
							css={{
								fontSize: '0.75rem',
								textAlign: 'center',
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
	<IconsOutput label={'Block icons'} icons={blockIcons} isJsxSvg={false} />
);
