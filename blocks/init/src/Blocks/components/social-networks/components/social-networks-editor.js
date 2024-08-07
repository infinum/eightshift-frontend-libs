import React from 'react';
import { selector, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';
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

	const socialNetworksShareMode = checkAttr('socialNetworksShareMode', attributes, manifest);
	const socialNetworksNetworks = checkAttr('socialNetworksNetworks', attributes, manifest);
	const socialNetworksNetworksFiltered = socialNetworksNetworks
		.filter(({ id }) => socialNetworksShareMode ? manifest.networks?.[id]?.shareUrl?.length > 0 : manifest.networks?.[id]?.url?.length > 0);

	const socialNetworksClasses = clsx(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
		additionalClass,
	);

	const linkClass = clsx(
		selector(componentClass, componentClass, 'link'),
		'es-line-h-0 es-transition-opacity',
	);

	return (
		<div className={socialNetworksClasses}>
			{socialNetworksNetworksFiltered.map((network, i) => {
				return (
					<button
						key={i}
						className={clsx(linkClass, !network.enabled && 'es-opacity-10')}
						dangerouslySetInnerHTML={{ __html: manifest.networks[network.id].icon }}
						onClick={noClickToToggleNetwork ? null : () => {
							const newValue = [...socialNetworksNetworksFiltered];
							newValue[i].enabled = !newValue[i].enabled;

							setAttributes({ [getAttrKey('socialNetworksNetworks', attributes, manifest)]: newValue });
						}}
					/>
				);
			})}
		</div>
	);
};
