import React, { useState, useRef, useEffect } from 'react';
import { classnames, luminanceFromRgb } from '../../helpers';

/**
 * @since 8.0.0
 *
 * A simple color swatch to show a color, gradient, transparent (checkerboard) or none.
 *
 * @param {object} props                   - ColorSwatch options.
 * @param {string?} [props.color]          - Color to show. Can be either `null`/empty for "nothing" icon, `transparent` to show a checkerboard, or anything that can be sent to the css `background` property.
 * @param {boolean} [props.selected=false] - If `true`, the color is selected.
 */
export const ColorSwatch = (props) => {
	const {
		color,
		selected = false,
	} = props;

	if (!color || color?.length < 1) {
		return (
			<div
				className='es-position-relative es-w-6 es-h-6 es-border-cool-gray-450 es-rounded-1 es-bg-pure-white'
				style={{
					backgroundImage: 'repeating-linear-gradient(-45deg, var(--es-admin-cool-gray-450), var(--es-admin-cool-gray-450) 1px, #ffffff 1px, #ffffff 15px)',
					boxShadow: 'inset 0 0 0 2px var(--es-admin-pure-white)',
				}}
			>
			</div>
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
			className={classnames('es-w-3.5 es-h-3.5 es-rounded-full es-transition es-border-w-2px', hasInvertedIndicator || color === 'transparent' ? 'es-border-pure-black' : 'es-border-pure-white')}
			style={{
				opacity: selected ? 1 : 0,
				transform: selected ? 'scale(1)' : 'scale(0.75)',
			}}
		></div>
	);

	if (color === 'transparent') {
		return (
			<div
				className={classnames('es-position-relative es-w-6 es-h-6 es-h-center es-border-cool-gray-450 es-custom-transition', selected ? 'es-rounded-10' : 'es-rounded-1')}
				style={{
					'--es-transition-property': 'border-radius',
					'--es-transition-duration': selected ? '1s' : '0.6s',
					backgroundColor: '#ffffff',
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
			className={classnames('es-position-relative es-w-6 es-h-6 es-h-center es-border-cool-gray-450 es-custom-transition', selected ? 'es-rounded-10' : 'es-rounded-1')}
			style={{
				'--es-transition-property': 'border-radius',
				'--es-transition-duration': selected ? '1s' : '0.6s',
				background: color,
			}}
			ref={ref}
		>
			{activeIndicator}
		</div>
	);
};
