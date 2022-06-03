import React, { useRef } from 'react';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover, Button, BaseControl, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { IconLabel, icons, truncateMiddle } from '../../../scripts';
import { IconToggle } from '@eightshift/frontend-libs/scripts/components/icon-toggle/icon-toggle';

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
 * @param {boolean} [props.hasUrlPreview=false]                                     - If `true`, and icon and label are provided separately, a URL preview is shown inside the component.
 * @param {React.Component?} [props.additionalOptions]                              - If `true`, displays a URL label editor in the options.
 * @param {React.Component?} [props.removeButtonIcon=icons.trash]                   - Allows overriding the 'Remove link' button icon.
 * @param {React.Component?} [props.label]                                          - Allows overriding the default component label.
 * @param {React.Component?} [props.icon]                                           - If provided, displays an icon.
 * @param {React.Component?} [props.help]                                           - Help text shown below the component.
 * @param {'default'|'legacy'|'button'|'iconButton'} [props.displayMode='default']  - Sets the component display mode.
 * @param {string?} [props.additionalClass]                                         - If passed, the classes are forwarded to the component.
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
	editUrlLabel = __('Edit'),
	addUrlLabel = __('Add'),
	disabled = false,
	hasDeleteButton = true,
	hasUrlPreview = true,
	additionalOptions,
	removeButtonIcon = icons.trash,
	icon,
	label = (<IconLabel icon={icons.link} label={sprintf(__('%s URL'), title)} standalone />),
	help,
	displayMode = 'default',
	additionalClass,
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

	if (showNewTabOption) {
		// eslint-disable-next-line no-param-reassign
		additionalOptions = (
			<>
				<IconToggle
					icon={icons.newTab}
					label={newTabOptionName}
					checked={opensInNewTab}
					onChange={(value) => setAttributes({ [isNewTabAttrName]: value })}
					additionalClasses='es-w-full'
				/>

				{additionalOptions}
			</>
		);
	}

	const linkControl = isDropdownOpen && (
		<Popover
			position='bottom center'
			onClose={() => setIsDropdownOpen(false)}
			anchorRef={ref?.current}
			noArrow={false}
		>
			<LinkControl
				value={{ url }}
				settings={[]}
				onChange={({
					url: newUrl = ''
				}) => {
					setAttributes({
						[urlAttrName]: newUrl,
					});

					if (newUrl !== url) {
						setIsDropdownOpen(false);
					}
				}}
			/>

			{url?.length > 0 && (hasDeleteButton || additionalOptions) &&
				<div className='es-popover-content es-v-start'>
					{additionalOptions}

					{url?.length > 0 && hasDeleteButton &&
						<Button
							onClick={unlinkButton}
							isDestructive={true}
							icon={removeButtonIcon}
							disabled={disabled}
							className='es-button-no-outline es-button-icon-24'
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
					icon={icon ?? icons.link}
					disabled={disabled}
					label={url?.length > 0 ? editUrlLabel : addUrlLabel}
					isPressed={url?.length > 0}
					ref={ref}
					className={`es-button-icon-24 ${additionalClass ?? ''}`}
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
					icon={icon ?? icons.link}
					disabled={disabled}
					isPressed={url?.length > 0}
					ref={ref}
					className={`es-button-icon-24 ${additionalClass ?? ''}`}
				>
					{label}
				</Button>

				{linkControl}
			</>
		);
	}

	const editIcon = showNewTabOption ? icons.editOptions : icons.edit;

	let labelToDisplay = label;

	if (icon) {
		const urlPreview = url?.length > 0 ? <Tooltip text={<span>{url}</span>}><span>{truncateMiddle(url?.replace('https://', '')?.replace(/\/{1}$/, ''), displayMode === 'legacy' ? 22 : 28)}</span></Tooltip> : null;

		labelToDisplay = (
			<IconLabel
				icon={icon}
				label={label}
				subtitle={hasUrlPreview && url?.length > 0 ? urlPreview : null}
				standalone
			/>
		);
	}

	if (displayMode === 'legacy') {
		return (
			<BaseControl help={help} className={additionalClass ?? ''}>
				<div className='es-flex-between'>
					{labelToDisplay}

					<Button
						onClick={openLinkControl}
						icon={url?.length > 0 ? editIcon : icons.plusCircle}
						disabled={disabled}
						ref={ref}
						className='es-button-icon-24 es-slight-button-border es-flex-shrink-0'
					>
						{url?.length > 0 ? editUrlLabel : addUrlLabel}
					</Button>
				</div>

				{linkControl}
			</BaseControl>
		);
	}

	return (
		<BaseControl help={help} className={additionalClass ?? ''}>
			<div className='es-flex-between'>
				{labelToDisplay}

				<Button
					onClick={openLinkControl}
					icon={url?.length > 0 ? editIcon : icons.plusCircle}
					disabled={disabled}
					label={url?.length > 0 ? editUrlLabel : addUrlLabel}
					ref={ref}
					className='es-button-icon-24 es-button-square-36'
				/>
			</div>

			{linkControl}
		</BaseControl>
	);
};
