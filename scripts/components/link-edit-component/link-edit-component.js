import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { __experimentalLinkControlSearchInput as LinkControlSearchInput } from '@wordpress/block-editor';
import { Button, KeyboardShortcuts } from '@wordpress/components';
import { AnimatedContentVisibility, Control, IconLabel, icons, IconToggle, truncateMiddle } from '../../../scripts';

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

	label = __('Link', 'eightshift-frontend-libs'),
	help,
	actions,

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
	const hasUrl = url?.trim()?.length > 0;
	const isAnchor = hasUrl && url?.includes('#');
	const isInternalAnchor = hasUrl && url?.startsWith('#');

	const [inputValue, setInputValue] = useState(url ?? '');
	const [isEditing, setIsEditing] = useState(false);

	const handleSelectSuggestion = ({ url }) => {
		onChange({ url: url, isAnchor: url?.includes('#'), newTab: opensInNewTab });
		setInputValue(url);
		setIsEditing(false);
	};

	const handleChange = (newUrl) => {
		setInputValue(newUrl);
		setIsEditing(true);
	};

	const handleAddCustomSuggestion = (newUrl) => {
		onChange({ url: newUrl, newTab: opensInNewTab, isAnchor: newUrl?.includes('#') });
		setInputValue(newUrl);
		setIsEditing(false);
	};

	const suggestionsRender = (props) => {
		if (!isEditing) {
			return null;
		}

		const {
			suggestions,
			handleSuggestionClick,
		} = props;

		return (
			<AnimatedContentVisibility showIf={suggestions.length > 0} direction='bottom' additionalContainerClasses='es-v-spaced es-gap-2.5! es-max-h-48 -es-mt-5 es-mb-3 es-rounded-1 es-px-2 es-py-2.5 es-overflow-y-auto es-border-cool-gray-100'>
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
						<Button key={i} onClick={() => handleSuggestionClick(suggestion)} className='es-rounded-0.5! es-p-0! es-h-10!'>
							<IconLabel
								icon={<span className='es-w-10 es-display-flex es-items-center es-content-center es-flex-shrink-0'>{typeIcon}</span>}
								label={truncateMiddle(title, 32)}
								subtitle={isCreateNew ? __('Click to add', 'eightshift-frontend-libs') : truncateMiddle(url, 32)}
								additionalClasses='es-text-align-left es-flex-row-reverse es-h-between es-w-full es-color-cool-gray-600'
								standalone
							/>
						</Button>
					);
				})}
			</AnimatedContentVisibility>
		);
	};

	return (
		<Control
			label={label}
			icon={isAnchor ? anchorIcon : icon}
			help={help}
			noBottomSpacing={noBottomSpacing}
			additionalClasses={additionalClass}
			actions={
				<>
					{actions}

					<AnimatedContentVisibility showIf={hasUrl && !noDelete && !disabled} additionalContainerClasses='es-line-h-0'>
						<Button
							onClick={() => {
								setInputValue('');
								onChange({ url: null, newTab: false, isAnchor: false });
							}}
							icon={removeIcon}
							disabled={disabled}
							className='es-button-square-28 es-button-icon-24 es-nested-color-red-500 es-rounded-1'
							label={__('Remove', 'eightshift-frontend-libs')}
							showTooltip
						/>
					</AnimatedContentVisibility>
				</>
			}
		>
			{!disabled &&
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

						className='es-link-edit-component__url-field es-m-0-bcf! es-p-0!'
						placeholder={__('Search or enter URL', 'eightshift-frontend-libs')}
					/>
				</KeyboardShortcuts>
			}

			{disabled &&
				<div className='es-h-9 es-rounded-1 es-border-cool-gray-100 es-color-cool-gray-450 es-user-select-none es-h-spaced es-p-2'>
					<span>{url}</span>
				</div>
			}

			<AnimatedContentVisibility showIf={isAnchor && !isInternalAnchor && !isEditing && !hideAnchorNotice && !disabled} additionalContainerClasses='es-mb-2 es-p-3 es-bg-cool-gray-50 es-rounded-1.5'>
				<IconLabel
					icon={icons.globeAnchor}
					label={__('Anchor link selected', 'eightshift-frontend-libs')}
					subtitle={__('Links to an element on a page', 'eightshift-frontend-libs')}
					additionalClasses='es-nested-color-cool-gray-500'
					standalone
				/>
			</AnimatedContentVisibility>

			<AnimatedContentVisibility showIf={isInternalAnchor && !isEditing && !hideAnchorNotice && !disabled} additionalContainerClasses='es-mb-2 es-p-3 es-bg-cool-gray-50 es-rounded-1.5'>
				<IconLabel
					icon={icons.anchorPage}
					label={__('Internal anchor link selected', 'eightshift-frontend-libs')}
					subtitle={__('Links to an element on the current page', 'eightshift-frontend-libs')}
					additionalClasses='es-nested-color-cool-gray-500'
					standalone
				/>
			</AnimatedContentVisibility>

			{(!hideOpensInNewTab || additionalOptionTiles) && hasUrl && !disabled &&
				<div className='es-h-spaced-wrap'>
					{!hideOpensInNewTab &&
						<IconToggle
							icon={icons.newTab}
							label={__('Open in new tab', 'eightshift-frontend-libs')}
							checked={opensInNewTab}
							onChange={(value) => onChange({ url: url, newTab: value, isAnchor: isAnchor })}
							type='tileButton'
							disabled={isEditing}
						/>
					}

					{additionalOptionTiles}
				</div>
			}

			{hasUrl && additionalOptions && !disabled &&
				<div className='es-v-start'>
					{additionalOptions}
				</div>
			}
		</Control>
	);
};
