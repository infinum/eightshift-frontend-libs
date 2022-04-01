import { registerStore } from '@wordpress/data';

// Store name defined by build version so we can have multiple themes and plugins.
export const BUILD_VERSION = process.env.VERSION;
export const STORE_NAME = `eightshift/${BUILD_VERSION}`;

// Set default store state.
const DEFAULT_STATE = {
	blocks: {},
	components: {},
	config: {
		outputCssGlobally: false,
		outputCssOptimize: false,
		outputCssSelectorName: 'esCssVariables',
	},
	wrapper: {},
	settings: {},
	styles: [],
	hasStylesUpdated: false,
};

// Define selectors - only getters.
const selectors = {
	getBlocks(state) {
		return state.blocks;
	},
	getBlock(state, blockName) {
		return state.blocks.find((block) => block.blockName === blockName);
	},
	getComponents(state) {
		return state.components;
	},
	getComponent(state, componentName) {
		return state.components.find((component) => component.componentName === componentName);
	},
	getConfig(state) {
		return state.config;
	},
	getConfigOutputCssGlobally(state) {
		return state.config.outputCssGlobally;
	},
	getConfigOutputCssOptimize(state) {
		return state.config.outputCssOptimize;
	},
	getConfigOutputCssSelectorName(state) {
		return state.config.outputCssSelectorName;
	},
	getWrapper(state) {
		return state.wrapper;
	},
	getSettings(state) {
		return state.settings;
	},
	getSettingsNamespace(state) {
		return state.settings.namespace;
	},
	getSettingsGlobalVariables(state) {
		return state.settings.globalVariables;
	},
	getSettingsGlobalVariablesCustomBlockName(state) {
		return state.settings.globalVariables.customBlocksName;
	},
	getSettingsGlobalVariablesBreakpoints(state) {
		return state.settings.globalVariables.breakpoints;
	},
	getStyles(state) {
		return state.styles;
	},
	hasStylesUpdated(state) {
		return state.hasStylesUpdated;
	},
};

// Define actions - getters and setters.
const actions = {
	setBlocks(blocks) {
		return {
			type: 'SET_BLOCKS',
			blocks,
		};
	},
	getBlocks(blocks) {
		return {
			type: 'GET_BLOCKS',
			blocks,
		};
	},
	getBlock(block) {
		return {
			type: 'GET_BLOCK',
			block,
		};
	},
	setComponents(components) {
		return {
			type: 'SET_COMPONENTS',
			components,
		};
	},
	getComponents(components) {
		return {
			type: 'GET_COMPONENTS',
			components,
		};
	},
	getComponent(component) {
		return {
			type: 'GET_COMPONENT',
			component,
		};
	},
	getConfigOutputCssGlobally(config) {
		return {
			type: 'GET_CONFIG_OUTPUT_CSS_GLOBALLY',
			config,
		};
	},
	setConfigOutputCssGlobally(config) {
		return {
			type: 'SET_CONFIG_OUTPUT_CSS_GLOBALLY',
			config,
		};
	},
	getConfigOutputCssOptimize(config) {
		return {
			type: 'GET_CONFIG_OUTPUT_CSS_OPTIMIZE',
			config,
		};
	},
	setConfigOutputCssOptimize(config) {
		return {
			type: 'SET_CONFIG_OUTPUT_CSS_OPTIMIZE',
			config,
		};
	},
	getConfigOutputCssSelectorName(config) {
		return {
			type: 'GET_CONFIG_OUTPUT_CSS_SELECTOR_NAME',
			config,
		};
	},
	setConfigOutputCssSelectorName(config) {
		return {
			type: 'SET_CONFIG_OUTPUT_CSS_SELECTOR_NAME',
			config,
		};
	},
	setWrapper(wrapper) {
		return {
			type: 'SET_WRAPPER',
			wrapper,
		};
	},
	getWrapper(wrapper) {
		return {
			type: 'GET_WRAPPER',
			wrapper,
		};
	},
	setSettings(settings) {
		return {
			type: 'SET_SETTINGS',
			settings,
		};
	},
	getSettings(settings) {
		return {
			type: 'GET_SETTINGS',
			settings,
		};
	},
	getSettingsNamespace(settings) {
		return {
			type: 'GET_SETTINGS_NAMESPACE',
			settings,
		};
	},
	getSettingsGlobalVariables(settings) {
		return {
			type: 'GET_SETTINGS_GLOBAL_VARIABLES',
			settings,
		};
	},
	getSettingsGlobalVariablesBreakpoints(settings) {
		return {
			type: 'GET_SETTINGS_GLOBAL_VARIABLES_BREAKPOINTS',
			settings,
		};
	},
	getSettingsGlobalVariablesCustomBlockName(settings) {
		return {
			type: 'GET_SETTINGS_GLOBAL_VARIABLES_CUSTOM_BLOCK_NAME',
			settings,
		};
	},
	setStyle(styles) {
		return {
			type: 'SET_STYLE',
			styles,
		};
	},
	unsetStyleByIndex(index) {
		return {
			type: 'UNSET_STYLE_BY_INDEX',
			index,
		};
	},
	setStyleByIndex(styles, index) {
		return {
			type: 'SET_STYLE_BY_INDEX',
			styles,
			index,
		};
	},
	getStyles(styles) {
		return {
			type: 'GET_STYLES',
			styles,
		};
	},
	setStylesUpdated() {
		return {
			type: 'SET_STYLES_UPDATED',
		};
	},
	unsetStylesUpdated() {
		return {
			type: 'UNSET_STYLES_UPDATED',
		};
	},
};

