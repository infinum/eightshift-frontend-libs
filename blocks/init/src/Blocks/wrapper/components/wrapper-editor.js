import React from 'react';
import { outputCssVariables, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../manifest.json';

export const WrapperEditor = ({ clientId, attributes, children }) => {
	const {
		blockClass,
	} = attributes;

	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);

	if (!wrapperDisable) {
		attributes.uniqueWrapperId = clientId;
	}

	return (
		<>
			{!wrapperDisable &&
				outputCssVariables(attributes, manifest, clientId, globalManifest, blockClass)
			}

			{children}
		</>
	);
};
