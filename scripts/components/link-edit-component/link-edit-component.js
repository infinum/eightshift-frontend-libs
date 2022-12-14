import React, { useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { __experimentalLinkControlSearchInput as LinkControlSearchInput } from '@wordpress/block-editor';
import { Popover, Button, KeyboardShortcuts, Animate } from '@wordpress/components';
import { filterURLForDisplay } from '@wordpress/url';
import { IconLabel, icons, IconToggle } from '../../../scripts';

/**
 * Options panel component that allows picking an URL in a clean and simple way.
 *
 * @param {object} props                                          - LinkEditComponent options.
 * @param {string?} props.url                                     - Currently selected URL.
 * @param {boolean} props.opensInNewTab                           - Currently selected option for opening the link in a new tab.
 * @param {callback} props.onChange                               - Gets called when the state changes. The return value is in the format: `{url: '', newTab: true|false, isAnchor: true|false}`
 * @param {React.Component?} [props.label='URL']                  - If provided, overrides the default component label.
 * @param {React.Component?} [props.help]                         - Help text shown below the component.
 * @param {React.Component?} [props.icon=icons.globe]             - If provided, overrides the default component icon.
 * @param {React.Component?} [props.removeIcon=icons.trash]       - If provided, overrides the default remove icon.
 * @param {React.Component?} [props.anchorIcon=icons.globeAnchor] - If provided, overrides the default component icon when an anchor link is selected.
 * @param {boolean} [props.disabled=false]                        - If `true`, control is disabled.
 * @param {boolean} [props.noDelete=false]                        - If `true`, no remove button is shown.
 * @param {boolean} [props.hideOpensInNewTab=false]               - If `true`, the 'Opens in new tab' button is not shown.
 * @param {boolean} [props.hideAnchorNotice=false]                - If `true`, the Anchor link info banner is not shown when an anchor link is selected.
 * @param {boolean} [props.noBottomSpacing=false]                 - If `true`, the default bottom spacing is removed.
 * @param {string?} [props.additionalClass]                       - If passed, the classes are forwarded to the component.
 * @param {React.Component?} [props.additionalOptions]            - If provided, allows adding options below the option tiles.
 * @param {React.Component?} [props.additionalOptionTiles]        - If provided, allows adding additional option tiles.
 */
export const LinkEditComponent = ({
	url,
	opensInNewTab,

	onChange,

	label = __('URL', 'eightshift-frontend-libs'),
	help,

	icon = icons.globe,
	removeIcon = icons.trash,
	anchorIcon = icons.globeAnchor,

	disabled = false,

	noDelete = false,
	hideOpensInNewTab = false,
	hideAnchorNotice = false,

	noBottomSpacing = false,

	additionalClass,

	additionalOptions,
	additionalOptionTiles,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef();

	const hasUrl = url?.trim()?.length > 0;
	const isAnchor = hasUrl && url?.includes('#');
	const isInternalAnchor = hasUrl && url?.startsWith('#');

	const [inputValue, setInputValue] = useState(url ?? '');
	const [isEditing, setIsEditing] = useState(false);

	const handleSelectSuggestion = ({ url }) => {
		onChange({ url: url, isAnchor: url?.includes('#') });
		setInputValue(url);
		setIsEditing(false);
	};

	const handleChange = (newUrl) => {
		setInputValue(newUrl);
		setIsEditing(true);
	};

	const handleAddCustomSuggestion = (newUrl) => {
		onChange({ url: newUrl, isAnchor: newUrl?.includes('#') });
		setInputValue(newUrl);
		setIsEditing(false);
	};

	const suggestionsRender = (props) => {
		if (!isEditing) {
			return null;
		}

		const {
			isLoading,
			suggestions,
			handleSuggestionClick,
		} = props;

		console.log({ props });

		return (
			<>
				{isLoading &&
					<IconLabel icon={icons.clock} label={__('Loading', 'eightshift-frontend-libs')} additionalClasses='es-mt-3! es-mb-4!' standalone />
				}

				{!isLoading &&
					<Animate type='slide-in' options={{ origin: 'bottom' }}>
						{({ className }) => (
							<div className={`${className} es-v-spaced es-gap-1! es-max-h-44 es-mt-3 es-pb-3 es-px-0.5`} style={{ overflowY: 'auto' }}>
								{suggestions.map((suggestion, i) => {
									const { title, type, url } = suggestion;

									let typeIcon = (<span className='es-p-1 es-rounded-1 es-bg-cool-gray-500 es-color-pure-white es-text-2.5 es-font-weight-600'>{type.toUpperCase()}</span>);

									const isCreateNew = type.toLowerCase() === '__create__';

									if (type.toLowerCase() === 'url') {
										typeIcon = icons.externalLink;
									} else if (type.toLowerCase() === 'attachment') {
										typeIcon = icons.file;
									} else if (type.toLowerCase() === 'category') {
										typeIcon = icons.layoutAlt;
									} else if (type.toLowerCase() === 'internal') {
										typeIcon = icons.anchor;
									} else if (isCreateNew) {
										typeIcon = icons.plusCircleFillAlt;
									}

									return (
										<Button key={i} onClick={() => handleSuggestionClick(suggestion)} className='es-rounded-1.5! es-px-2.5! es-h-14!'>
											<IconLabel
												icon={<span className='es-w-10 es-display-flex es-items-center es-content-center es-flex-shrink-0'>{typeIcon}</span>}
												label={title}
												subtitle={isCreateNew ? __('Click to add', 'eightshift-frontend-libs') : filterURLForDisplay(url, 36)}
												additionalClasses='es-has-v2-gutenberg-button-active-state es-text-align-left es-flex-row-reverse es-h-between es-w-full es-color-cool-gray-600'
												addSubtitleGap
												standalone
											/>
										</Button>
									);
								})}
							</div>
						)}
					</Animate>
				}
			</>
		);
	};

	return (
		<>
			<div className={`es-v-spaced ${noBottomSpacing ? '' : 'es-mb-5'} ${additionalClass ?? ''}`}>
				<Button
					onClick={() => setIsOpen(!isOpen)}
					label={hasUrl ? __('Edit URL', 'eighshift-frontend-libs') : __('Add an URL', 'eightshift-frontend-libs')}
					className='es-button-icon-24 es-text-align-left es-w-full es-h-11 es-rounded-1.5! es-py-0! es-px-2! es-slight-button-border-cool-gray-300 es-hover-slight-button-border-cool-gray-400 es-focus-slight-button-border-admin-accent'
					disabled={disabled}
					showTooltip
				>
					<IconLabel
						icon={<div className='es-line-h-0' ref={ref}>{url?.length > 0 && url?.includes('#') ? anchorIcon : icon}</div>}
						subtitle={hasUrl ? filterURLForDisplay(url, 22) : __('Click to add', 'eightshift-frontend-libs')}
						additionalClasses='es-nested-color-cool-gray-650'
						label={label}
						standalone
					/>

					<div className='es-nested-color-cool-gray-400 es-ml-auto es-line-h-0'>
						{url?.length > 0 ? icons.edit : icons.plusCircle}
					</div>
				</Button>

				{help &&
					<span className='es-text-3 es-color-cool-gray-500'>{help}</span>
				}
			</div>

			{isOpen &&
				<Popover
					position='bottom center'
					onClose={() => setIsOpen(false)}
					anchor={ref?.current}
					noArrow={false}
				>
					<div className={`es-px-4 es-pt-4 ${isEditing && inputValue?.length >= 2 ? '' : 'es-pb-4'} es-w-92`}>
						<KeyboardShortcuts
							shortcuts={{
								'enter': (e) => {
									if (!e.key.toLowerCase() !== 'enter' || !isEditing) {
										return;
									}

									e.preventDefault();
									e.stopPropagation();

									handleChange(inputValue);
								}
							}}
						>
							<LinkControlSearchInput
								value={inputValue}

								onChange={handleChange}
								onSelect={handleSelectSuggestion}

								withCreateSuggestion
								onCreateSuggestion={handleAddCustomSuggestion}
								renderSuggestions={(props) => suggestionsRender(props)}

								className='es-link-edit-component__url-field es-m-0-bcf!'
								placeholder={__('Search or enter URL', 'eightshift-frontend-libs')}
							>
								{hasUrl && !noDelete &&
									<Button
										onClick={() => {
											setInputValue('');
											onChange({ url: null });
										}}
										icon={removeIcon}
										disabled={disabled}
										className='es-link-edit-component__delete-button es-button-no-outline es-button-icon-24 es-nested-color-red-500 es-rounded-1'
										label={__('Remove', 'eightshift-frontend-libs')}
										showTooltip
									/>
								}
							</LinkControlSearchInput>
						</KeyboardShortcuts>
					</div>

					{isAnchor && !isInternalAnchor && !isEditing && !hideAnchorNotice &&
						<div className='es-mx-4 es-mb-4 es-p-3 es-bg-cool-gray-50 es-rounded-1.5'>
							<IconLabel
								icon={icons.globeAnchor}
								label={__('Anchor link selected', 'eightshift-frontend-libs')}
								subtitle={__('Links to an element on a page', 'eightshift-frontend-libs')}
								additionalClasses='es-nested-color-cool-gray-500'
								standalone
							/>
						</div>
					}

					{isInternalAnchor && !isEditing && !hideAnchorNotice &&
						<div className='es-mx-4 es-mb-4 es-p-3 es-bg-cool-gray-50 es-rounded-1.5'>
							<IconLabel
								icon={icons.anchorPage}
								label={__('Internal anchor link selected', 'eightshift-frontend-libs')}
								subtitle={__('Links to an element on the current page', 'eightshift-frontend-libs')}
								additionalClasses='es-nested-color-cool-gray-500'
								standalone
							/>
						</div>
					}

					{(!hideOpensInNewTab || additionalOptionTiles) &&
						<div className='es-p-4 es-h-spaced es-w-92 es-border-t-gray-400'>
							{!hideOpensInNewTab &&
								<IconToggle
									icon={icons.newTab}
									label={__('Open in new tab', 'eightshift-frontend-libs')}
									checked={opensInNewTab}
									onChange={(value) => onChange({ newTab: value })}
									type='tileButton'
									disabled={isEditing}
								/>
							}

							{additionalOptionTiles}
						</div>
					}

					{url?.length > 0 && additionalOptions &&
						<div className='es-popover-content es-v-start es-w-92 es-border-t-gray-400'>
							{additionalOptions}
						</div>
					}
				</Popover>
			}
		</>
	);
};
