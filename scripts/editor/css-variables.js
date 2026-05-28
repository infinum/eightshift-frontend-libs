import { subscribe, select, dispatch } from '@wordpress/data';
import { getAttrKey } from './attributes';
import { STORE_NAME } from './store';
import { camelCase, debounce, isEmpty, isObject, isPlainObject, kebabCase } from '@eightshift/ui-components/utilities';

/**
 * Get Global manifest.json and return global variables as CSS variables.
 *
 * @param {object} globalManifest - (Optional) Global variable data. - Deprecated.
 *
 * @access public
 *
 * @return {string|void}
 *
 * Global Manifest:
 * ```js
 * const manifestGlobal = {
 *   "globalVariables": {
 *     "maxCols": 12,
 *     "breakpoints": {
 *       "mobile": 479,
 *       "tablet": 1279,
 *       "desktop": 1919,
 *       "large": 1920
 *     },
 *     "containers": {
 *       "default": "1330px"
 *     },
 *     "gutters": {
 *       "none": "0",
 *       "default": "25px",
 *       "big": "50px"
 *     },
 *     "sectionSpacing": {
 *       "min":  -300,
 *       "max":  300,
 *       "step": 10
 *     },
 *     "sectionInSpacing": {
 *       "min":  0,
 *       "max":  300,
 *       "step": 10
 *     },
 *     "colors": [
 *       {
 *         "name": "Infinum",
 *         "slug": "infinum",
 *         "color": "#D8262C"
 *       },
 *       {
 *         "name": "Black",
 *         "slug": "black",
 *         "color": "#111111"
 *       }
 *     ]
 *   }
 * };
 * ```
 *
 * Usage:
 * ```js
 * import globalSettings from './../../manifest.json';
 *
 * outputCssVariablesGlobal(globalSettings);
 * ```
 *
 * Output:
 * ```js
 * <style>
 *   :root {
 *     --global-max-cols: 12;
 *     --global-breakpoints-mobile: 479;
 *     --global-breakpoints-tablet: 1279;
 *     --global-breakpoints-desktop: 1919;
 *     --global-breakpoints-large: 1920;
 *     --global-containers-default: 1330px;
 *     --global-gutters-none: 0;
 *     --global-gutters-default: 25px;
 *     --global-gutters-big: 50px;
 *     --global-section-spacing-min: -300;
 *     --global-section-spacing-max: 300;
 *     --global-section-spacing-step: 10;
 *     --global-section-in-spacing-min: 0;
 *     --global-section-in-spacing-max: 300;
 *     --global-section-in-spacing-step: 10;
 *     --global-colors-infinum: #D8262C;
 *     --global-colors-black: #111111;
 *     --global-colors-white: #FFFFFF;
 *   }
 * </style>
 * ```
 */
export const outputCssVariablesGlobal = (_globalManifest = {}) => {
	let output = '';

	for (const [itemKey, itemValue] of Object.entries(select(STORE_NAME).getSettingsGlobalVariables())) {
		const itemKeyInner = kebabCase(itemKey);

		if (isObject(itemValue)) {
			output += globalInner(itemValue, itemKeyInner);
		} else {
			output += `--global-${itemKeyInner}: ${itemValue};\n`;
		}
	}

	// Optimize if necessary.
	if (select(STORE_NAME).getConfigOutputCssOptimize()) {
		output = output.replace(/\n/g, '');
	}

	// Set breakpoints cache for optimized load time.
	setBreakpointsCacheData();

	// If using inline css variables output them.
	if (select(STORE_NAME).getConfigOutputCssGlobally()) {
		outputCssVariablesInline();
	}

	// Output style tag.
	const styleEl = document.createElement('style');
	styleEl.id = `${select(STORE_NAME).getConfigOutputCssSelectorName()}-global`;
	styleEl.textContent = `:root {${output}}`;
	document.head.prepend(styleEl);
};

/**
 * Get component/block options and process them in CSS variables.
 *
 * @param {array} attributes      - Built attributes.
 * @param {array} manifest        - Component/block manifest data.
 * @param {string} unique         - Unique key.
 * @param {object} globalManifest - (Optional) Global variable data.
 * @param {string} customSelector - Output custom selector to use as a style prefix.
 *
 * @access public
 *
 * @return {string}
 *
 * Usage:
 * ```js
 * import React, { useMemo } from 'react';
 *
 * const unique = useMemo(() => getUnique(), []);
 *
 * outputCssVariables(attributes, manifest, unique);
 * ```
 */
