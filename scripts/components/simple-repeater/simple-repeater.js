import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { IconLabel, icons } from '@eightshift/frontend-libs/scripts';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';

import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './sortable-item';

/**
 * A simple repeater.
 *
 * @param {object} props                             - SimpleRepeater options.
 * @param {React.Component?} [props.icon]            - Icon to display above the repeater.
 * @param {React.Component?|string} props.label      - Label to display above the repeater.
 * @param {React.Component?|string} [props.subtitle] - Subtitle to display under the title.
 * @param {array} props.items                        - Array of items to display.
 * @param {string} props.attributeName               - Name of the attribute for items.
 * @param {function} props.setAttributes             - The `setAttributes` callback from component/block attributes.
 * @param {array<SimpleRepeaterItem>} props.children - Child items, mapped from `items`. Contains all the option for child items.
 * @param {boolean} [props.noReordering=false]       - If `true`, the items can't be reordered.
 * @param {boolean} [props.noBottomSpacing=false]    - If `true`, the default bottom spacing is removed.
 * @param {function} [props.handleAdd]               - Callback for providing custom item adding logic.
 * @param {function} [props.handleItemReorder]       - Callback for providing custom item reordering logic.
 */
export const SimpleRepeater = ({
	icon,
	label,
	subtitle,

	items,
	attributeName,
	setAttributes,

	children,

	noReordering = false,

	noBottomSpacing = false,

	handleAdd,
	handleItemReorder,
}) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id && items) {
			const mappedItems = items.map(({ id }) => id);
			const oldIndex = mappedItems?.indexOf(active.id) ?? -1;
			const newIndex = mappedItems?.indexOf(over.id) ?? -1;

			if (handleItemReorder) {
				handleItemReorder(arrayMove, oldIndex, newIndex);
			} else {
				setAttributes({ [attributeName]: arrayMove([...items], oldIndex, newIndex) });
			}
		}
	};

	return (
		<>
			<div className={`es-h-between ${items?.length > 0 ? 'es-mb-1.5' : ''}`}>
				<IconLabel
					icon={icon}
					label={label}
					subtitle={subtitle}
					standalone
				/>

				<Button
					onClick={() => {
						const itemBase = { id: (items?.length ?? 0) + 1 };

						if (handleAdd) {
							handleAdd(itemBase);
						} else {
							setAttributes({ [attributeName]: [...items, itemBase] });
						}
					}}
					icon={icons.plusCircle}
					className='es-button-square-28 es-button-icon-24 es-nested-color-cool-gray-650 es-rounded-1'
					label={__('Add item', 'eightshift-frontend-libs')}
				/>
			</div>

			<div className={noBottomSpacing ? '' : 'es-mb-5'}>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
					modifiers={[restrictToVerticalAxis, restrictToParentElement]}
				>
					<SortableContext
						items={items.map(({ id }) => id)}
						strategy={verticalListSortingStrategy}
					>
						{children.map((item, i) => (
							<SortableItem
								key={items?.[i]?.id}
								id={items?.[i]?.id}
								icon={item?.props?.icon}
								title={item?.props?.title ?? __('New item', 'eightshift-frontend-libs')}
								subtitle={item?.props?.subtitle}
								onRemove={item?.props?.onRemove ?? (
									() => {
										const newArray = [...items].filter((_, index) => index !== i);
										setAttributes({ [attributeName]: newArray });
									}
								)}
								isFirst={i === 0}
								isLast={i === items?.length - 1}
								additionalLabelClass={item?.props?.additionalLabelClass}
								noReordering={noReordering}
								hideRemove={item?.props?.hideRemove ?? false}
							>
								{item?.props?.children}
							</SortableItem>
						))}
					</SortableContext>
				</DndContext>
			</div>
		</>
	);
};
