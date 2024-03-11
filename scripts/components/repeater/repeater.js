import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';
import { SortableItem } from './sortable-item';
import { Control } from '../base-control/base-control';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { classnames } from '../../helpers';

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

/**
 * A simple repeater.
 *
 * @param {object} props                               - Repeater options.
 * @param {React.Component?} [props.icon]              - Icon to display above the repeater.
 * @param {(React.Component|string)?} props.label      - Label to display above the repeater.
 * @param {(React.Component|string)?} [props.subtitle] - Subtitle to display under the title.
 * @param {any[]} props.items                          - Array of items to display.
 * @param {string} props.attributeName                 - Name of the attribute for items.
 * @param {function} props.setAttributes               - The `setAttributes` callback from component/block attributes.
 * @param {React.Component[]} props.children           - Child items, mapped from `items`. Contains all the option for child items.
 * @param {boolean} [props.noReordering=false]         - If `true`, the items can't be reordered.
 * @param {boolean} [props.noBottomSpacing]            - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]      - If `true`, space below the control is reduced.
 * @param {function} [props.handleAdd]                 - Callback for providing custom item adding logic.
 * @param {function} [props.handleItemReorder]         - Callback for providing custom item reordering logic.
 * @param {string?} [props.additionalClasses]          - Classes to add to the control base.
 * @param {string?} [props.additionalLabelClasses]     - Classes to add to the control label.
 * @param {boolean} [props.disableItemAdd=false]       - If `true`, the Add button is disabled.
 * @param {function} [props.customAddButton]           - If passed, a provided custom function will render the add button instead of the default one.
 */
export const Repeater = (props) => {
	const {
		icon,
		label,
		subtitle,
		help,
		actions,

		items,
		attributeName,
		setAttributes,

		children,

		noReordering = false,

		noBottomSpacing,
		reducedBottomSpacing,

		handleAdd,
		handleItemReorder,

		additionalClasses,
		additionalLabelClasses,

		disableItemAdd = false,
		customAddButton,
	} = props;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = ({ active, over }) => {
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

		setActive(null);
	};

	// Check for duplicates and reassign IDs if needed.
	const allIds = items?.map(({ id }) => id) ?? [];
	const hasDuplicates = (input) => (new Set(input))?.size !== input?.length;

	if (hasDuplicates(allIds) && items?.length > 0) {
		const newItems = [...items].map((item, index) => ({ ...item, id: index + 1 }));
		setAttributes({ [attributeName]: newItems });
	}

	const handleAddButtonClick = () => {
		const itemBase = { id: (items?.length ?? 0) + 1 };

		if (handleAdd) {
			handleAdd(itemBase);
		} else {
			setAttributes({ [attributeName]: [...items, itemBase] });
		}
	};

	const [active, setActive] = useState(null);

	return (
		<Control
			icon={icon}
			label={label}
			subtitle={subtitle}
			help={help}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			additionalClasses={additionalClasses}
			additionalLabelClasses={classnames(additionalLabelClasses, items?.length < 1 && 'es-mb-0!')}
			actions={
				<div className='es-h-spaced es-gap-1.5!'>
					{actions}

					{!customAddButton &&
						<Button
							onClick={handleAddButtonClick}
							icon={icons.plusCircle}
							className='es-button-square-28 es-button-icon-24 es-nested-color-cool-gray-650 es-rounded-1'
							label={__('Add item', 'eightshift-frontend-libs')}
							disabled={disableItemAdd}
						/>
					}

					{customAddButton && customAddButton({ disabled: disableItemAdd, onClick: handleAddButtonClick })}
				</div>
			}
		>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={({ active }) => setActive(active)}
				onDragCancel={() => setActive(null)}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToVerticalAxis, restrictToParentElement]}
			>
				<SortableContext
					items={items.map(({ id }) => id)}
					strategy={verticalListSortingStrategy}
				>
					<div className='es-v-spaced es-gap-1!'>
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
								isActive={items?.[i]?.id === active?.id}
								isFirst={i === 0}
								isLast={i === items?.length - 1}
								isOnly={items?.length === 1}
								additionalLabelClass={item?.props?.additionalLabelClass}
								noReordering={noReordering}
								hideRemove={item?.props?.hideRemove ?? false}
								additionalMenuOptions={item?.props?.additionalMenuOptions}
								preIcon={item?.props?.preIcon}
							>
								{item?.props?.children}
							</SortableItem>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</Control>
	);
};
