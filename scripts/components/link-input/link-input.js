import React, { useState, useRef, useMemo, useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Button, Tooltip, Popover, Spinner } from '@wordpress/components';
import {
	AnimatedContentVisibility,
	Control,
	IconLabel,
	icons,
	IconToggle,
	truncateMiddle,
	getFetchWpApi,
	unescapeHTML,
	debounce,
	classnames,
	upperFirst,
} from '@eightshift/frontend-libs/scripts';

/**
 * An elegant picker for URLs.
 *
 * @param {object} props                                          - LinkInput options.
 * @param {string?} props.url                                     - Currently selected URL.
 * @param {boolean} props.opensInNewTab                           - Currently selected option for opening the link in a new tab.
 * @param {callback} props.onChange                               - Gets called when the state changes. The return value is in the format: `{url: '', newTab: true|false, isAnchor: true|false}`
 * @param {React.Component?} [props.label='URL']                  - If provided, overrides the default component label.
 * @param {React.Component?} [props.help]                         - Help text shown below the component.
 * @param {React.Component?} [props.actions]                      - Actions to show to the right of the label.
 * @param {React.Component?} [props.icon=icons.globe]             - If provided, overrides the default component icon.
 * @param {React.Component?} [props.removeIcon=icons.trash]       - If provided, overrides the default remove icon.
 * @param {React.Component?} [props.anchorIcon=icons.globeAnchor] - If provided, overrides the default component icon when an anchor link is selected.
 * @param {boolean} [props.disabled=false]                        - If `true`, control is disabled.
 * @param {boolean} [props.noDelete=false]                        - If `true`, no remove button is shown.
 * @param {boolean} [props.hideOpensInNewTab=false]               - If `true`, the 'Opens in new tab' button is not shown.
 * @param {boolean} [props.hideAnchorNotice=false]                - If `true`, the Anchor link info banner is not shown when an anchor link is selected.
 * @param {boolean} [props.noBottomSpacing]                       - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]                 - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClass]                       - If passed, the classes are forwarded to the component.
 * @param {React.Component?} [props.additionalOptions]            - If provided, allows adding options below the option tiles.
 * @param {React.Component?} [props.additionalOptionTiles]        - If provided, allows adding additional option tiles.
 * @param {callback} [props.suggestionTypeIconOverride]           - Allows overriding the default icon for the suggestion type, e.g. when using CPTs. Callback should be in the format: `(type) => icon or React component`.
 *
 * @since 9.4.0
 */
