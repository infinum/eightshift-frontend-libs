import React from 'react';
import { selector, checkAttr, classnames, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const SocialNetworksEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
		setAttributes,

		noClickToToggleNetwork = false,
	} = attributes;

	const socialNetworksUse = checkAttr('socialNetworksUse', attributes, manifest);

	if (!socialNetworksUse) {
		return null;
	}

	const socialNetworksNetworks = checkAttr('socialNetworksNetworks', attributes, manifest);

	const socialNetworksClasses = classnames(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
		additionalClass,
	);

	const linkClass = classnames(
		selector(componentClass, componentClass, 'link'),
		'es-line-h-0 es-transition-opacity',
	);

	return (
		<div className={socialNetworksClasses}>
			{socialNetworksNetworks.map((network, i) => {
				return (
					<button
						key={i}
						className={classnames(linkClass, !network.enabled && 'es-opacity-10')}
						dangerouslySetInnerHTML={{ __html: manifest.networks[network.id].icon }}
						onClick={noClickToToggleNetwork ? null : () => {
							const newValue = [...socialNetworksNetworks];
							newValue[i].enabled = !newValue[i].enabled;

							setAttributes({ [getAttrKey('socialNetworksNetworks', attributes, manifest)]: newValue });
						}}
					/>
				);
			})}
		</div>
	);
};
