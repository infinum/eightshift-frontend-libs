import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Animate } from '@wordpress/components';
import { IconLabel, icons } from '@eightshift/frontend-libs/scripts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classnames from 'classnames';

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
		isFirst,
		isLast,
		additionalLabelClass,
		noReordering,
		hideRemove,
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
		<IconLabel icon={icon} label={title} subtitle={subtitle} additionalClasses={`es-nested-color-cool-gray-650 ${additionalLabelClass ?? ''}`} standalone />
	);

	return (
		<div ref={setNodeRef} style={style} className={classnames([
			isFirst ? 'es-rounded-tl-1.5 es-rounded-tr-1.5' : '',
			isLast ? 'es-rounded-bl-1.5 es-rounded-br-1.5' : '-es-mb-px',
			showChildren ? 'es-rounded-1.5! es-border-cool-gray-500' : 'es-border-cool-gray-300',
			showChildren && !isFirst && !isLast ? 'es-my-2.5!' : '',
			showChildren && isFirst && !isLast ? 'es-mb-2.5!' : '',
			showChildren && !isFirst && isLast ? 'es-mt-2.5!' : '',
		])}>
			<div className={`es-pl-2 es-py-1 es-pr-0 es-display-flex es-items-center ${showChildren ? 'es-border-b-cool-gray-50' : 'es-border-b-transparent'}`} >
				{noReordering && itemLabel}

				{!noReordering &&
					<button className={`es-w-full es-button-reset es-text-align-left es-h-between es-user-select-none es-color-current! ${showChildren ? 'es-pointer-events-none' : 'es-cursor-pointer'}`} {...additionalTriggerProps}>
						{itemLabel}

						{!showChildren &&
							<div className='es-nested-color-cool-gray-400 es-line-h-0'>
								{icons.reorderGrabberV}
							</div>
						}
					</button>
				}

				<Button
					icon={showChildren ? icons.caretDownFill : icons.caretDown}
					className={`es-button-icon-24 es-has-animated-y-flip-icon es-rounded-1 es-flex-shrink-0 ${showChildren ? 'is-active es-nested-color-admin-accent' : 'es-nested-color-cool-gray-700'}`}
					onClick={() => setShowChildren(!showChildren)}
				/>
			</div>

			{showChildren &&
				<Animate type='slide-in' options={{ origin: 'bottom' }} >
					{({ className }) => (
						<div className={className}>
							<div className='es-p-3'>
								{props.children}
							</div>

							{!hideRemove &&
								<div className='es-pl-3 es-pr-1 es-py-1.5 es-h-end es-border-t-cool-gray-50'>
									<Button
										icon={icons.trash}
										onClick={onRemove}
										label={__('Remove', 'eightshift-frontend-libs')}
										showTooltip
										className='es-button-icon-24 es-nested-color-red-500 es-rounded-1'
									/>
								</div>
							}
						</div>
					)}
				</Animate>
			}

		</div>
	);
};