export const outputCssVariables = (attributes, manifest, unique, _globalManifest = {}, customSelector = '') => {
	// Define variables from manifest.
	const variables = manifest?.variables;
	const variablesEditor = manifest?.variablesEditor;
	const responsiveAttributes = manifest?.responsiveAttributes;

	const store = select(STORE_NAME);
	const isGlobalOutput = store.getConfigOutputCssGlobally();

	if (!variables && !variablesEditor && !manifest?.variablesCustom && !manifest?.variablesCustomEditor) {
		return isGlobalOutput ? null : '';
	}

	const { defaults: defaultBreakpoints, template } = getBreakpointData();

	// Build a per-call lookup Map seeded from the cached template (iteration order matches template order).
	const data = new Map();

	for (const item of template) {
		data.set(`${item.type}---${item.name}`, {
			type: item.type,
			name: item.name,
			value: item.value,
			variable: [],
		});
	}

	if (typeof variables !== 'undefined') {
		// Iterate each responsiveAttribute from responsiveAttributes that appears in variables field.
		if (typeof responsiveAttributes !== 'undefined') {
			setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variables), data, manifest, defaultBreakpoints);
		}

		// Iterate each variable from variables field.
		setVariablesToBreakpoints(attributes, variables, data, manifest, defaultBreakpoints);
	}

	// Iterate each responsiveAttribute from responsiveAttributes that appears in variablesEditor field.
	if (typeof variablesEditor !== 'undefined') {
		if (typeof responsiveAttributes !== 'undefined') {
			setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variablesEditor), data, manifest, defaultBreakpoints);
		}

		// Iterate each variable from variablesEditor field.
		setVariablesToBreakpoints(attributes, variablesEditor, data, manifest, defaultBreakpoints);
	}

	// Check if component or block.
	let name = manifest.componentClass ?? attributes.blockClass;

	// Switch selector name.
	if (customSelector !== '') {
		name = customSelector;
	}

	// If default output just echo.
	if (!isGlobalOutput) {
		return getCssVariablesTypeDefault(name, data, manifest, unique);
	}

	// Find if style exists in the store.
	const existsIndex = store.getStyles().findIndex((item) => item?.name === name && item?.unique === unique);

	// Find blockClientId from the attributes.
	const blockClientId = attributes?.blockClientId;

	// Don't do anything if blockClientId is missing.
	if (typeof blockClientId !== 'undefined') {
		if (existsIndex !== -1) {
			// Update existing styles.
			dispatch(STORE_NAME).setStyleByIndex(getCssVariablesTypeInline(name, data, manifest, unique, blockClientId), existsIndex);
		} else {
			// Add new styles.
			dispatch(STORE_NAME).setStyle(getCssVariablesTypeInline(name, data, manifest, unique, blockClientId));
		}
	}

	return null;
};

/**
 * Convert hex color into RGB values.
 *
 * @param {string} input - Input hex color (either 3 or 6 characters).
 *
 * @access public
 *
 * @return {string}
 */
export const hexToRgb = (input) => {
	if (!input) {
		return '0 0 0';
	}

	const hex = input.replace('#', '').trim();
	let r, g, b;

	if (hex.length === 3 || hex.length === 4) {
		r = parseInt(hex[0] + hex[0], 16);
		g = parseInt(hex[1] + hex[1], 16);
		b = parseInt(hex[2] + hex[2], 16);
	} else if (hex.length === 6 || hex.length === 8) {
		r = parseInt(hex.slice(0, 2), 16);
		g = parseInt(hex.slice(2, 4), 16);
		b = parseInt(hex.slice(4, 6), 16);
	} else {
		return '0 0 0';
	}

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		return '0 0 0';
	}

	return `${r} ${g} ${b}`;
};

/**
 * Returns a unique ID, generally used with CSS variable generation.
 *
 * @access public
 *
 * @return {string}
 *
 * Usage:
 * ```js
 * getUnique();
 * ```
 *
 * Output:
 * ```js
 * mg2shbh9
 * ```
 */
export const getUnique = () => {
	if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
		const arr = new Uint32Array(1);
		crypto.getRandomValues(arr);

		return arr[0].toString(36);
	}

	return (Math.random() + 1).toString(36).substring(4);
};

