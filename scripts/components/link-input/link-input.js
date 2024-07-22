import React from 'react';
import {
	LinkInput as EsUicLinkInput,
	Toggle,
	TriggeredPopover,
} from '@eightshift/ui-components';
import { __ } from '@wordpress/i18n';
import { icons } from '@eightshift/ui-components/icons';
import { wpSearchRoute } from '../../editor';

/**
 * @deprecated Use `LinkInput` from `@eightshift/ui-components` instead. Make sure to include the new tab toggle separately, if needed!
 *
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
 * @param {boolean} [props.hideOpensInNewTab=false]               - If `true`, the 'Opens in new tab' button is not shown.
 * @param {string?} [props.additionalClass]                       - If passed, the classes are forwarded to the component.
 * @param {React.Component?} [props.additionalOptions]            - If provided, allows adding options below the option tiles.
 * @param {React.Component?} [props.additionalOptionTiles]        - If provided, allows adding additional option tiles.
 * @param {callback} [props.suggestionTypeIconOverride]           - Allows overriding the default icon for the suggestion type, e.g. when using CPTs. Callback should be in the format: `(type) => icon or React component`.
 * @param {callback} [props.fetchSuggestions]                     - Allows overriding the default function for fetching suggestions. Callback should be in the format: `(searchTerm) => Promise`.
 * @param {int} [props.inputDebounceDelay=500]                    - Allows overriding the default debounce delay for the input. Default is 500ms.
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

	disabled = false,

	hideOpensInNewTab = false,

	additionalClass,

	additionalOptions,
	additionalOptionTiles,

	suggestionTypeIconOverride,

	fetchSuggestions,

	inputDebounceDelay = 300,
}) => {
	return (
		<>
			<EsUicLinkInput
				url={url}
				onChange={({ url, isAnchor }) =>
					onChange({ url: url, newTab: opensInNewTab, isAnchor: isAnchor })
				}
				label={label}
				help={help}
				actions={
					<>
						{actions}

						{(additionalOptions || additionalOptionTiles) && (
							<TriggeredPopover
								triggerButtonIcon={icons.moreH}
								triggerButtonProps={{ size: 'small', disabled: disabled }}
							>
								{additionalOptions}
								{additionalOptionTiles}
							</TriggeredPopover>
						)}
					</>
				}
				icon={icon}
				removeIcon={removeIcon}
				disabled={disabled}
				className={additionalClass}
				suggestionTypeIconOverride={suggestionTypeIconOverride}
				fetchSuggestions={fetchSuggestions ?? wpSearchRoute}
				inputDebounceDelay={inputDebounceDelay}
			/>
			{!hideOpensInNewTab && (
				<Toggle
					icon={icons.newTab}
					label={__('Open in new tab', 'eightshift-frontend-libs')}
					checked={opensInNewTab}
					onChange={(value) =>
						onChange({ url: url, newTab: value, isAnchor: url?.includes('#') })
					}
					disabled={disabled}
				/>
			)}
		</>
	);
};

/**
 * Link picker.
 *
 * @deprecated since 9.4.0 - renamed to `LinkInput`
 */
export const LinkEditComponent = (props) => <LinkInput {...props} />;
