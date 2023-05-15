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
		...attributes,
		...listeners,
	};

	const itemLabel = ((typeof title !== 'string' && title) || (typeof title === 'string' && title?.length > 0) || (typeof subtitle !== 'string' && subtitle) || (typeof subtitle === 'string' && subtitle?.length > 0) || icon) && (
		<IconLabel icon={icon} label={title} subtitle={subtitle} additionalClasses={`es-nested-color-cool-gray-650 ${additionalLabelClass ?? ''}`} standalone />
	);

	return (
		<div ref={setNodeRef} style={style} className={classnames(itemClass, isFirst && firstItemClass, isLast && lastItemClass)}>
			<div className={classnames('es-display-flex es-items-center es-gap-1 es-py-1', innerClass)} >
				{preIcon}

				{noReordering && itemLabel}

				{!noReordering &&
					<button className={classnames('es-button-reset es-text-align-left es-h-between es-user-select-none es-color-current! es-cursor-pointer', !horizontal && !horizontalVertical && 'es-w-full')} {...additionalTriggerProps}>
						{itemLabel}

						{!customGrabHandle &&
							<div className='es-nested-color-cool-gray-400 es-line-h-0'>
								{icons.reorderGrabberV}
							</div>
						}

						{customGrabHandle}
					</button>
				}

				{postIcon}
			</div>
		</div>
	);
};