// ------------------------------------------------------------------------------
// PRIVATE METHODS
// ------------------------------------------------------------------------------

// Internal variable for storing caches breakpoint data.
let breakpointsPreparedVariableDataCache = [];

let breakpointDataCache = null;

const responsiveVariablesCache = new WeakMap();
const componentNameCache = new WeakMap();
const normalizedCustomCache = new WeakMap();

const getBreakpointData = () => {
	if (breakpointDataCache) {
		return breakpointDataCache;
	}

	const rawBreakpoints = select(STORE_NAME).getSettingsGlobalVariablesBreakpoints();
	const sorted = Object.entries(rawBreakpoints).sort((a, b) => a[1] - b[1]);
	const defaults = {
		min: sorted[0]?.[0] || '',
		max: sorted[sorted.length - 1]?.[0] || '',
	};
	const template = prepareVariableData(sorted);

	breakpointDataCache = { sorted, defaults, template };

	return breakpointDataCache;
};

const getComponentCamelName = (manifest) => {
	let cached = componentNameCache.get(manifest);

	if (cached === undefined) {
		cached = camelCase(manifest.componentName);
		componentNameCache.set(manifest, cached);
	}

	return cached;
};

const normalizeCustomVariables = (arr) => {
	if (!arr) {
		return undefined;
	}
	let cached = normalizedCustomCache.get(arr);

	if (!cached) {
		cached = arr.map((v) => (v?.trim()?.endsWith(';') ? v : `${v};`));
		normalizedCustomCache.set(arr, cached);
	}

	return cached;
};

/**
 * Output CSS variables as one inline style tag.
 *
 * @access private
 *
 * @returns {void}
 */
export const outputCssVariablesInline = () => {
	let currentStateBlocks = select('core/block-editor').__unstableGetClientIdsTree(); // eslint-disable-line no-underscore-dangle

	const debouncedCssOutput = debounce(() => {
		if (select(STORE_NAME).hasStylesUpdated()) {
			outputCssVariablesCombinedInner(select(STORE_NAME).getStyles());
		}
	}, 50);

	subscribe(() => {
		debouncedCssOutput();

		// Find updated state of blocks after render.
		const newStateBlocks = select('core/block-editor').__unstableGetClientIdsTree(); // eslint-disable-line no-underscore-dangle

		// Make changes only if blocks changed.
		if (newStateBlocks !== currentStateBlocks) {
			// Make all current and next blocks flat for easy checking.
			const next = getAllBlocksFlat(newStateBlocks);
			const previous = getAllBlocksFlat(currentStateBlocks);

			// Find deleted blocks.
			const deleted = getDifference(previous, next);

			// If blocks are deleted remove them from the style store.
			if (deleted) {
				// Loop all styles.
				select(STORE_NAME)
					.getStyles()
					.forEach((item, index) => {
						// Find index of deleted item by clientId and remove it from the store.
						deleted.forEach((element) => {
							if (element.clientId === item.blockClientId) {
								dispatch(STORE_NAME).unsetStyleByIndex(index);
							}
						});
					});
			}
		}

		// Update current state with the new one.
		currentStateBlocks = newStateBlocks;
	});
};

/**
 * Find difference in two arrays with multiple nesting levels.
 *
 * @param {array} array1 Array to look.
 * @param {array} array2 Array to check.
 *
 * @access private
 *
 * @returns {array}
 */
export const getDifference = (array1, array2) => {
	return array1.filter((object1) => {
		return !array2.some((object2) => {
			return object1.clientId === object2.clientId;
		});
	});
};

/**
 * Return CSS variables in default type. On the place where it was called.
 *
 * @param {string} name - Output css selector name.
 * @param {array} data - Data prepared for checking.
 * @param {array} manifest - Component/block manifest data.
 * @param {string} unique - Unique key.
 *
 * @access private
 *
 * @returns {string}
 */
