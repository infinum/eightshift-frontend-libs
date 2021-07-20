import React, { useRef } from 'react';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover, Button, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { truncateMiddle } from '@eightshift/frontend-libs/scripts/helpers';

/**
 * Options panel component that allows picking an URL in a clean and simple way.
 * 
 * @param {object} props                                        - LinkEditComponent options.
 * @param {string?} props.url                                   - Currently selected URL.
 * @param {boolean} props.opensInNewTab                         - Currently selected option for opening the link in a new tab.
 * @param {function} props.setAttributes                        - The `setAttributes` callback from component/block attributes.
 * @param {string} props.title                                  - Name of the component/block displayed in the tooltip (*Use <title>*).
 * @param {string} props.urlAttrName                            - Name of the `url` attribute (use `getAttrKey`)
 * @param {string} props.isNewTabAttrName                       - Name of the `isNewTab` attribute (use `getAttrKey`)
 * @param {string?} [props.textDomain=eightshift-frontend-libs] - Text domain to use for i18n.
 * @param {boolean} [props.showNewTabOption=true]               - If `true`, displays the 'Open in new tab' toggle.
 */
export const LinkEditComponent = ({
	url,
	opensInNewTab,
	setAttributes,
	urlAttrName,
	isNewTabAttrName,
	title,
	textDomain = 'eightshift-frontend-libs',
	showNewTabOption = true,
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
			title: __('Open in new tab', textDomain),
		}
		];
	}

	let currentValue = {
		url: url
	};

	if (showNewTabOption) {
		currentValue = {
			...currentValue,
			opensInNewTab: opensInNewTab,
		}
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
					
					if (newUrl !== url) {
						setIsDropdownOpen(false);
					}
				}}
			/>
		</Popover>
	);

	return (
		<BaseControl
			label={
				<>
					{icons.link}
					{sprintf(__('%s URL', textDomain), title)}
				</>
			}
		>
			<div className='es-simple-editor-button-row'>
				<Button
					isSecondary
					onClick={openLinkControl}
					icon={url?.length ? icons.editOptions : icons.add}
					text={url?.length ? __('Edit URL', textDomain) : __('Add URL', textDomain)}
				/>

				{url?.length > 0 &&
					<Button
						onClick={unlinkButton}
						isDestructive={true}
						icon={icons.trash}
						iconSize={24}
						label={__('Remove URL', textDomain)}
					/>
				}
			</div>

			{url?.length > 0 &&
				<span className='es-decorative-text'>{truncateMiddle(url, 40)}</span>
			}

			{linkControl}
		</BaseControl>
	);
}
