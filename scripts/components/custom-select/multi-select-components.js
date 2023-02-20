import React from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const getDragEndHandler = (onChange, items) => {
	return (event) => {
		const { active, over } = event;

		if (active.id !== over.id && items) {
			const mappedItems = items.map(({ id }) => id);
			const oldIndex = mappedItems?.indexOf(active.id) ?? -1;
			const newIndex = mappedItems?.indexOf(over.id) ?? -1;

			onChange(arrayMove([...items], oldIndex, newIndex));
		}

	};
};

export const getMultiValue = (ComponentToRender) => {
	return (props) => {
		const onMouseDown = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};

		const innerProps = { ...props.innerProps, onMouseDown };

		const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.data.id });

		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
		};

		return (
			<div style={style} ref={setNodeRef} {...attributes} {...listeners}>
				<ComponentToRender {...props} innerProps={innerProps} />
			</div>
		);
	};
};

export const getMultiValueContainer = (ComponentToRender) => {
	return (props) => {
		const { setNodeRef } = useDroppable({ id: 'droppable' });

		return (
			<div ref={setNodeRef}>
				<ComponentToRender {...props} />
			</div>
		);
	};
};

export const getMultiValueRemove = (ComponentToRender) => {
	return (props) => (
		<ComponentToRender
			{...props}
			innerProps={{
				onPointerDown: (e) => e.stopPropagation(),
				...props.innerProps,
			}}
		/>
	);
};
