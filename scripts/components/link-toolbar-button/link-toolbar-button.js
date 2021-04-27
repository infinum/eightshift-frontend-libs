import React from 'react';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { Popover, Button, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

export const LinkToolbarButton = ({
	componentName,
	url,
	opensInNewTab,
	setAttributes,
	anchorRef,
	title,
	textDomain = ''
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const openLinkControl = () => {
		setIsDropdownOpen(true);
		return false; // Prevents default behaviour for event.
	};

	const urlAttribute = `${componentName}Url`;
	const opensInNewTabAttribute = `${componentName}IsNewTab`;

	const unlinkButton = () => {
		setAttributes({
			[urlAttribute]: undefined,
			[opensInNewTabAttribute]: undefined,
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
						[urlAttribute]: newUrl,
						[opensInNewTabAttribute]: newTab
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
