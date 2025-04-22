import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button as GutenbergButton } from '@wordpress/components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RichLabel, Menu, MenuItem, Expandable } from '@eightshift/ui-components';
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
		isOnly,
		noReordering,
		hideRemove,
		additionalMenuOptions,
		preIcon,
		additionalLabelContainerClass,
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

	const itemLabel = (
		<RichLabel
			icon={icon}
			label={title}
			subtitle={subtitle}
		/>
	);

	const expandDisabled = Array.isArray(props?.children) ? props?.children?.filter(Boolean)?.length < 1 : !props?.children;

	return (
		<div ref={setNodeRef} style={style}>
			<Expandable
				icon={preIcon}
				label={itemLabel}
				disabled={expandDisabled}
				className={additionalLabelContainerClass}
				actions={
					<div className='es:flex es:items-center'>
						<GutenbergButton
							{...additionalTriggerProps}
							className={clsx(
								'[&>svg]:es:size-5 es:min-w-5 es:w-5',
								isOnly ? 'es:hidden' : 'es:opacity-50',
							)}
							size='small'
							icon={icons.reorderGrabberV}
							disabled={noReordering}
						/>

						<Menu
							hidden={!(!hideRemove || additionalMenuOptions)}
							triggerIcon={icons.hamburgerMenu}
							triggerProps={{ size: 'small', type: 'ghost' }}
						>
							{!hideRemove &&
								<MenuItem icon={icons.trash} onClick={onRemove}>
									{__('Remove', 'eightshift-frontend-libs')}
								</MenuItem>
							}

							{additionalMenuOptions}
						</Menu>
					</div>
				}
			>
				{props.children}
			</Expandable>
		</div>
	);
};
