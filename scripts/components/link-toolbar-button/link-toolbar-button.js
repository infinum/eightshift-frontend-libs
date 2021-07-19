import React from 'react';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { Popover, Button, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * A toolbar button that allows picking an URL in a clean and simple way.
 * 
 * @param {object} props                                        - LinkToolbarButton options.
 * @param {string} props.componentName                          - Component name used in generating attribute names: `<componentName>Url` and `<componentName>IsNewTab`
 * @param {string?} props.url                                   - Currently selected URL.
 * @param {boolean} props.opensInNewTab                         - Currently selected option for opening the link in a new tab.
 * @param {function} props.setAttributes                        - The `setAttributes` callback from component/block attributes.
 * @param {object} props.anchorRef                              - A reference from the `useRef` React hook.
 * @param {string} props.title                                  - Name of the component/block displayed in the tooltip (*Use <title>*).
 * @param {string?} [props.textDomain=eightshift-frontend-libs] - Text domain to use for i18n.
 */
export const LinkToolbarButton = ({
	url,
	opensInNewTab,
	setAttributes,
	anchorRef,
	title,
	textDomain = 'eightshift-frontend-libs',
	onChangeUrl,
	onChangeIsNewTab,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const openLinkControl = () => {
		setIsDropdownOpen(true);
		return false; // Prevents default behaviour for event.
	};

	const unlinkButton = () => {
		setAttributes({
			[`${onChangeUrl}`]: undefined,
			[`${onChangeIsNewTab}`]: undefined,
		});
		setIsDropdownOpen(false);
	};

	const linkControl = isDropdownOpen && (
		<Popover
			position='bottom center'
			onClose={() => setIsDropdownOpen(false)}
			anchorRef={anchorRef?.current}
		>
			<LinkControl
				value={{ url, opensInNewTab }}
				settings={
					[
						{
							id: 'opensInNewTab',
							title: __('Open in new tab', textDomain),
						}
					]
				}
				onChange={({
					url: newUrl = '',
					opensInNewTab: newTab,
				}) => {
					setAttributes({
						[`${onChangeUrl}`]: newUrl,
						[`${onChangeIsNewTab}`]: newTab
					});
				}}
			/>
			<div style={{ padding: '1rem' }}>
				<Button
					onClick={unlinkButton}
					isDestructive={true}
					icon={linkOff}
				>
					{__('Remove link', textDomain)}
				</Button>
			</div>
		</Popover>
	);
	return (
		<>
			<ToolbarButton
				name="link"
				icon={link}
				title={sprintf(__('%s URL', textDomain), title)}
				onClick={openLinkControl}
				isActive={url?.length}
			/>
			{linkControl}
		</>
	);
}
