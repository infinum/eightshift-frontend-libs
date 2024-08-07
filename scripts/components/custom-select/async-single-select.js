import React from 'react';
import { AsyncSelect as EsUicAsyncSelect } from '@eightshift/ui-components';

/**
 * A simple, asynchronously-loading, customizable select menu.
 *
 * @deprecated Use `AsyncSelect` from `@eightshift/ui-components` instead.
 *
 * @param {object} props - AsyncSelect options.
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
 * @param {boolean} [props.clearable=false] - If `true`, a button to remove the value is shown.
 * @param {boolean} [props.noSearch=false] - If `true`, the search functionality is disabled.
 * @param {boolean} [props.disabled=false] - If set `true`, the component is disabled.
 * @param {boolean} [props.closeMenuAfterSelect=false] - If set `true`, the dropdown is closed immediately after selecting an option.
 * @param {string?} [props.placeholder] - Placeholder text when nothing is selected.
 * @param {React.Component?} [props.customDropdownIndicator] - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator] - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption] - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay] - If provided, replaces the default current value display of each selected item (react-select's `components.SingleValue`).
 * @param {function} [props.processLoadedOptions] - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Please make sure to include `label`, `value` keys and `id` keys, additional fields can be added as required.
 * @param {string?} [props.additionalSelectClasses=''] - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}] - If provided, the provided props will be passed to the Select control.
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

		disabled = false,

		closeMenuAfterSelect = false,

		placeholder,

		customClearIndicator,
		customDropdownArrow,
		customMenuOption,
		customValueDisplay,

		processLoadedOptions = (options) => options,

		additionalSelectClasses,
		additionalProps,
	} = props;

	return (
		<EsUicAsyncSelect
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
			keepMenuOpenAfterSelect={!closeMenuAfterSelect}
			placeholder={placeholder}
			customClearIndicator={customClearIndicator}
			customDropdownIndicator={customDropdownArrow}
			customMenuOption={customMenuOption}
			customValueDisplay={customValueDisplay}
			processLoadedOptions={processLoadedOptions}
			className={additionalSelectClasses}
			{...additionalProps}
		/>
	);
};
