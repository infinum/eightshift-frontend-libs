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
	} = props;

	const otherTransitions = 'border-radius 0.5s var(--es-ease-out-back), margin 0.35s var(--es-ease-out-back), border-color 0.3s var(--es-ease-out-cubic)';

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition ? `${transition}, ${otherTransitions}` : otherTransitions,
	};

	const additionalTriggerProps = noReordering ? {
		disabled: 'disabled',
	} : {
		...attributes,
		...listeners,
	};

	const itemLabel = (
		<IconLabel icon={icon} label={title} subtitle={subtitle} additionalClasses={`es-nested-color-cool-gray-650 ${additionalLabelClass ?? ''}`} standalone />
	);

	const itemClass = classnames(
		isFirst && 'es-rounded-tl-1.5 es-rounded-tr-1.5',
		isLast ? 'es-rounded-bl-1.5 es-rounded-br-1.5' : '-es-mb-px'
	);

	return (
		<div ref={setNodeRef} style={style} className={itemClass}>
			<div className='es-pl-2 es-py-1 es-pr-0 es-display-flex es-items-center es-gap-1 es-border-b-transparent' >
				{preIcon}

				{noReordering && itemLabel}

				{!noReordering &&
					<button className='es-w-full es-button-reset es-text-align-left es-h-between es-user-select-none es-color-current! es-cursor-pointer' {...additionalTriggerProps}>
						{itemLabel}

						<div className='es-nested-color-cool-gray-400 es-line-h-0'>
							{icons.reorderGrabberV}
						</div>
					</button>
				}

				{postIcon}
			</div>
		</div>
	);
};
