import React, { useRef } from 'react';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { Popover, Button, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * A toolbar button that allows picking an URL in a clean and simple way.
 * 
 * @param {object} props                          - LinkToolbarButton options.
 * @param {string?} props.url                     - Currently selected URL.
 * @param {boolean} props.opensInNewTab           - Currently selected option for opening the link in a new tab.
 * @param {function} props.setAttributes          - The `setAttributes` callback from component/block attributes.
 * @param {string} props.title                    - Name of the component/block displayed in the tooltip (*Use <title>*).
 * @param {string} props.urlAttrName              - Name of the `url` attribute (use `getAttrKey`)
 * @param {string} props.isNewTabAttrName         - Name of the `isNewTab` attribute (use `getAttrKey`)
 * @param {boolean} [props.showNewTabOption=true] - If `true`, displays the 'Open in new tab' toggle.
 * @param {string} [props.newTabOptionName]       - Name of the 'Opens in new tab' option shown in the interface.
 * @param {string} [props.removeLinkLabel]        - Label on the 'Remove link' button.
 * @param {boolean} [props.disabled=false]        - If `true`, control is disabled.
 */
export const LinkToolbarButton = ({
	url,
	opensInNewTab,
	setAttributes,
	urlAttrName,
	isNewTabAttrName,
	title,
	showNewTabOption = true,
	newTabOptionName = __('Open in new tab'),
	removeLinkLabel = __('Remove link'),
	disabled = false,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const ref = useRef();

	const openLinkControl = () => {
		setIsDropdownOpen(true);
		return false; // Prevents default behaviour for event.
	};

	const unlinkButton = () => {
		let newValues = {
			[urlAttrName]: undefined,
		};

		if (showNewTabOption) {
			newValues = {
				...newValues,
				[isNewTabAttrName]: undefined,
			};
		}

		setAttributes(newValues);
		setIsDropdownOpen(false);
	};

	let urlSettings = [];

	if (showNewTabOption) {
		urlSettings = [...urlSettings, {
			id: 'opensInNewTab',
			title: newTabOptionName,
		}
		];
	}

	let currentValue = {
		url
	};

	if (showNewTabOption) {
		currentValue = {
			...currentValue,
			opensInNewTab,
		};
	}

	const linkControl = isDropdownOpen && (
		<Popover
			position='bottom center'
			onClose={() => setIsDropdownOpen(false)}
			anchorRef={ref?.current}
		>
			<LinkControl
				value={currentValue}
				settings={urlSettings}
				onChange={({
					url: newUrl = '',
					opensInNewTab: newTab,
				}) => {
					let newValues = {
						[urlAttrName]: newUrl,
					};
			
					if (showNewTabOption) {
						newValues = {
							...newValues,
							[isNewTabAttrName]: newTab,
						};
					}
			
					setAttributes(newValues);
				}}
			/>
			{url &&
				<div style={{ padding: '1rem' }}>
					<Button
						onClick={unlinkButton}
						isDestructive={true}
						icon={linkOff}
						iconSize={24}
					>
						{removeLinkLabel}
					</Button>
				</div>
			}
		</Popover>
	);
	return (
		<>
			<ToolbarButton
				name='link'
				icon={link}
				title={sprintf(__('%s URL'), title)}
				onClick={openLinkControl}
				isActive={url?.length}
				disabled={disabled}
			/>
			{linkControl}
		</>
	);
};