export const getCssVariablesTypeDefault = (name, data, manifest, unique) => {
	let output = '';

	const uniqueSelector = unique ? `[data-id='${unique}']` : '';

	// data.variable items are guaranteed to end with ';' (set by variablesInner), so skip per-item normalization.
	for (const { type, value, variable } of data.values()) {
		// If breakpoint value is 0 then don't wrap the media query around it.
		if (variable.length === 0) {
			continue;
		}

		const variableOutput = variable.join('\n');

		if (value === 0) {
			// No breakpoint outputted.
			output += `\n .${name}${uniqueSelector}{\n${variableOutput}\n}`;
		} else {
			// With breakpoint.
			output += `\n @media (${type}-width: ${value}px) {\n.${name}${uniqueSelector}{\n${variableOutput}\n}\n}`;
		}
	}

	// Cached normalization — manifest arrays are static, so each unique array gets normalized once.
	const variablesCustom = normalizeCustomVariables(manifest?.variablesCustom);
	const variablesCustomEditor = normalizeCustomVariables(manifest?.variablesCustomEditor);

	const manual = variablesCustom ? variablesCustom.join('\n') : '';
	const manualEditor = variablesCustomEditor ? variablesCustomEditor.join('\n') : '';

	if (!output && !manual && !manualEditor) {
		return '';
	}

	// Prepare output for manual variables.
	let finalManualOutput = manual || manualEditor ? `.${name}${uniqueSelector}{ ${manual} ${manualEditor}}` : '';

	// Implement some optimizations if necessary.
	if (select(STORE_NAME).getConfigOutputCssOptimize()) {
		output = output.replace(/\n/g, '');
		finalManualOutput = finalManualOutput.replace(/\n/g, '');
	}

	// Output the style for CSS variables.
	return <style dangerouslySetInnerHTML={{ __html: `${output} ${finalManualOutput}` }} />;
};

/**
 * Get css variables in inline type. In one place in dom.
 *
 * @param {string} name - Output css selector name.
 * @param {array} data - Data prepared for checking.
 * @param {array} manifest - Component/block manifest data.
 * @param {string} unique - Unique key.
 * @param {string} blockClientId - blockClientId key from attributes, corresponds to the original clientId from core.
 *
 * @access private
 *
 * @returns {array}
 */
export const getCssVariablesTypeInline = (name, data, manifest, unique, blockClientId) => {
	// Prepare output style object.
	const styles = {
		name,
		unique,
		blockClientId,
		variables: [],
	};

	// Loop data Map values (iteration order matches the cached template order).
	for (const { type, value, variable } of data.values()) {
		// If breakpoint value is 0 then don't wrap the media query around it.
		if (variable.length === 0) {
			continue;
		}

		// Push data to local state.
		styles.variables.push({
			type,
			variable,
			value,
		});
	}

	// Push pre-normalized arrays so downstream output can skip per-element work.
	const variablesCustom = normalizeCustomVariables(manifest?.variablesCustom);

	if (variablesCustom !== undefined) {
		styles.variables.push({
			type: 'min',
			variable: variablesCustom,
			value: 0,
		});
	}

	const variablesCustomEditor = normalizeCustomVariables(manifest?.variablesCustomEditor);

	if (variablesCustomEditor !== undefined) {
		styles.variables.push({
			type: 'min',
			variable: variablesCustomEditor,
			value: 0,
		});
	}

	return styles;
};

/**
 * Process and return global CSS variables based on the type.
 *
 * @param {array} itemValues - Values to check.
 * @param {string} itemKey   - Item key to check.
 *
 * @access private
 *
 * @return {string}
 */
export const globalInner = (itemValues, itemKey) => {
	let output = '';

	for (const [key, value] of Object.entries(itemValues)) {
		const innerKey = kebabCase(key);
		const itemInnerKey = kebabCase(itemKey);

		const { slug, color, gradient } = value;

		switch (itemInnerKey) {
			case 'colors':
				if (typeof slug === 'undefined' || typeof color === 'undefined') {
					break;
				}

				output += `--global-${itemInnerKey}-${value.slug}: ${value.color};\n`;
				output += `--global-${itemInnerKey}-${value.slug}-values: ${hexToRgb(value.color)};\n`;
				break;
			case 'gradients':
				if (typeof slug === 'undefined' || typeof gradient === 'undefined') {
					break;
				}
				output += `--global-${itemInnerKey}-${value.slug}: ${value.gradient};\n`;
				break;
			case 'font-sizes':
				if (typeof slug === 'undefined') {
					break;
				}
				output += `--global-${itemInnerKey}-${value.slug}: ${value.slug};\n`;
				break;
			default:
				output += `--global-${itemInnerKey}-${innerKey}: ${value};\n`;
				break;
		}
	}

	return output;
};

