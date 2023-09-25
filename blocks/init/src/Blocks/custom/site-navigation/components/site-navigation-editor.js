import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button, TextControl } from '@wordpress/components';
import {
	LinkEditComponent,
	PopoverWithTrigger,
	ReOrderable,
	ReOrderableItem,
	checkAttr,
	classnames,
	getAttrKey,
	icons,
	props,
	selector,
} from '@eightshift/frontend-libs/scripts';
import { ImageEditor } from '../../../components/image/components/image-editor';
import manifest from '../manifest.json';

export const SiteNavigationEditor = ({ attributes, setAttributes }) => {
	const {
		blockClass,
	} = attributes;

	const linksClass = selector(blockClass, blockClass, 'links');

	const linkClass = classnames(selector(
		blockClass, blockClass, 'link'),
		'es-border-cool-gray-100 es-cursor-pointer es-bg-none es-pl-2 es-pr-1.25 es-py-1 es-rounded-2',
	);

	const siteNavigationLinks = checkAttr('siteNavigationLinks', attributes, manifest);

	return (
		<div className={blockClass}>
			<ImageEditor
				{...props('logo', attributes, {
					setAttributes,
					blockClass: blockClass,
					selectorClass: 'logo',
				})}
			/>

			<div className={linksClass}>
				<ReOrderable
					items={siteNavigationLinks}
					attributeName={getAttrKey('siteNavigationLinks', attributes, manifest)}
					setAttributes={setAttributes}
					noBottomSpacing
					horizontalVertical
					additionalHorizontalVerticalContainerClasses='es-h-spaced-wrap'
				>
					{siteNavigationLinks.map((link, i) => {
						return (
							<ReOrderableItem
								innerClass={linkClass}
								title={link?.text?.length > 0 ? link.text : <i>{__('New link', 'eightshift-frontend-libs')}</i>}
								preIcon={
									<div className='es-display-flex'>
										<button
											onClick={() => {
												const newValue = [...siteNavigationLinks].filter((_, index) => index !== i);
												setAttributes({ [getAttrKey('siteNavigationLinks', attributes, manifest)]: newValue });
											}}
											// eslint-disable-next-line max-len
											className='es-button-reset es-bg-transparent es-cursor-pointer es-color-cool-gray-650 es-hover-color-admin-accent es-mr-1 es-line-h-0'
										>
											{icons.trash}
										</button>

										<PopoverWithTrigger
											trigger={({ ref, setIsOpen, isOpen }) => (
												<button
													ref={ref}
													onClick={() => setIsOpen(!isOpen)}
													// eslint-disable-next-line max-len
													className='es-button-reset es-bg-transparent es-cursor-pointer es-color-cool-gray-650 es-hover-color-admin-accent es-mr-1 es-line-h-0'
												>
													{icons.editOptions}
												</button>
											)}
											contentClass='es-popover-content es-w-88'
										>
											<TextControl
												label={__('Link text', 'eightshift-frontend-libs')}
												value={link?.text}
												onChange={(value) => {
													const newValue = [...siteNavigationLinks];
													newValue[i].text = value;

													setAttributes({ [getAttrKey('siteNavigationLinks', attributes, manifest)]: newValue });
												}}
											/>

											<LinkEditComponent
												label={__('URL', 'eightshift-frontend-libs')}
												url={link?.url}
												opensInNewTab={link?.newTab}
												onChange={({ url, newTab }) => {
													const newValue = [...siteNavigationLinks];

													if (typeof url !== 'undefined') {
														newValue[i].url = url;
													}

													if (typeof newTab !== 'undefined') {
														newValue[i].newTab = newTab;
													}

													setAttributes({ [getAttrKey('siteNavigationLinks', attributes, manifest)]: newValue });
												}}
												hideAnchorNotice
												noBottomSpacing
											/>
										</PopoverWithTrigger>
									</div>
								}
								key={link?.id}
							/>
						);
					})}
				</ReOrderable>

				<Button
					icon={icons.plusCircleFillAlt}
					className='es-button-square-28 es-button-icon-24'
					onClick={() => {
						setAttributes({
							[getAttrKey('siteNavigationLinks', attributes, manifest)]: [
								...siteNavigationLinks,
								{
									id: (siteNavigationLinks?.length ?? 0) + 1,
									url: '',
									text: '',
									newTab: false,
								}],
						});
					}}
				/>
			</div>
		</div>
	);
};
