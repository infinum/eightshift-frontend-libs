import React, { useRef } from 'react';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover, Button, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { IconLabel, icons, truncateMiddle } from '../../../scripts';

/**
 * Options panel component that allows picking an URL in a clean and simple way.
 * 
 * @param {object} props                                                            - LinkEditComponent options.
 * @param {string?} props.url                                                       - Currently selected URL.
 * @param {boolean} props.opensInNewTab                                             - Currently selected option for opening the link in a new tab.
 * @param {function} props.setAttributes                                            - The `setAttributes` callback from component/block attributes.
 * @param {string} props.title                                                      - Name of the component/block displayed in the tooltip (*Use <title>*).
 * @param {string} props.urlAttrName                                                - Name of the `url` attribute (use `getAttrKey`)
 * @param {string} props.isNewTabAttrName                                           - Name of the `isNewTab` attribute (use `getAttrKey`)
 * @param {boolean} [props.showNewTabOption=true]                                   - If `true`, displays the 'Open in new tab' toggle.
 * @param {string} [props.newTabOptionName]                                         - Name of the 'Opens in new tab' option shown in the interface.
 * @param {string} [props.removeLinkTooltip]                                        - 'Remove link' button tooltip.
 * @param {string} [props.editUrlLabel]                                             - 'Edit URL' button label (when URL is set).
 * @param {string} [props.addUrlLabel]                                              - 'Add URL' button label (when URL is not set).
 * @param {boolean} [props.disabled=false]                                          - If `true`, control is disabled.
 * @param {boolean} [props.hasDeleteButton=true]                                    - If `true`, the component has a 'Remove link' button when a link is selected.
 * @param {boolean} [props.hasUrlPreview=true]                                      - If `true`, a URL preview is shown inside the component.
 * @param {React.Component?} [props.additionalOptions]                              - If `true`, displays a URL label editor in the options.
 * @param {React.Component?} [props.removeButtonIcon=icons.trash]                   - Allows overriding the 'Remove link' button icon.
 * @param {React.Component?} [props.label]                                          - Allows overriding the default component label.
 * @param {React.Component?} [props.help]                                           - Help text shown below the component
 * @param {'default'|'compact'|'button'|'iconButton'} [props.displayMode='default'] - Sets the component display mode.
 */
export const LinkEditComponent = ({
	url,
	opensInNewTab,
	setAttributes,
	urlAttrName,
	isNewTabAttrName,
	title,
	showNewTabOption = true,
	newTabOptionName = __('Open in new tab'),
	removeLinkTooltip = __('Remove link'),
	editUrlLabel = __('Edit URL'),
	addUrlLabel = __('Add URL'),
	disabled = false,
	hasDeleteButton = true,
	hasUrlPreview = true,
	additionalOptions,
	removeButtonIcon = icons.trash,
	label = (<IconLabel icon={icons.link} label={sprintf(__('%s URL'), title)} standalone />),
	help,
	displayMode = 'default',
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const ref = useRef();
	const refCompact = useRef();

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
			anchorRef={displayMode === 'compact' ? refCompact?.current : ref?.current}
			noArrow={false}
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

			{((url?.length > 0 && hasDeleteButton && (displayMode === 'compact' || displayMode === 'iconButton' || displayMode === 'button')) || additionalOptions) &&
				<div className='es-popover-content es-v-start'>
					{additionalOptions}

					{url?.length > 0 && hasDeleteButton &&
						<Button
							onClick={unlinkButton}
							isDestructive={true}
							icon={removeButtonIcon}
							iconSize={24}
							disabled={disabled}
							className='es-button-no-outline'
						>
							{removeLinkTooltip}
						</Button>
					}
				</div>
			}
		</Popover>
	);

	if (displayMode === 'iconButton') {
		return (
			<>
				<Button
					onClick={openLinkControl}
					icon={icons.link}
					iconSize={24}
					disabled={disabled}
					label={url?.length > 0 ? editUrlLabel : addUrlLabel}
					isPressed={url?.length > 0}
					ref={ref}
					className='es-button-icon-24'
				/>

				{linkControl}
			</>
		);
	}

	if (displayMode === 'button') {
		return (
			<>
				<Button
					onClick={openLinkControl}
					icon={icons.link}
					iconSize={24}
					disabled={disabled}
					isPressed={url?.length > 0}
					ref={ref}
					className='es-button-icon-24'
				>
					{label}
				</Button>

				{linkControl}
			</>
		);
	}

	const editIcon = showNewTabOption ? icons.editOptions : icons.edit;

	return (
		<BaseControl
			label={
				<div className='es-flex-between'>
					{label}

					{displayMode === 'compact' &&
						<div className='es-h-spaced'>
							<Button
								isTertiary
								onClick={openLinkControl}
								icon={url?.length > 0 ? editIcon : icons.plusCircle}
								iconSize={24}
								disabled={disabled}
								label={url?.length > 0 ? editUrlLabel : addUrlLabel}
								ref={refCompact}
							/>
						</div>
					}
				</div>
			}
			help={help}
		>
			{displayMode !== 'compact' &&
				<div className='es-simple-editor-button-row'>
					<Button
						isSecondary
						onClick={openLinkControl}
						icon={url?.length > 0 ? editIcon : icons.add}
						iconSize={24}
						disabled={disabled}
						ref={ref}
					>
						{url?.length > 0 ? editUrlLabel : addUrlLabel}
					</Button>

					{url?.length > 0 && hasDeleteButton &&
						<Button
							onClick={unlinkButton}
							isDestructive={true}
							icon={removeButtonIcon}
							iconSize={24}
							label={removeLinkTooltip}
							disabled={disabled}
						/>
					}
				</div>
			}

			{url?.length > 0 && hasUrlPreview &&
				<span className={`es-decorative-text ${displayMode === 'compact' ? 'es-link-edit-component-compact-label' : ''}`}>
					{truncateMiddle(url, 40)}
				</span>
			}

			{linkControl}
		</BaseControl>
	);
};
