import React from 'react';
import { AsyncMultiSelect as EsUicAsyncMultiSelect } from '@eightshift/ui-components';

/**
 * Multi-select, asynchronously-loading, re-orderable select menu.
 *
 * @deprecated Use `MultiSelect` from `@eightshift/ui-components` instead.
 *
 * @param {object} props - AsyncMultiSelect options.
 * @param {string?} [props.label] - Label displayed above the control.
 * @param {string?} [props.help] - Help text displayed below the control.
 * @param {React.Component?} [props.icon] - Icon to show next to the label
 * @param {React.Component?} [props.subtitle] - Subtitle below the label.
 * @param {React.Component?} [props.actions] - Actions to show to the right of the label.
 * @param {boolean?} [props.inlineLabel] - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {boolean|array<{string,string}>} [props.preloadOptions=true] - If `true`, the initial loading is done as soon as the component is loaded. If an array of `{label: '', value: ''}` option is provided, that is loaded immediately, dynamic fetching only happens in search. If `false`, nothing is loaded immediately, until you type to search.
 * @param {callback<Promise<>>?} props.loadOptions - An async callback that fetches an array of `{label: '', value: ''}`-formatted items.
 * @param {object} props.value - Current value
 * @param {function} props.onChange - Function called when the selection is changed.
 * @param {boolean} [props.clearable=false] - If `true`, a button to remove all items is shown.
 * @param {boolean} [props.noSearch=false] - If `true`, the search functionality is disabled.
 * @param {boolean} [props.disabled=false] - If set `true`, the component is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect=false] - If set `true`, the dropdown is not closed immediately after selecting an option.
 * @param {string?} [props.placeholder] - Placeholder text when nothing is selected.
 * @param {React.Component?} [props.customDropdownIndicator] - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator] - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {React.Component?} [props.customValueContainer] - If provided, replaces the default items container component (react-select's `components.MultiValueContainer`).
 * @param {React.Component?} [props.customValueRemove] - If provided, replaces the default item remove button (react-select's `components.MultiValueRemove`.
 * @param {function} [props.processLoadedOptions] - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Please make sure to include `label`, `value` keys and `id` keys, additional fields can be added as required.
 * @param {string?} [props.additionalClasses=''] - If provided, the classes are added to the component container.
 * @param {string?} [props.additionalSelectClasses=''] - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}] - If provided, the provided props will be passed to the Select control.
 */
export const AsyncMultiSelect = (props) => {
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

		disabled = false,

		keepMenuOpenAfterSelect = false,

		placeholder,

		customClearIndicator,
		customDropdownArrow,

		customMenuOption,
		customValueDisplay,
		customValueRemove,
		customValueContainer,

		processLoadedOptions = (options) => options,

		additionalSelectClasses,
		additionalProps,
	} = props;

	return (
		<EsUicAsyncMultiSelect
			label={label}
			help={help}
			icon={icon}
			subtitle={subtitle}
			actions={actions}
			inline={inlineLabel}
			preloadOptions={preloadOptions}
			loadOptions={loadOptions}
			value={value}
			onChange={onChange}
			clearable={clearable}
			noSearch={noSearch}
			disabled={disabled}
			keepMenuOpenAfterSelect={keepMenuOpenAfterSelect}
			placeholder={placeholder}
			customClearIndicator={customClearIndicator}
			customDropdownArrow={customDropdownArrow}
			customMenuOption={customMenuOption}
			customValueDisplay={customValueDisplay}
			customValueRemove={customValueRemove}
			customValueContainer={customValueContainer}
			processLoadedOptions={processLoadedOptions}
			className={additionalSelectClasses}
			{...additionalProps}
		/>
	);
};
