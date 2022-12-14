import React from 'react';
import { __ } from '@wordpress/i18n';
import Select, { components } from 'react-select';

import { DndContext, useDroppable } from '@dnd-kit/core';

import { restrictToParentElement } from '@dnd-kit/modifiers';

import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';


const MultiValue = (props) => {
	const onMouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const innerProps = { ...props.innerProps, onMouseDown };

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: props.data.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div style={style} ref={setNodeRef} {...attributes} {...listeners}>
			<components.MultiValue {...props} innerProps={innerProps} />
		</div>
	);
};

const MultiValueContainer = (props) => {
	const { setNodeRef } = useDroppable({ id: 'droppable' });

	return (
		// <Tooltip content={'Customise your multi-value container!'}>
		<div ref={setNodeRef}>
			<components.MultiValueContainer {...props} />
		</div>
		// </Tooltip>
	);
};

const MultiValueRemove = (props) => {
	return (
		<components.MultiValueRemove
			{...props}
			innerProps={{
				onPointerDown: (e) => e.stopPropagation(),
				...props.innerProps,
			}}
		/>
	);
};

export const MultiSelect = (props) => {
	const {
		label,
		help,

		options,
		value,

		onChange,

		size = 'default', // 'compact',

		noClear = false,
		noSearch = false,

		disabled = false,

		closeAfterSelect = false,

		style = 'default', // 'black', 'reactSelectDefault'

		noOptionsMessage = __('No options', 'eightshift-frontend-libs'),

		additionalClass,
		additionalProps,
	} = props;

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id && value) {
			const mappedItems = value.map(({ id }) => id);
			const oldIndex = mappedItems?.indexOf(active.id) ?? -1;
			const newIndex = mappedItems?.indexOf(over.id) ?? -1;

			onChange(arrayMove([...value], oldIndex, newIndex));
		}
	};

	return (
		<>
			{label &&
				<span>{label}</span>
			}

			<DndContext
				modifiers={[restrictToParentElement]}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={value}
					strategy={horizontalListSortingStrategy}
				>
					<Select
						// menuPortalTarget={document.body}
						// menuPosition='fixed'
						distance={4}
						isMulti
						options={options}
						value={value}
						onChange={onChange}
						closeMenuOnSelect={closeAfterSelect}
						isClearable={!noClear}
						isSearchable={!noSearch}
						isDisabled={disabled}
						noOptionsMessage={() => (<span>{noOptionsMessage}</span>)}
						// className={`${additionalClass ?? ''}`}
						components={{
							MultiValue,
							MultiValueContainer,
							MultiValueRemove,
						}}
						{...additionalProps}
					/>
				</SortableContext>
			</DndContext>

			{help &&
				<span>{help}</span>
			}
		</>
	);
};
