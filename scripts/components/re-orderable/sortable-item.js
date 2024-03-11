import React from 'react';
import { IconLabel, icons, classnames } from '@eightshift/frontend-libs/scripts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
		isActive,
		isFirst,
		isLast,
		additionalLabelClass,
		noReordering,
		preIcon,
		postIcon,
		firstItemClass = '',
		lastItemClass = '',
		itemClass,
		innerClass,
		horizontal,
		horizontalVertical,
		customGrabHandle,
	} = props;

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
	};

	const additionalTriggerProps = noReordering ? {
		disabled: 'disabled',
	} : {
		...listeners,
		...attributes,
	};

	// eslint-disable-next-line max-len
	const itemLabel = ((typeof title !== 'string' && title) || (typeof title === 'string' && title?.length > 0) || (typeof subtitle !== 'string' && subtitle) || (typeof subtitle === 'string' && subtitle?.length > 0) || icon) && (
		<IconLabel icon={icon} label={title} subtitle={subtitle} additionalClasses={`es-nested-color-cool-gray-650 ${additionalLabelClass ?? ''}`} standalone />
	);

	return (
		<div ref={setNodeRef} style={style} className={classnames(itemClass, isFirst && firstItemClass, isLast && lastItemClass)}>
			<div className={classnames('es-display-flex es-items-center es-gap-1.5 es-p-1 es-rounded-1.5 es-transition', isActive && 'es-bg-cool-gray-50', innerClass)} >
				{preIcon}

				{noReordering && itemLabel}

				{!noReordering &&
					<div className={classnames('es-text-align-left es-h-between', !horizontal && !horizontalVertical && 'es-w-full')}>
						{itemLabel}

						<button
							className={classnames(
								'es-button-reset',
								!customGrabHandle && 'es-color-cool-gray-400 es-nested-color-current! es-line-h-0 es-w-5 es-p-0! es-h-7 es-h-center es-rounded-1 es-transition',
								!customGrabHandle && isActive && 'es-bg-admin-accent! es-color-pure-white!'
							)}
							{...additionalTriggerProps}
						>
							{customGrabHandle ?? icons.reorderGrabberV}
						</button>
					</div>
				}

				{postIcon}
			</div>
		</div>
	);
};
