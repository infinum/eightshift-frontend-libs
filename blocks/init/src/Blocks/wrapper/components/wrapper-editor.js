import React from 'react';
import { useSelect } from '@wordpress/data';
import { outputCssVariables, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../manifest.json';

export const WrapperEditor = ({ clientId, attributes, children }) => {
	const {
		blockClass,
	} = attributes;

	const wrapperMainClass = 'wrapper';

	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);

	if (!wrapperDisable) {
		attributes.uniqueWrapperId = clientId;
	}

	const isEditMode = useSelect((select) => {
		return select('core/block-editor').isNavigationMode();
	});

	const GetGridLayout = () => {
		const items = [];

		for(let i = 1; i <= globalManifest.globalVariables.maxCols; i++) {
			items.push(<div className={`${wrapperMainClass}__grid-item`} key={i}>{i}</div>);
		}

		return (
			<div className={`${wrapperMainClass}__grid`}>
				{items}
			</div>
		);
	};

	return (
		<>
			{!wrapperDisable &&
				outputCssVariables(attributes, manifest, clientId, globalManifest, blockClass)
			}

			{isEditMode &&
				<GetGridLayout />
			}

			{children}
		</>
	);
};