export const LinkInput = ({
	url,
	opensInNewTab,

	onChange,

	label = __('Link', 'eightshift-frontend-libs'),
	help,
	actions,

	icon = icons.globe,
	removeIcon = icons.clearAlt,
	anchorIcon = icons.anchor,

	disabled = false,

	noDelete = false,
	hideOpensInNewTab = false,
	hideAnchorNotice = false,

	noBottomSpacing,
	reducedBottomSpacing,

	additionalClass,

	additionalOptions,
	additionalOptionTiles,

	suggestionTypeIconOverride,
}) => {
	const hasUrl = url?.trim()?.length > 0;
	const isAnchor = hasUrl && url?.includes('#');
	const isInternalAnchor = hasUrl && url?.startsWith('#');

	const [inputValue, setInputValue] = useState(url ?? '');
	const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
	const [shownSuggestions, setShownSuggestions] = useState([]);
	const [suggestionsVisible, setSuggestionsVisible] = useState(false);

	const inputContainerRef = useRef();
	const inputRef = useRef();

	const showSuggestionPanel = useCallback(async (searchTerm) => {
		setSuggestionsVisible(true);

		setIsLoadingSuggestions(true);

		const fetchFunction = getFetchWpApi('search', {
			processId: ({ url }) => url,
			processLabel: ({ title }) => unescapeHTML(title),
			processMetadata: ({ type, subtype }) => ({ type, subtype }),
			additionalParam: {
				search: searchTerm,
				type: 'post',
				_locale: 'user',
				per_page: 5,
			},
			noCache: true,
			searchColumns: 'post_title',
			fields: 'id,title,type,subtype,url',
		});
		const items = await fetchFunction();

		setIsLoadingSuggestions(false);
		setShownSuggestions(items);
	}, []);
	const debouncedShowSuggestionPanel = useMemo(() => debounce(showSuggestionPanel, 1000), [showSuggestionPanel]);

	const handleCommitUrl = (url, blurInput = false) => {
		onChange({ url: url, isAnchor: url?.includes('#'), newTab: opensInNewTab });
		setInputValue(url);

		if (blurInput) {
			setSuggestionsVisible(false);
			inputRef?.current?.blur();
		}
	};

	const handleChange = (newUrl) => {
		if (newUrl?.length < 1) {
			onChange({ url: null, isAnchor: false });
		}

		setInputValue(newUrl);

		// eslint-disable-next-line max-len
		if (newUrl?.startsWith('#') || newUrl?.startsWith(':') || newUrl?.startsWith('mailto:') || newUrl?.startsWith('tel:') || newUrl?.startsWith('http://') || newUrl?.startsWith('https://')) {
			setSuggestionsVisible(false);
			onChange({ url: newUrl, isAnchor: newUrl?.includes('#'), newTab: opensInNewTab });
		} else if (newUrl?.length < 3) {
			setSuggestionsVisible(false);
		} else {
			debouncedShowSuggestionPanel(newUrl);
		}
	};

	const AnchorTooltip = () => {
		if (isInternalAnchor) {
			return (
				<IconLabel
					icon={icons.anchorPage}
					label={__('Internal anchor link selected', 'eightshift-frontend-libs')}
					subtitle={__('Links to an element on this page', 'eightshift-frontend-libs')}
					// additionalClasses='es-nested-color-cool-gray-500'
					standalone
				/>
			);
		}

		return (
			<IconLabel
				icon={icons.anchor}
				label={__('Anchor link selected', 'eightshift-frontend-libs')}
				subtitle={__('Links to an element on a page', 'eightshift-frontend-libs')}
				// additionalClasses='es-nested-color-cool-gray-500'
				standalone
			/>
		);
	};

	return (
		<>
			<Control
				label={label}
				icon={icon}
				help={help}
				noBottomSpacing={noBottomSpacing && hideOpensInNewTab && !additionalOptions && !additionalOptionTiles}
				reducedBottomSpacing={reducedBottomSpacing && hideOpensInNewTab && !additionalOptions && !additionalOptionTiles}
				additionalClasses={additionalClass}
				actions={actions}
			>
				<div
					ref={inputContainerRef}
					className={classnames(
						'es-h-spaced es-gap-0.75! es-py-0.75 es-px-1 es-rounded-1 es-border-cool-gray-400 es-h-9',
						// (hasUrl && (additionalOptions || additionalOptionTiles || !hideOpensInNewTab)) && 'es-mb-2',
					)}
				>
					<input
						type='url'
						onInput={(e) => handleChange(e?.target?.value)}
						value={inputValue}
						disabled={disabled}
						placeholder={__('Search or enter URL', 'eightshift-frontend-libs')}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleCommitUrl(e?.target?.value);
							}
						}}
						onBlur={(e) => handleCommitUrl(e?.target?.value)}
						className='es-w-full es-m-0! es-py-0! es-pl-1! es-pr-0! es-h-7! es-border-transparent! es-focus-border-admin-accent!'
						ref={inputRef}
					/>

					<AnimatedContentVisibility showIf={isAnchor && !hideAnchorNotice}>
						<Tooltip text={<AnchorTooltip />}>
							<div className='es-rounded-1.5 es-p-1 es-bg-cool-gray-50 es-nested-w-3.75 es-nested-h-3.75 es-color-cool-gray-650 es-line-h-0'>
								{anchorIcon}
							</div>
						</Tooltip>
					</AnimatedContentVisibility>

					<AnimatedContentVisibility showIf={hasUrl && !noDelete && !disabled} additionalContainerClasses='es-line-h-0'>
						<Button
							onClick={() => {
								setInputValue('');
								onChange({ url: null, newTab: false, isAnchor: false });
							}}
							icon={removeIcon}
							disabled={disabled}
							className='es-button-square-28 es-button-icon-24 es-nested-color-red-500 es-rounded-1'
							label={__('Clear', 'eightshift-frontend-libs')}
							showTooltip
						/>
					</AnimatedContentVisibility>
				</div>

				{inputValue?.length > 0 && suggestionsVisible &&
					<Popover
						anchor={inputContainerRef?.current}
						flip={false}
						resize={false}
						offset={4}
						position='bottom'
						onClose={() => setSuggestionsVisible(false)}
						onFocusOutside={() => setSuggestionsVisible(false)}
						focusOnMount
					>
						<div className='es-w-68 es-p-1.5 es-border-cool-gray-100'>
							{isLoadingSuggestions &&
								<IconLabel
									icon={<span className='es-w-9 es-display-flex es-items-center es-content-center es-flex-shrink-0'><Spinner width='24' height='24' /></span>}
									label={__('Fetching suggestions', 'eightshift-frontend-libs')}
									additionalClasses='es-text-align-left es-gap-1.5! es-w-full es-h-10'
									standalone
								/>
							}

							{!isLoadingSuggestions && shownSuggestions.length < 1 &&
								<IconLabel
									icon={<span className='es-w-9 es-display-flex es-items-center es-content-center es-flex-shrink-0'>{icons.searchEmpty}</span>}
									label={sprintf(__('No results found for %s', 'eightshift-frontend-libs'), inputValue)}
									additionalClasses='es-text-align-left es-gap-1.5! es-w-full es-h-10'
									standalone
								/>
							}

							{!isLoadingSuggestions && shownSuggestions?.length > 0 && shownSuggestions.map((suggestion, i) => {
								const { label: title, value: url, metadata: { subtype } } = suggestion;

								let typeIcon = (
									<span className='es-px-0.75 es-py-0.5 es-rounded-1 es-border-cool-gray-300 es-color-cool-gray-650 es-text-2.5 es-font-weight-500'>
										{upperFirst(subtype)}
									</span>
								);

								if (subtype.toLowerCase() === 'url') {
									typeIcon = icons.externalLink;
								} else if (subtype.toLowerCase() === 'attachment') {
									typeIcon = icons.file;
								} else if (subtype.toLowerCase() === 'category') {
									typeIcon = icons.layoutAlt;
								} else if (subtype.toLowerCase() === 'internal') {
									typeIcon = icons.anchor;
								} else if (subtype.toLowerCase() === 'eightshift-forms') {
									typeIcon = icons.formAlt;
								} else if (subtype.toLowerCase() === 'page') {
									typeIcon = icons.file;
								}

								if (suggestionTypeIconOverride) {
									const overrideIcon = suggestionTypeIconOverride(subtype);

									if (overrideIcon) {
										typeIcon = overrideIcon;
									}
								}

								return (
									<Button key={i} onClick={() => handleCommitUrl(url, true)} className='es-rounded-0.5! es-p-0! es-h-10! es-w-full'>
										<IconLabel
											icon={<span className='es-w-9 es-display-flex es-items-center es-content-center es-flex-shrink-0'>{typeIcon}</span>}
											label={truncateMiddle(title, 32)}
											subtitle={truncateMiddle(url.replace(location.origin, '').replace(/\/$/, ''), 36)}
											additionalClasses='es-text-align-left es-gap-1.5!'
											addSubtitleGap
											standalone
										/>
									</Button>
								);
							})}

							{!isLoadingSuggestions &&
								<>
									<hr className='es-mx-0 es-my-2' />

									<Button onClick={() => handleCommitUrl(inputValue, true)} className='es-rounded-0.5! es-p-0! es-h-10! es-w-full'>
										<IconLabel
											icon={
												<span className='es-w-9 es-display-flex es-items-center es-content-center es-flex-shrink-0'>
													{inputValue.includes('#') ? icons.globeAnchor : icons.textWrite}
												</span>
											}
											label={__('Text you entered', 'eightshift-frontend-libs')}
											subtitle={inputValue}
											additionalClasses='es-text-align-left es-gap-1.5!'
											addSubtitleGap
											standalone
										/>
									</Button>
								</>
							}
						</div>
					</Popover>
				}
			</Control>

			{!hideOpensInNewTab &&
				<IconToggle
					icon={icons.newTab}
					label={__('Open in new tab', 'eightshift-frontend-libs')}
					checked={opensInNewTab}
					onChange={(value) => onChange({ url: url, newTab: value, isAnchor: isAnchor })}
					disabled={disabled}
					noBottomSpacing={noBottomSpacing && !(additionalOptions || additionalOptionTiles)}
					reducedBottomSpacing={reducedBottomSpacing && !(additionalOptions || additionalOptionTiles)}
				/>
			}

			{hasUrl && (additionalOptions || additionalOptionTiles) &&
				<Control
					noBottomSpacing={noBottomSpacing}
					reducedBottomSpacing={reducedBottomSpacing}
				>
					{additionalOptionTiles && !disabled &&
						<div className='es-h-spaced-wrap'>
							{additionalOptionTiles}
						</div>
					}

					{additionalOptions &&
						<div className='es-v-spaced'>
							{additionalOptions}
						</div>
					}
				</Control>
			}
		</>
	);
};

/**
 * Link picker.
 *
 * @deprecated since 9.4.0 - renamed to `LinkInput`
 */
export const LinkEditComponent = (props) => <LinkInput {...props} />;
