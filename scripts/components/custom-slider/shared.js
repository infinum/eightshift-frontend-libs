import React from 'react';
import { BaseControl } from '@wordpress/components';
import { SliderTooltip, Handle } from 'rc-slider';

/**
 * Function that returns the appropriate components based on passed attributes.
 *
 * @param {Object} props - Props to pass through.
 */
export const getSliderComponent = ({ label, help, sliderElement, isInline, sliderClass }) => {
	if (!label && !help) {
		return React.cloneElement(sliderElement, { className: `${sliderElement.props.className} ${sliderClass}` });
	}

	if (isInline && label) {
		return (
			<div className={sliderClass}>
				{typeof label === 'string' && <p className='es-custom-slider-inline-label'>{label}</p>}
				{typeof label !== 'string' && label}
				{sliderElement}
			</div>
		);
	}

	return (
		<BaseControl
			label={label}
			help={help}
			className={sliderClass}
		>
			{sliderElement}
		</BaseControl>
	);
};

/**
 * Function that returns the appropriate handle component based on passed attributes.
 *
 * @param {Object} props - Props to pass through.
 */
export const getCustomHandle = ({ tooltipPlacement, tooltipFormat }) => (props) => {
	const { value, dragging, index, ...restProps } = props;

	if (tooltipPlacement === 'hide') {
		return (<Handle value={value} {...restProps} />);
	}

	return (
		<SliderTooltip
			prefixCls='rc-slider-tooltip'
			overlay={tooltipFormat(value, dragging)}
			visible={dragging}
			placement={tooltipPlacement}
			key={index}
		>
			<Handle value={value} {...restProps} />
		</SliderTooltip>
	);
};

/**
 * Function that parses and sets the correct CSS variables for slider styles.
 *
 * @param {Object} props - Props to pass through.
 */
export const getSliderStyles = ({ trackColor, railColor, activeMarkColor, inactiveMarkColor, activeMarkLabelColor, inactiveMarkLabelColor, handleColor, vertical, marks, hasVerticalLabels, max }) => {
	const styles = {};

	if (max?.toString()?.length > 0) {
		styles['--es-custom-slider-value-display-width'] = max?.toString()?.length;
	}

	if (trackColor) {
		styles['--es-custom-slider-custom-track-color'] = trackColor;
	}

	if (railColor) {
		styles['--es-custom-slider-custom-rail-color'] = railColor;
	}

	if (activeMarkColor) {
		styles['--es-custom-slider-custom-active-mark-color'] = activeMarkColor;
	}

	if (inactiveMarkColor) {
		styles['--es-custom-slider-custom-mark-color'] = inactiveMarkColor;
	}

	if (activeMarkLabelColor) {
		styles['--es-custom-slider-custom-active-mark-label-color'] = activeMarkLabelColor;
	}

	if (inactiveMarkLabelColor) {
		styles['--es-custom-slider-custom-mark-label-color'] = inactiveMarkLabelColor;
	}

	if (handleColor) {
		styles['--es-custom-slider-custom-handle-color'] = handleColor;
	}

	if (vertical) {
		styles['flexDirection'] = 'column';

		if (marks) {
			styles['--es-custom-slider-vertical-mark-offset'] = ([...Object.keys(marks)]?.length ?? 0) % 2 === 0 ? '-0.5rem' : '0.25rem';
		}
	}

	if (hasVerticalLabels) {
		const maxLabelLength = Math.max(...Object.values(marks).map((i) => parseInt(i?.length ?? 0)));

		styles['--es-custom-slider-additional-bottom-padding'] = maxLabelLength * 0.25;
	}

	return styles;
};
