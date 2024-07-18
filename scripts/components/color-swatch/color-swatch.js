import React, { useState, useRef, useEffect } from 'react';
import { luminanceFromRgb } from '../../helpers';
import { clsx } from '@eightshift/ui-components/utilities';

/**
 * @since 8.0.0
 *
 * A simple color swatch to show a color, gradient, transparent (checkerboard) or none.
 *
 * @param {object} props                      - ColorSwatch options.
 * @param {string?} [props.color]             - Color to show. Can be either `null`/empty for "nothing" icon, `transparent` to show a checkerboard, or anything that can be sent to the css `background` property.
 * @param {boolean} [props.selected=false]    - If `true`, the color is selected.
 * @param {boolean} [props.larger=false]      - If `true`, the swatch is rendered a bit larger.
 * @param {boolean} [props.additionalClasses] - Additional classes to pass through to the swatch.
 */
export const ColorSwatch = (props) => {
	const {
		color,
		selected = false,
		larger = false,
		additionalClasses,
	} = props;

	if (color === 'es-undefined') {
		return (
			<div
				className={clsx(
					'es-position-relative es-border-cool-gray-450 es-rounded-1 es-dots-background',
					larger ? 'es-w-7 es-h-7' : 'es-w-6 es-h-6',
					additionalClasses
				)}
				style={{
					boxShadow: 'inset 0 0 0 2px var(--es-admin-pure-white)',
				}}
			/>
		);
	}

	if (!color || color?.length < 1) {
		return (
			<div
				className={clsx(
					'es-position-relative es-border-cool-gray-450 es-rounded-1 es-bg-pure-white',
					larger ? 'es-w-7 es-h-7' : 'es-w-6 es-h-6',
					additionalClasses
				)}
				style={{
					// eslint-disable-next-line max-len
					backgroundImage: 'repeating-linear-gradient(-45deg, var(--es-admin-cool-gray-450), var(--es-admin-cool-gray-450) 1px, #ffffff 1px, #ffffff 15px)',
					boxShadow: 'inset 0 0 0 2px var(--es-admin-pure-white)',
				}}
			/>
		);
	}

	const ref = useRef();
	const [hasInvertedIndicator, setHasInvertedIndicator] = useState(false);

	useEffect(() => {
		if (!ref?.current) {
			return;
		}

		const background = getComputedStyle(ref?.current).backgroundColor;

		if (!background || background?.length < 1 || !background.includes(',')) {
			return;
		}

		const parsedBackground = background.replace('rgb(', '').replace(')', '').replace(' ', '').split(',').map((n) => parseInt(n));

		setHasInvertedIndicator(luminanceFromRgb(...parsedBackground) > 0.5);
	}, [ref]);

	const activeIndicator = (
		<div
			className={clsx(
				'es-rounded-full es-transition',
				larger ? 'es-w-3.5 es-h-3.5' : 'es-w-3 es-h-3',
				selected ? 'es-opacity-100' : 'es-opacity-0',
				hasInvertedIndicator || color === 'transparent' ? 'es-bg-pure-black' : 'es-bg-pure-white'
			)}
		/>
	);

	if (color === 'transparent') {
		return (
			<div
				className={clsx(
					'es-position-relative es-h-center es-border-cool-gray-450 es-transition es-rounded-1',
					larger ? 'es-w-7 es-h-7' : 'es-w-6 es-h-6',
					additionalClasses
				)}
				style={{
					backgroundColor: '#ffffff',
					// eslint-disable-next-line max-len
					backgroundImage: 'repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), repeating-linear-gradient(45deg, #ccc 25%, #ffffff 25%, #ffffff 75%, #ccc 75%, #ccc)',
					backgroundPosition: '0 0, 4.5px 4.5px',
					backgroundSize: '9px 9px',
				}}
			>
				{activeIndicator}
			</div>
		);
	}

	return (
		<div
			className={clsx(
				'es-position-relative es-h-center es-border-cool-gray-450 es-transition es-rounded-1',
				larger ? 'es-w-7 es-h-7' : 'es-w-6 es-h-6',
				additionalClasses
			)}
			style={{
				background: color,
			}}
			ref={ref}
		>
			{activeIndicator}
		</div>
	);
};
