import React from 'react';
import { components } from 'react-select';
import RSAsyncSelect from 'react-select/async';
import { defaultEightshiftColorScheme, defaultEightshiftStyles } from './custom-select-style';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator } from './custom-select-default-components';
import { Control } from '../base-control/base-control';

/**
 * A simple, asynchronously-loading, customizable select menu.
 *
 * @param {object} props                                               - AsyncSelect options.
 * @param {string?} [props.label]                                      - Label displayed above the control.
 * @param {string?} [props.help]                                       - Help text displayed below the control.
 * @param {React.Component?} [props.icon]                              - Icon to show next to the label
 * @param {React.Component?} [props.subtitle]                          - Subtitle below the label.
 * @param {React.Component?} [props.actions]                           - Actions to show to the right of the label.
 * @param {boolean?} [props.inlineLabel]                               - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {boolean|array<{string,string}>} [props.preloadOptions=true] - If `true`, the initial loading is done as soon as the component is loaded. If an array of `{label: '', value: ''}` option is provided, that is loaded immediately, dynamic fetching only happens in search. If `false`, nothing is loaded immediately, until you type to search.
 * @param {callback<Promise<>>?} props.loadOptions                     - An async callback that fetches an array of `{label: '', value: ''}`-formatted items.
 * @param {object} props.value                                         - Current value
 * @param {function} props.onChange                                    - Function called when the selection is changed.
 * @param {boolean} [props.clearable=false]                            - If `true`, a button to remove the value is shown.
 * @param {boolean} [props.noSearch=false]                             - If `true`, the search functionality is disabled.
 * @param {boolean} [props.noOptionCaching=false]                      - If `true`, react-select option caching functionality is disabled.
 * @param {boolean} [props.disabled=false]                             - If set `true`, the component is disabled.
 * @param {boolean} [props.closeMenuAfterSelect=false]                 - If set `true`, the dropdown is closed immediately after selecting an option.
 * @param {string?} [props.placeholder]                                - Placeholder text when nothing is selected.
 * @param {React.Component?} [props.customDropdownIndicator]           - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator]              - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption]                  - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay]                - If provided, replaces the default current value display of each selected item (react-select's `components.SingleValue`).
 * @param {boolean} [props.noBottomSpacing]                            - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]                      - If `true`, space below the control is reduced.
 * @param {function} [props.processLoadedOptions]                      - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Please make sure to include `label`, `value` keys and `id` keys, additional fields can be added as required.
 * @param {string?} [props.additionalClasses='']                       - If provided, the classes are added to the component container.
 * @param {string?} [props.additionalSelectClasses='']                 - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}]                         - If provided, the provided props will be passed to the Select control.
 */
export const AsyncSelect = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inlineLabel,

		preloadOptions = true,
		loadOptions,
		value,

		onChange,

		clearable = false,
		noSearch = false,
		noOptionCaching = false,

		disabled = false,

		closeMenuAfterSelect = false,

		placeholder,

		customClearIndicator,
		customDropdownArrow,
		customMenuOption,
		customValueDisplay,

		noBottomSpacing,
		reducedBottomSpacing,

		processLoadedOptions = (options) => options,

		additionalClasses,
		additionalSelectClasses,
		additionalProps,
	} = props;

	const customLoadOptions = async (searchText) => {
		const results = await loadOptions(searchText);
		return processLoadedOptions(results?.map((item) => ({ id: item.value, ...item })) ?? []);
	};

	return (
		<Control
			label={label}
			icon={icon}
			subtitle={subtitle}
			actions={actions}
			additionalClasses={additionalClasses}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			help={help}
			inlineLabel={inlineLabel}
		>
			<RSAsyncSelect
				loadOptions={customLoadOptions}
				cacheOptions={!noOptionCaching}
				defaultOptions={preloadOptions}
				value={value}
				onChange={onChange}
				closeMenuOnSelect={closeMenuAfterSelect}
				isClearable={clearable}
				isSearchable={!noSearch}
				isDisabled={disabled}
				className={additionalSelectClasses}
				placeholder={placeholder}
				theme={defaultEightshiftColorScheme}
				styles={defaultEightshiftStyles}
				components={{
					Option: customMenuOption ?? components.Option,
					SingleValue: customValueDisplay ?? components.SingleValue,
					IndicatorSeparator: null,
					DropdownIndicator: customDropdownArrow ?? CustomSelectDefaultDropdownIndicator,
					ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
				}}
				menuPortalTarget={document.body}
				menuPosition='fixed'
				{...additionalProps}
			/>
		</Control>
	);
};
