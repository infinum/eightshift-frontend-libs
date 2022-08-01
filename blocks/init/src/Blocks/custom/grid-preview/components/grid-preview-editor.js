import React from 'react';
import { select } from '@wordpress/data';
import { STORE_NAME } from '@eightshift/frontend-libs/scripts';

export const GridPreviewEditor = ({ attributes }) => {
	const {
		blockClass,
	} = attributes;

	const maxCols = select(STORE_NAME).getSettingsGlobalVariables()?.maxCols;

	const GridPreviewLayout = () => {
		const items = [];

		for(let i = 1; i <= maxCols; i++) {
			items.push(<div className={`${blockClass}__grid-item`} key={i}>{i}</div>);
		}

		return (
			<div className={`${blockClass}__grid`}>
				{items}
			</div>
		);
	};

	return (
		<GridPreviewLayout />
	);
};