/**
 * Sets up a breakpoint value to responsive attribute objects from responsiveAttribute object.
 *
 * @param {array}  attributeVariables  - Array of attribute variables object.
 * @param {string} breakpointName    	 - Breakpoint name from responsiveAttribute's breakpoint in block's/component's manifest.
 * @param {number} breakpointIndex   	 - Index of responsiveAttribute's breakpoint in manifest.
 * @param {number} numberOfBreakpoints - Number of responsiveAttribute breakpoints in block's/component's manifest.
 *
 * @return {array}
 */
export const setBreakpointResponsiveVariables = (attributeVariables, breakpointName, breakpointIndex, numberOfBreakpoints) => {
	return attributeVariables.map((attributeVariablesObject) => {
		// Calculate default breakpoint index based on order of the breakpoint, inverse property and number of properties in responsiveAttributeObject.
		const defaultBreakpointIndex = attributeVariablesObject.inverse ? 0 : numberOfBreakpoints - 1;

		// Expanding an object with an additional breakpoint property.
		return {
			...attributeVariablesObject,
			breakpoint: breakpointIndex === defaultBreakpointIndex ? 'default' : breakpointName,
		};
	});
};

/**
 * Iterating through variables matching the keys from responsiveAttributes and translating it to responsive attributes names.
 *
 * @param {object} responsiveAttributes - Responsive attributes that are read from component's/block's manifest.
 * @param {object} variables            - Object containing objects with component's/block's attribute variables that are read from manifest.
 *
 * @return {object} Object prepared for setting all the variables to its breakpoints.
 */
export const setupResponsiveVariables = (responsiveAttributes, variables) => {
	// Both inputs are static refs from the manifest — memoize aggressively.
	let inner = responsiveVariablesCache.get(responsiveAttributes);

	if (!inner) {
		inner = new WeakMap();
		responsiveVariablesCache.set(responsiveAttributes, inner);
	}
	const cached = inner.get(variables);

	if (cached !== undefined) {
		return cached;
	}

	const result = {};

	for (const [responsiveAttributeName, responsiveAttributeObject] of Object.entries(responsiveAttributes)) {
		if (!responsiveAttributeName || isEmpty(variables[responsiveAttributeName])) {
			continue;
		}

		const numberOfBreakpoints = Object.keys(responsiveAttributeObject).length;
		const responsiveAttributeVariables = {};
		let breakpointIndex = 0;

		for (const [breakpointName, breakpointVariableName] of Object.entries(responsiveAttributeObject)) {
			if (Array.isArray(variables[responsiveAttributeName])) {
				responsiveAttributeVariables[breakpointVariableName] = setBreakpointResponsiveVariables(variables[responsiveAttributeName], breakpointName, breakpointIndex, numberOfBreakpoints);
			} else {
				const breakpointVariables = {};

				for (const [attributeValue, attributeObject] of Object.entries(variables[responsiveAttributeName])) {
					breakpointVariables[attributeValue] = setBreakpointResponsiveVariables(attributeObject, breakpointName, breakpointIndex, numberOfBreakpoints);
				}

				responsiveAttributeVariables[breakpointVariableName] = breakpointVariables;
			}

			breakpointIndex++;
		}

		Object.assign(result, responsiveAttributeVariables);
	}

	inner.set(variables, result);

	return result;
};

/**
 * Setting defined variables to each breakpoint.
 *
 * @param {object} attributes         - Attributes fetched from manifest.
 * @param {object} variables          - Variables fetched from manifest.
 * @param {object} data               - Preset objects separated in breakpoints.
 * @param {array} manifest            - Component/block manifest data.
 * @param {object} defaultBreakpoints - Default breakpoints for mobile/desktop first.
 *
 * @access private
 *
 * @return {object} Filled object with variables data separated in breakpoints.
 */
