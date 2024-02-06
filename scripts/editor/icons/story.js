/** @jsx jsx */
import React, { useState } from 'react'; // eslint-disable-line
import { jsx } from '@emotion/react';
import { Button } from '@wordpress/components';
import { SingleItemShowcase } from '../../storybook/helpers';
import { icons, blockIcons, AnimatedContentVisibility, classnames } from '@eightshift/frontend-libs/scripts';

export default {
	title: 'Editor/Icons',
};

const IconsOutput = (props) => {
	const {
		label,
		icons: providedIcons,
		isJsxSvg = true,
	} = props;

	const [search, setSearch] = useState('');

	// eslint-disable-next-line max-len
	let filteredIcons = search.length > 0 ? Object.entries(providedIcons).filter(([key]) => key.toLowerCase().includes(search.toLowerCase())) : Object.entries(providedIcons);

	return (
		<>
			<div className='es-h-between es-mb-5'>
				<h1 className='es-m-0 es-p-0 es-text-8'>{label}</h1>

				<input
					type='search'
					placeholder='Search icons'
					className='es-border-cool-gray-400 es-px-2 es-py-1.5 es-rounded-1 es-outline-none es-focus-hi-vis-outline'
					value={search}
					onChange={(e) => setSearch(e?.target?.value ?? '')}
				/>
			</div>

			<AnimatedContentVisibility showIf={filteredIcons?.length < 1}>
				<div className='es-mt-5 es-mx-auto es-font-size-5 es-v-center es-max-w-72 es-nested-w-10 es-nested-h-10 es-nested-color-admin-accent'>
					{icons.searchEmpty}
					<span>No results</span>
				</div>
			</AnimatedContentVisibility>

			<div className='es-h-spaced-wrap'>
				{filteredIcons.map(([key, value], index) => {
					return (
						<Button
							key={index}
							icon={isJsxSvg ? value : <div dangerouslySetInnerHTML={{ __html: value }} />}
							showTooltip
							label={key}
							className='es-w-24! es-h-24! es-nested-w-7! es-nested-h-7! es-slight-button-border'
							onClick={() => {
								navigator.clipboard.writeText(key).then(
									() => console.log('Copied to clipboard!'),
									() => console.log('Error copying to clipboard.')
								);
							}}
						/>
					);
				})}
			</div>
		</>
	);
};

export const UIIcons = () => (
	<IconsOutput label={'UI icons'} icons={icons} />
);

export const BlockIcons = () => (
	<IconsOutput blockIcons label={'Block icons'} icons={blockIcons} isJsxSvg={false} />
);

export const AnimatedIcons = () => {
	const [btn1, setBtn1] = useState(false);
	const [btn2, setBtn2] = useState(false);
	const [btn3, setBtn3] = useState(false);
	const [btn4, setBtn4] = useState(false);
	const [btn5, setBtn5] = useState(false);

	return (
		<>
			<h1 className='es-mt-0 es-mb-1 es-p-0 es-text-8'>Animated icons</h1>
			<p className='es-mt-0 es-mb-5 es-color-cool-gray-500'>Micro-interactions help improve spatial awareness of users, while adding visual delight.</p>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Inherit arrow'
					additionalPanels={[
						{
							title: 'How to use',
							content: <span><code>es-animated-inherit-icon</code><br />(+ <code>is-inherited</code>)</span>,
						}
					]}
				>
					<Button
						className={classnames('es-animated-inherit-icon es-button-icon-24 es-button-square-36 es-slight-button-border', btn1 && 'is-inherited')}
						icon={icons.inherit}
						onClick={() => setBtn1(!btn1)}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Y-flip animation'
					additionalPanels={[
						{
							title: 'How to use',
							content: <span><code>es-has-animated-y-flip-icon</code><br />(+ <code>is-active</code>)</span>,
						},
						{
							title: 'Note',
							content: 'The icon needs to be in SVG format, inlined.',
						}
					]}
				>
					<div className='es-h-spaced'>
						<Button
							className={classnames('es-has-animated-y-flip-icon es-button-icon-24 es-button-square-36 es-slight-button-border', btn2 && 'is-active')}
							icon={icons.caretUp}
							onClick={() => setBtn2(!btn2)}
						/>

						<Button
							className={classnames('es-has-animated-y-flip-icon es-button-icon-24 es-button-square-36 es-slight-button-border', btn3 && 'is-active')}
							icon={btn3 ? icons.caretDownFill : icons.caretDown}
							onClick={() => setBtn3(!btn3)}
						/>

						<Button
							className={classnames(
								'es-has-animated-y-flip-icon es-button-icon-24 es-button-square-36 es-slight-button-border',
								btn4 && 'is-active es-color-green-500!'
							)}
							icon={btn4 ? icons.solidCircleGradient : icons.emptyCircle}
							onClick={() => setBtn4(!btn4)}
						/>
					</div>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Animated toggle'
					additionalPanels={[
						{
							title: 'How to use',
							content: <span><code>es-animated-toggle-icon</code><br />(+ <code>is-checked</code>)</span>,
						}
					]}
				>
					<Button
						className={classnames('es-animated-toggle-icon es-button-icon-24 es-button-square-36 es-slight-button-border', btn5 && 'is-checked')}
						icon={icons.toggleOff}
						onClick={() => setBtn5(!btn5)}
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
