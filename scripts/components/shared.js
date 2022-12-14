import { classnames } from '../helpers';
import { IconLabel } from './icon-label/icon-label';
import { Animate } from '@wordpress/components';

/**
 * @since 8.0.0
 *
 * A base component to optionally encase a component with a label and help.
 *
 * @param {object} props                           - Control options.
 * @param {React.Component?} [props.icon]          - Icon to show next to the label
 * @param {React.Component?} [props.label]         - Label to show above component.
 * @param {React.Component?} [props.subtitle]      - Subtitle below the label.
 * @param {React.Component?} [props.actions]       - Actions to show to the right of the label.
 * @param {React.Component?} [props.help]          - Help to show below the control.
 * @param {React.Component?} [props.children]      - Content to show.
 * @param {string?} [props.additionalClasses]      - Classes to add to the control base.
 * @param {boolean?} [props.noBottomSpacing=false] - If `true`, space below the control is removed.
 */
export const Control = (props) => {
	const {
		icon,
		label,
		subtitle,

		actions,

		help,

		children,

		additionalClasses,

		noBottomSpacing = false,
	} = props;

	if (!children) {
		return null;
	}

	return (
		<div className={classnames(additionalClasses, !noBottomSpacing && 'es-mb-5')}>
			{label &&
				<div className={classnames('es-mb-2', actions && 'es-h-between')}>
					<IconLabel icon={icon} label={label} subtitle={subtitle} standalone />

					{actions &&
						<div>{actions}</div>
					}
				</div>
			}

			{children}

			{help &&
				<div className='es-mt-1 es-text-3 es-color-cool-gray-500'>{help}</div>
			}
		</div>
	);
};

/**
 * @since 8.0.0
 *
 * A wrapper around the Gutenberg Animate component.
 *
 * @param {object} props                               - AnimatedContentVisibility options.
 * @param {boolean} [props.showIf]                     - When to show the content.
 * @param {string?} [props.animation='slide-in']       - Animation to use.
 * @param {string?} [props.direction='bottom']         - Animation direction.
 * @param {string?} [props.additionalContainerClasses] - Classes to add to the animated container.
 * @param {React.Component?} [props.children]          - Content to show.
 */
export const AnimatedContentVisibility = (props) => {
	const {
		showIf,

		animation = 'slide-in',
		direction = 'bottom',

		additionalContainerClasses,

		children,
	} = props;

	if (!showIf) {
		return null;
	}

	return (
		<Animate type={animation} options={{ origin: direction }} >
			{({ className }) => (
				<div className={classnames(className, additionalContainerClasses)}>
					{children}
				</div>
			)}
		</Animate>
	);
};