export const setVariablesToBreakpoints = (attributes, variables, data, manifest, defaultBreakpoints) => {
	// Iterate each variable.
	for (const [variableName, variableValue] of Object.entries(variables)) {
		// Constant for attributes set value (in db or default).
		const attributeValue = attributes[getAttrKey(variableName, attributes, manifest)];

		// Set internal breakpoints variable.
		const internalBreakpoints = Array.isArray(variableValue) ? variableValue : (variableValue[attributeValue] ?? []);

		// Iterate variable array to check breakpoints.
		internalBreakpoints.forEach((breakpointItem) => {
			// Define variables from breakpointItem.
			const {
				breakpoint: itemBreakpoint, // Put in temporary variable before checking the type of breakpointItem.
				inverse = false, // If inverse is not set use mobile first.
				variable = [],
			} = breakpointItem;

			// Check if we are using mobile or desktop first. Mobile first is the default.
			const type = inverse ? 'max' : 'min';

			// If breakpoint is not set or has default breakpoint value use default name.
			const breakpoint = !itemBreakpoint || itemBreakpoint === defaultBreakpoints[type] ? 'default' : itemBreakpoint;

			// O(1) lookup of the matching slot, then mutate the existing array in place.
			const slot = data.get(`${type}---${breakpoint}`);

			if (slot) {
				const newVars = variablesInner(variable, attributeValue, attributes, manifest);

				if (newVars.length) {
					slot.variable.push(...newVars);
				}
			}
		});
	}

	return data;
};

/**
 * Create initial array of data to be able to populate later.
 *
 * @param {object} globalBreakpoints - Global breakpoints from global manifest to set the correct output.
 *
 * @access private
 *
 * @return {array}
 */
export const prepareVariableData = (globalBreakpoints) => {
	// Define the min and max arrays.
	const min = [];
	const max = [];
	let minBreakpointValue = 0;

	// Loop the global breakpoints and populate the data.
	Object.values(globalBreakpoints).forEach(([item, value]) => {
		// Initial inner object.
		const itemObject = {
			name: item,
			value: value,
			variable: [],
		};

		// Inner object for min values.
		const itemObjectMin = {
			...itemObject,
			type: 'min',
			value: minBreakpointValue,
		};

		// Inner object for max values.
		const itemObjectMax = {
			...itemObject,
			type: 'max',
		};

		// Transfer value to a larger breakpoint.
		minBreakpointValue = value;

		// Push both min and max to the defined arrays.
		min.push(itemObjectMin);
		max.push(itemObjectMax);
	});

	// Pop largest breakpoint out of min array.
	min.shift();

	// Add default object to the top of the array.
	min.unshift({
		type: 'min',
		name: 'default',
		value: 0,
		variable: [],
	});

	// Reverse order of max array.
	max.reverse();

	// Throwout the largest.
	max.shift();

	// Add default object to the top of the array.
	max.unshift({
		type: 'max',
		name: 'default',
		value: 0,
		variable: [],
	});

	// Merge both arrays.
	return min.concat(max);
};

/**
 * Internal helper to loop CSS Variables from array.
 *
 * @param {array} variables      - Array of variables of CSS variables.
 * @param {mixed} attributeValue - Original attribute value used in magic variable.
 * @param {object} attributes     - Attributes fetched from manifest.
 * @param {array} manifest        - Component/block manifest data.
 *
 * @access private
 *
 * @returns {array}
 */
export const variablesInner = (variables, attributeValue, attributes, manifest) => {
	const output = [];

	// Bailout if provided variables is not an object or if attribute value is empty or undefined, used to unset/reset value..
	if (typeof attributeValue === 'undefined' || !isPlainObject(variables)) {
		return output;
	}

	const prefix = attributes?.prefix;
	const componentName = prefix ? getComponentCamelName(manifest) : '';

	// Iterate each attribute and make corrections.
	for (const [variableKey, variableValue] of Object.entries(variables)) {
		let value = variableValue;

		// If value contains magic variable swap that variable with original attribute value.
		if (value.includes('%value%')) {
			value = value.replace(/%value%/g, attributeValue);
		}

		// Single regex pass instead of scanning every attribute. Also preserves earlier replacements
		// and handles multiple distinct %attr-X% references in the same value correctly.
		if (value.includes('%attr-')) {
			value = value.replace(/%attr-([a-zA-Z0-9_]+)%/g, (match, key) => {
				const attrKey = prefix ? key.replace(componentName, prefix) : key;

				return attributes[attrKey] !== undefined ? attributes[attrKey] : match;
			});
		}

		// Bailout if value is empty or undefined.
		if (value === 'undefined' || isEmpty(value)) {
			continue;
		}

		// Output the custom CSS variable by adding the attribute key + custom object key.
		output.push(`--${kebabCase(variableKey)}: ${value};`);
	}

	return output;
};

/**
 * Set breakpoints cache for optimized load time.
 *
 * @access private
 *
 * @returns {void}
 */
