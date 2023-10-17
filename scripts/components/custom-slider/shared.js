// eslint-disable-next-line no-unused-vars
import React from 'react';

export const styleProps = (props, sliderHeight, isRange = false) => {
	const {
		disabled,
		handleColor,
		trackColor,
		inactiveMarkColor,
		activeMarkColor,
		railColor,
		discrete = false,
		min,
		max,
		startPoint = min,
		marks = null,
	} = props;

	const containerStyle = {
		height: sliderHeight,
		background: 'none',
	};

	const handleStyle = {
		border: 'none',
		background: disabled ? 'var(--es-admin-cool-gray-100)' : handleColor ?? 'var(--wp-admin-theme-color, var(--es-admin-accent-color-default))',
		boxShadow: 'var(--es-custom-slider-handle-shadow, 0 0 0 1px white)',
		transition: 'box-shadow 0.3s var(--es-ease-out-cubic), border-color 0.3s',
		opacity: 1,
	};

	const trackStyle = {
		background: disabled ? 'var(--es-admin-cool-gray-100)' : trackColor ?? 'var(--wp-admin-theme-color, var(--es-admin-accent-color-default))',
		borderRadius: marks || disabled ? 0 : 6,
		height: 8,
		top: 3,
	};

	const railStyle = {
		background: disabled ? 'var(--es-admin-cool-gray-100)' : railColor ?? 'var(--es-admin-cool-gray-300)',
		borderRadius: marks || disabled ? 0 : 6,
		height: 8,
		top: 3,
	};

	const dotStyle = (value) => {
		let dotTransform = 'translateX(-50%)';

		if (value === min) {
			dotTransform = 'translateX(0)';
		} else if (value === max) {
			dotTransform = 'translateX(-1px)';
		}

		const dotStyle = {
			border: 'none',
			background: disabled ? 'var(--es-admin-cool-gray-100)' : inactiveMarkColor ?? 'var(--es-admin-cool-gray-400)',
			borderRadius: 0,
			width: 2,
			height: 10,
			bottom: -3,
			transform: dotTransform,
			opacity: disabled ? 0 : 1,
		};

		const activeStyle = {
			...dotStyle,
			background: disabled ? 'var(--es-admin-cool-gray-100)' : activeMarkColor ?? 'var(--wp-admin-theme-color, var(--es-admin-accent-color-default))',
			opacity: disabled ? 0 : 1,
		};

		if (isRange) {
			const minValue = props.value[0];
			const maxValue = props.value[props.value.length - 1];

			return value >= minValue && value <= maxValue ? activeStyle : dotStyle;
		}

		if (discrete) {
			return dotStyle;
		}

		if (value === parseFloat(startPoint)) {
			return activeStyle;
		}


		if (value < startPoint) {
			return value >= props.value ? activeStyle : dotStyle;
		}

		return value <= props.value ? activeStyle : dotStyle;
	};

	return {
		style: containerStyle,
		handleStyle: handleStyle,
		trackStyle: trackStyle,
		railStyle: railStyle,
		dotStyle: dotStyle,
		activeDotStyle: dotStyle,
	};
};

