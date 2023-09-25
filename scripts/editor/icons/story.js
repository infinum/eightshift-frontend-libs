/** @jsx jsx */
import React, { useState } from 'react'; // eslint-disable-line
import { jsx } from '@emotion/react';
import { Button } from '@wordpress/components';
import { icons, illustrations, blockIcons } from '@eightshift/frontend-libs/scripts';
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
		icons: providedIcons,
		isJsxSvg = true,
		blockIcons = false,
	} = props;

	const [search, setSearch] = useState('');

	// eslint-disable-next-line max-len
	let filteredIcons = search.length > 0 ? Object.entries(providedIcons).filter(([key]) => key.toLowerCase().includes(search.toLowerCase())) : Object.entries(providedIcons);

	return (
		<>
			<h4>{label}</h4>

			<input type='search' placeholder='Search' className='es-mb-4' value={search} onChange={(e) => setSearch(e?.target?.value ?? '')} />

			{filteredIcons.length < 1 &&
				<div className='es-mt-5 es-font-size-5 es-v-center es-max-w-72 es-nested-w-10 es-nested-h-10 es-nested-color-admin-accent'>
					{icons.searchEmpty}
					<i>No results</i>
				</div>
			}


			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, 14rem)',
					gridAutoRows: 'auto',
					gap: '0.5rem',
				}}
			>
				{filteredIcons.map(([key, value], index) => (
					<div
						style={{
							display: 'grid',
							gridTemplateRows: '1fr auto',
							alignItems: 'center',
							justifyItems: 'center',
							padding: '0.75rem 1rem',
						}}
						key={index}>
						<div
							style={{
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
							{!isJsxSvg && <div dangerouslySetInnerHTML={{ __html: value }} />}
						</div>
						<span
							style={{
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
		</>
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

export const AnimatedIcons = () => {
	const [btn1, setBtn1] = useState(false);
	const [btn2, setBtn2] = useState(false);
	const [btn3, setBtn3] = useState(false);
	const [btn4, setBtn4] = useState(false);

	return (
		<>
			<h4>Inherit arrow</h4>

			<Button
				className={`es-compact-responsive-inherit-button es-button-icon-24 es-button-square-36 es-slight-button-border ${btn1 ? 'is-inherited' : ''}`}
				icon={icons.inherit}
				onClick={() => setBtn1(!btn1)}
			/>

			<br />
			<br />
			<small><span><code>es-compact-responsive-inherit-button</code> (+ <code>is-inherited</code></span>)</small>

			<h4>Y-flip animation</h4>

			<Button
				className={`es-has-animated-y-flip-icon es-button-icon-24 es-button-square-36 es-slight-button-border ${btn2 ? 'is-active' : ''}`}
				icon={icons.caretUp}
				onClick={() => setBtn2(!btn2)}
			/>

			<br />
			<br />
			<small><span><code>es-has-animated-y-flip-icon</code> (+ <code>is-active</code></span>), <code>caretUp</code> icon shown here</small>

			<br />
			<br />

			<Button
				className={`es-has-animated-y-flip-icon es-button-icon-24 es-button-square-36 es-slight-button-border ${btn3 ? 'is-active' : ''}`}
				icon={btn3 ? icons.caretUp : icons.caretUpFill}
				onClick={() => setBtn3(!btn3)}
			/>

			<br />
			<br />
			<small>
				<span>
					<code>es-has-animated-y-flip-icon</code> (+ <code>is-active</code></span>), <code>caretUp</code>
					(<code>caretUpFill</code> when toggled) icon shown here
				</small>

			<br />
			<br />

			<b>Note: </b> needs an <small><code>svg</code></small> child!

			<h4>Animated toggle</h4>

			<Button
				className={`es-animated-toggle-icon es-button-icon-24 es-button-square-36 es-slight-button-border ${btn4 ? 'is-checked' : ''}`}
				icon={icons.toggleOff}
				onClick={() => setBtn4(!btn4)}
			/>

			<br />
			<br />
			<small><span><code>es-animated-toggle-icon</code> (+ <code>is-checked</code></span>)</small>
		</>
	);
};
