import React from 'react';
import { useSelect } from '@wordpress/data';
import { outputCssVariables, checkAttr, getUnique } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../manifest.json';

export const WrapperEditor = ({ attributes, children }) => {
	const {
		componentClass,
	} = manifest;

	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);

	if (wrapperDisable) {
		return children;
	}

	const isEditMode = useSelect((select) => {
		return select('core/block-editor').isNavigationMode();
	});

	const GetGridLayout = () => {
		const items = [];

		for(let i = 1; i <= globalManifest.globalVariables.maxCols; i++) {
			items.push(<div className={`${componentClass}__grid-item`} key={i}>{i}</div>);
		}

		return (
			<div className={`${componentClass}__grid`}>
				{items}
			</div>
		);
	};

	return (
		<>
			{isEditMode &&
				<GetGridLayout />
			}

			{children}
		</>
	);
};
