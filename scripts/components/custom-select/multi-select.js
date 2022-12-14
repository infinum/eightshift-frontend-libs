import React from 'react';
import { __ } from '@wordpress/i18n';
import Select, { components } from 'react-select';
import { DndContext, useDroppable } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { defaultEightshiftColorScheme, defaultEightshiftStyles } from './custom-select-style';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator } from './custom-select-default-components';

export const MultiSelect = (props) => {
	const {
		label,
		help,

		options,
		value,

		onChange,

		noClear = false,
		noSearch = false,

		disabled = false,

		closeAfterSelect = false,

		noOptionsMessage = __('No options', 'eightshift-frontend-libs'),

		customClearIndicator,
		customDropdownArrow,
		customIndicatorSeparator,

		customMenuOption,
		customValueDisplay,
		customValueRemove,
		customValueContainer,

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

	const MultiValue = (props) => {
		const onMouseDown = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};

		const ComponentToRender = customValueDisplay ?? components.MultiValue;

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

	const MultiValueContainer = (props) => {
		const { setNodeRef } = useDroppable({ id: 'droppable' });

		const ComponentToRender = customValueContainer ?? components.MultiValueContainer;

		return (
			<div ref={setNodeRef}>
				<ComponentToRender {...props} />
			</div>
		);
	};

	const MultiValueRemove = (props) => {
		const ComponentToRender = customValueRemove ?? components.MultiValueRemove;

		return (
			<ComponentToRender
				{...props}
				innerProps={{
					onPointerDown: (e) => e.stopPropagation(),
					...props.innerProps,
				}} />
		);
	};

	return (
		<>
			{label &&
				<span>{label}</span>
			}

			<DndContext modifiers={[restrictToParentElement]} onDragEnd={handleDragEnd}>
				<SortableContext items={value.map(({ id }) => id)}>
					<Select
						isMulti
						options={options.map((item) => ({ id: item.value, ...item }))}
						value={value}
						onChange={onChange}
						closeMenuOnSelect={closeAfterSelect}
						isClearable={!noClear}
						isSearchable={!noSearch}
						isDisabled={disabled}
						className={`${additionalClass ?? ''}`}
						noOptionsMessage={() => (<span>{noOptionsMessage}</span>)}
						theme={defaultEightshiftColorScheme}
						styles={defaultEightshiftStyles}
						components={{
							MultiValue,
							MultiValueContainer,
							MultiValueRemove,

							Option: customMenuOption ?? components.Option,

							IndicatorSeparator: customIndicatorSeparator ?? null,
							DropdownIndicator: customDropdownArrow ?? CustomSelectDefaultDropdownIndicator,
							ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
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
