import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { IconLabel, AnimatedContentVisibility, Menu, MenuItem } from '@eightshift/frontend-libs/scripts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { icons } from '@eightshift/ui-components/icons';
import { clsx } from '@eightshift/ui-components/utilities';

export const SortableItem = (props) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: props.id });

	const {
		icon,
		title,
		subtitle,
		onRemove,
		isActive,
		isOnly,
		additionalLabelClass,
		noReordering,
		hideRemove,
		additionalMenuOptions,
		preIcon,
		additionalItemContainerClass,
		additionalLabelContainerClass,
		noLeftInset = false,
	} = props;

	const [showChildren, setShowChildren] = useState(false);

	const otherTransitions = 'border-radius 0.5s var(--es-ease-out-back), margin 0.35s var(--es-ease-out-back), border-color 0.3s var(--es-ease-out-cubic)';

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition ? `${transition}, ${otherTransitions}` : otherTransitions,
	};

	const additionalTriggerProps = (showChildren || noReordering) ? {
		disabled: 'disabled',
	} : {
		...attributes,
		...listeners,
	};

	const itemLabel = (
		<IconLabel
			icon={icon}
			label={title}
			subtitle={subtitle}
			additionalClasses={clsx('es-nested-color-cool-gray-650', additionalLabelClass)}
			standalone
		/>
	);

	const expandDisabled = Array.isArray(props?.children) ? props?.children?.filter(Boolean)?.length < 1 : !props?.children;

	return (
		<div ref={setNodeRef} style={style} className={clsx(
			'es-bg-pure-white es-border-cool-gray-100 es-rounded-2 es-transition es-min-h-10',
			!showChildren && !isActive && 'es-shadow-sm',
			showChildren && !isActive && 'es-shadow-md',
			isActive && 'es-shadow-lg es-z-10',
			additionalLabelContainerClass,
		)}>
			<div className={clsx('es-display-flex es-items-center es-py-1.5 es-pr-1.5', !noLeftInset && 'es-pl-2.5', additionalItemContainerClass)}>
				{preIcon}

				{itemLabel}

				<div className='es-ml-auto' />

				{!expandDisabled &&
					<Button
						className={clsx(
							// eslint-disable-next-line max-len
							'es-button-reset es-nested-size-6! es-w-6! es-h-7! es-min-w-auto! es-p-0! es-transition es-has-animated-y-flip-icon es-rounded-1! es-nested-flex-shrink-0',
							showChildren && 'is-active es-nested-color-admin-accent!'
						)}
						onClick={() => setShowChildren(!showChildren)}
						icon={showChildren ? icons.caretDownFill : icons.caretDown}
						disabled={expandDisabled}
					/>
				}

				{(!hideRemove || additionalMenuOptions) &&
					<Menu
						icon={icons.hamburgerMenu}
						buttonClass='es-nested-size-5 es-w-6! es-h-7! es-min-w-auto! es-nested-m-0! es-rounded-1! es-flex-shrink-0 es-nested-flex-shrink-0'
					>
						{!hideRemove &&
							<MenuItem icon={icons.trash} label={__('Remove', 'eightshift-frontend-libs')} onClick={onRemove} additionalClass='es-nested-color-red-500!' />
						}

						{additionalMenuOptions}
					</Menu>
				}

				{!noReordering &&
					<Button
						{...additionalTriggerProps}
						className={clsx(
							// eslint-disable-next-line max-len
							'es-flex-shrink-0 es-button-reset es-color-cool-gray-400 es-nested-color-current! es-line-h-0 es-p-0! es-h-7 es-w-5 es-nested-size-5 es-h-center es-rounded-1 es-transition es-min-w-auto! -es-mx-1 es-nested-flex-shrink-0',
							isActive && !(isOnly || showChildren) && 'es-color-admin-accent!',
							isOnly && 'es-opacity-10',
							showChildren && 'es-opacity-30'
						)}
						icon={icons.reorderGrabberV}
					/>
				}
			</div>

			{(Array.isArray(props?.children) ? props?.children?.filter(Boolean)?.length > 0 : props?.children) &&
				<AnimatedContentVisibility showIf={showChildren}>
					<div className='es-p-2 es-border-t-cool-gray-100'>
						{props.children}
					</div>
				</AnimatedContentVisibility>
			}
		</div>
	);
};