export const setBreakpointsCacheData = () => {
	// Prepare breakpoints.
	const breakpoints = select(STORE_NAME).getSettingsGlobalVariablesBreakpoints();

	const breakpointsCache = Object.entries(breakpoints).sort((a, b) => {
		return a[1] - b[1]; // Sort from the smallest to the largest breakpoint.
	});

	// Prepare breakpoints data to output combined css variables.
	const breakpointsMin = breakpointsCache.map((item) => {
		return {
			type: 'min',
			value: item[1],
		};
	});
	breakpointsMin.unshift({
		type: 'min',
		value: 0,
	});

	const breakpointsMax = breakpointsCache.reverse().map((item) => {
		return {
			type: 'max',
			value: item[1],
		};
	});
	breakpointsMax.unshift({
		type: 'max',
		value: 0,
	});

	breakpointsPreparedVariableDataCache = breakpointsMin.concat(breakpointsMax);
};

/**
 * Get all blacks inner-blocks recursively in one flat array.
 *
 * @param {array} blocks - Array of blocks.
 *
 * @access private
 *
 * @returns {array}
 */
export const getAllBlocksFlat = (blocks) => {
	let output = [];

	// Loop all blocks.
	blocks.forEach((block) => {
		const { innerBlocks } = block;

		// Internal output.
		let innerOutput = [];

		// Add current block to the state.
		output.push(block);

		// If inner blocks are listed do recursive add.
		if (innerBlocks.length > 0) {
			innerOutput = getAllBlocksFlat(innerBlocks);
		}

		// Output all.
		output = output.concat(innerOutput);
	});

	return output;
};

/**
 * Output css variables as a one inline style tag - inner.
 *
 * @access private
 *
 * @returns {string}
 */
export const outputCssVariablesCombinedInner = (styles) => {
	const breakpoints = {};

	// Loop styles.
	for (const { name, unique, variables } of styles) {
		// Bailout if variables are missing.
		if (variables.length === 0) {
			continue;
		}

		let uniqueSelector = `[data-id='${unique}']`;

		if (!unique) {
			uniqueSelector = '';
		}

		// Loop inner variables.
		for (const { type, value, variable } of variables) {
			// Bailout if variable is missing.
			if (variable.length === 0) {
				continue;
			}

			// Set breakpoint to empty if it is missing initially.
			if (typeof breakpoints[`${type}---${value}`] === 'undefined') {
				breakpoints[`${type}---${value}`] = '';
			}

			// All variable entries are pre-normalized (data.variable from variablesInner, custom via normalizeCustomVariables).
			const variableOutput = variable.join('\n');

			// Populate breakpoints output.
			breakpoints[`${type}---${value}`] += `\n.${name}${uniqueSelector}{\n${variableOutput}\n} `;
		}
	}

	// Prepare final output.
	let output = '';

	// Loop all breakpoints prepared for output.
	breakpointsPreparedVariableDataCache.forEach(({ type, value }) => {
		const breakpointValue = breakpoints[`${type}---${value}`] ?? '';

		// Bailout if breakpoint is missing.
		if (breakpointValue === '') {
			return;
		}

		// Wrap media queries with correct selectors.
		if (value === 0) {
			output += `${breakpointValue}\n`;
		} else {
			output += `\n@media (${type}-width:${value}px){${breakpointValue}}\n `;
		}
	});

	// Do optimizations if necessary.
	if (select(STORE_NAME).getConfigOutputCssOptimize()) {
		output = output.replace(/\n|\r/g, '');
	}

	// Add additional style from config settings.
	const additionalStyles = select(STORE_NAME).getConfigOutputCssGloballyAdditionalStyles();

	let additionalStylesOutput = '';

	if (typeof additionalStyles !== 'undefined') {
		additionalStylesOutput = additionalStyles.join(';\n');
	}

	// Get style id name from store.
	const selector = select(STORE_NAME).getConfigOutputCssSelectorName();

	// Detect if style tag is present in dom.
	const styleTag = document.getElementById(selector);

	// Process styles.
	if (!styleTag) {
		const styleEl = document.createElement('style');
		styleEl.id = selector;
		styleEl.textContent = `${output} ${additionalStylesOutput}`;
		document.body.append(styleEl);
	} else {
		styleTag.textContent = `${output} ${additionalStylesOutput}`;
	}

	// Reset state to original.
	dispatch(STORE_NAME).unsetStylesUpdated();
};
