import React from 'react';
import { Icon } from '@wordpress/components';

/**
 * A simple icon-label combo for streamlined components.
 * 
 * @param {React.Component} props.label          - Label to display.
 * @param {React.Component} props.icon           - Icon to display.
 * @param {React.Component?} [props.subtitle]    - Label to display.
 * @param {boolean} [props.standalone=false]     - If `true` label is wrapped in div so it can be used by itself.
 * @param {boolean} [props.additionalClasses]    - If set and `standalone`, provided classes will be passed to the component.
 * @param {boolean} [props.addSubtitleGap=false] - If `true`, a slight gap between the subtitle and the label is added.
 */
export const IconLabel = (props) => {
	const { label, icon, subtitle, standalone = false, additionalClasses, addSubtitleGap = false } = props;

	if (subtitle && standalone) {
		return (
			<div className={`es-label-flex ${additionalClasses ?? ''}`}>
				<Icon icon={icon} />
				<div className={`es-v-spaced ${addSubtitleGap ? 'es-gap-xs-important' : 'es-gap-0-important'}`}>
					{label && <span className='es-flex-shrink-0'>{label}</span>}
					{subtitle && <span className='es-decorative-text es-text-smallish-l-em es-flex-shrink-0'>{subtitle}</span>}
				</div>
			</div>
		);
	}

	if (subtitle) {
		return (
			<>
				<Icon icon={icon} />
				<div className='es-v-spaced es-gap-xs-important'>
					{label && <span className='es-flex-shrink-0'>{label}</span>}
					{subtitle && <span className='es-decorative-text es-text-smallish-l-em es-flex-shrink-0'>{subtitle}</span>}
				</div>
			</>
		);
	}

	if (standalone) {
		return (
			<div className={`es-label-flex ${additionalClasses ?? ''}`}>
				<Icon icon={icon} />
				{label}
			</div>
		);
	}

	return (
		<>
			<Icon icon={icon} />
			{label}
		</>
	);
};