export const columnConfigStyleProps = (props, sliderHeight, numColumns) => {
	const {
		disabled,
	} = props;

	const containerStyle = {
		height: sliderHeight,
		background: 'none',
	};

	const handleStyle = {
		border: 'none',
		background: disabled ? 'var(--es-admin-cool-gray-100)' : 'var(--wp-admin-theme-color, var(--es-admin-accent-color-default))',
		boxShadow: 'var(--es-custom-slider-handle-shadow, 0 0 0 1px var(--es-admin-pure-white))',
		transition: 'box-shadow 0.3s var(--es-ease-out-cubic), border-color 0.3s',
		opacity: 1,
		marginTop: 11,
		width: 8,
		height: 24,
		borderRadius: 4,
	};

	const trackStyle = {
		background: disabled ? 'var(--es-admin-cool-gray-100)' : 'linear-gradient(135deg, var(--es-admin-cool-gray-200), var(--es-admin-cool-gray-400))',
		borderTopLeftRadius: props.value[0] === 1 ? 5 : 2,
		borderBottomLeftRadius: props.value[0] === 1 ? 5 : 2,
		borderTopRightRadius: props.value[1] === numColumns ? 5 : 2,
		borderBottomRightRadius: props.value[1] === numColumns ? 5 : 2,
		height: 34,
		top: 11,
		cursor: 'pointer',
		zIndex: -1,
		backgroundOrigin: 'border-box',
		backgroundRepeat: 'no-repeat',
	};

	const railStyle = {
		background: disabled ? 'var(--es-admin-cool-gray-100)' : 'transparent',
		borderRadius: 6,
		height: 46,
		width: 'calc(100% + 2px)',
		top: 5,
		left: -1,
		boxShadow: '0 0 0 1px var(--es-admin-cool-gray-300)',
	};

	const dotStyle = (value) => {
		// Hide dots if they are at the beginning/end of the slider or the value range.
		if (value === 1 || value === numColumns || value === props.value[0] || value === props.value[1]) {
			return {
				display: 'none',
			};
		}

		const dotStyle = {
			border: 'none',
			background: disabled ? 'var(--es-admin-cool-gray-100)' : 'var(--es-admin-cool-gray-300)',
			width: 1,
			height: 40,
			bottom: -39,
			opacity: disabled ? 0 : 1,
			borderRadius: 2,
		};

		const activeStyle = {
			...dotStyle,
			background: disabled ? 'var(--es-admin-cool-gray-100)' : 'var(--es-admin-pure-white)',
		};

		const minValue = props.value[0];
		const maxValue = props.value[props.value.length - 1];

		return value >= minValue && value <= maxValue ? activeStyle : dotStyle;
	};

	return {
		style: containerStyle,
		handleStyle: handleStyle,
		trackStyle: trackStyle,
		railStyle: railStyle,
		dotStyle: dotStyle,
		activeDotStyle: dotStyle,
	};
};

export const generateMarkers = (min, max) => {
	if (min < 0) {
		const numSegments = max > 100 ? `${max - 1}`.length : `${max}`.length + 1;

		const reverseMarkers = getMarkers(0, Math.abs(min), numSegments, true, true);

		return {
			...reverseMarkers,
			...getMarkers(0, max, numSegments),
		};
	}

	return getMarkers(min, max);
};

/**
 * Generates appropriately spaced slider markers.
 *
 * @param {Number} min Minimum value of the slider.
 * @param {Number} max Maximum value of the slider.
 * @param {Number} step Step between values.
 * @returns Slider markers.
 */
export const getMarkers = (min, max, segments = 5, isNegative = false, flipped = false) => {
	let output = {};

	const prefix = isNegative ? '-' : '';
	const multiplier = isNegative ? -1 : 1;

	const calculatedStep = Math.round((max - min) / segments);

	const baseStyle = {
		fontSize: '0.95em',
		color: 'var(--es-admin-gray-500)',
		letterSpacing: '-0.01em',
	};

	output[min * multiplier] = {
		style: {
			...baseStyle,
			transform: flipped ? 'translateX(calc(-100% + 2px))' : 'translateX(-1px)', textAlign: 'left'
		},
		label: `${prefix}${min}`,
	};

	for (let i = calculatedStep; i < max; i += calculatedStep) {
		if (max <= 10 || i - min > 1) {
			output[i * multiplier] = { style: baseStyle, label: `${prefix}${i}` };
		}
	}

	output[max * multiplier] = {
		style: {
			...baseStyle,
			transform: flipped ? 'translateX(-1px)' : 'translateX(calc(-100% + 2px))',
			textAlign: 'right',
		},
		label: `${prefix}${max}`,
	};

	return output;
};

/**
 * Forces a number to be in the allowed range.
 * @param {Number} num Number to clamp.
 * @param {Number} min Minimum allowed value.
 * @param {Number} max Maximum allowed value.
 * @returns Clamped number.
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