// Define reducers - only setters.
const reducer = ( state = DEFAULT_STATE, action ) => {
	switch (action.type) {
		case 'SET_BLOCKS': {
			return {
				...state,
				blocks: action.blocks,
			};
		}
		case 'SET_COMPONENTS': {
			return {
				...state,
				components: action.components,
			};
		}
		case 'SET_CONFIG_OUTPUT_CSS_GLOBALLY': {
			return {
				...state,
				config: {
					...state.config,
					outputCssGlobally: action.config,
				}
			};
		}
		case 'SET_CONFIG_OUTPUT_CSS_OPTIMIZE': {
			return {
				...state,
				config: {
					...state.config,
					outputCssOptimize: action.config,
				}
			};
		}
		case 'SET_CONFIG_OUTPUT_CSS_SELECTOR_NAME': {
			return {
				...state,
				config: {
					...state.config,
					outputCssSelectorName: action.config,
				}
			};
		}
		case 'SET_WRAPPER': {
			return {
				...state,
				wrapper: action.wrapper,
			};
		}
		case 'SET_SETTINGS': {
			return {
				...state,
				settings: action.settings,
			};
		}
		case 'SET_STYLE': {
			state.styles.push(action.styles);
			state.hasStylesUpdated = true;

			return state;
		}
		case 'SET_STYLE_BY_INDEX': {
			if (JSON.stringify(state.styles[action.index]) !== JSON.stringify(action.styles)) {
				state.styles[action.index] = action.styles;
				state.hasStylesUpdated = true;

				return state;
			}

			return state;
		}
		case 'UNSET_STYLE_BY_INDEX': {
			let internalStyles = {
				...state,
			};

			internalStyles.styles.splice(action.index, 1);

			return internalStyles;
		}
		case 'SET_STYLES_UPDATED': {
			return {
				...state,
				hasStylesUpdated: true,
			};
		}
		case 'UNSET_STYLES_UPDATED': {
			return {
				...state,
				hasStylesUpdated: false,
			};
		}
		default: {
			return state;
		}
	}
};

// Register the store.
registerStore(
	STORE_NAME,
	{
		selectors,
		actions,
		reducer,
	}
);