import React from 'react';
import { __ } from '@wordpress/i18n';
import {
	checkAttr,
	getAttrKey,
	UseToggle,
	generateUseToggleConfig,
	Section,
	IconToggle,
	OptionSelector,
	icons,
	ReOrderable,
	ReOrderableItem,
} from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const SocialNetworksOptions = (attributes) => {
	const {
		setAttributes,

		hideModeSelector = false,
		hideNetworkPicker = false,
	} = attributes;

	const socialNetworksShareMode = checkAttr('socialNetworksShareMode', attributes, manifest);
	const socialNetworksNetworks = checkAttr('socialNetworksNetworks', attributes, manifest);
	const socialNetworksNetworksFiltered = socialNetworksNetworks
		.filter(({ id }) => socialNetworksShareMode ? manifest.networks?.[id]?.shareUrl?.length > 0 : manifest.networks?.[id]?.url?.length > 0);

	const modeOptions = [
		{
			label: __('Link to social networks', '%g_textdomain%'),
			icon: icons.link,
			value: false,
		},
		{
			label: __('Share to social networks', '%g_textdomain%'),
			icon: icons.share,
			value: true,
		}
	];

	const pickerSectionTitle = socialNetworksShareMode ? __('Share targets', '%g_textdomain%') : __('Social networks', '%g_textdomain%');

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'socialNetworksUse')}>
			{!hideModeSelector &&
				<OptionSelector
					icon={icons.gears}
					label={__('Mode', '%g_textdomain%')}
					value={socialNetworksShareMode}
					options={modeOptions}
					onChange={(value) => setAttributes({
						[getAttrKey('socialNetworksShareMode', attributes, manifest)]: value,
						[getAttrKey('socialNetworksNetworks', attributes, manifest)]: socialNetworksNetworks.map((network) => ({ ...network, enabled: false })),
					})}
					alignment='vertical'
				/>
			}

			<Section
				showIf={!hideNetworkPicker}
				label={!hideModeSelector && pickerSectionTitle}
				icon={!hideModeSelector && icons.globe}
				noBottomSpacing
			>
				<ReOrderable
					items={socialNetworksNetworksFiltered}
					attributeName={getAttrKey('socialNetworksNetworks', attributes, manifest)}
					setAttributes={setAttributes}
					noBottomSpacing
				>
					{socialNetworksNetworksFiltered
						.map((item, i) => {
							return (
								<ReOrderableItem
									key={item?.id}
									icon={<div className='es-line-h-0' dangerouslySetInnerHTML={{ __html: manifest?.networks?.[item.id]?.icon }} />}
									title={manifest?.networks?.[item.id]?.title}
									postIcon={
										<IconToggle
											checked={socialNetworksNetworksFiltered[i].enabled}
											onChange={(value) => {
												const newValue = [...socialNetworksNetworksFiltered];
												newValue[i].enabled = value;

												setAttributes({ [getAttrKey('socialNetworksNetworks', attributes, manifest)]: newValue });
											}}
											noBottomSpacing
										/>
									}
								/>
							);
						})}
				</ReOrderable>
			</Section>
		</UseToggle>
	);
};
