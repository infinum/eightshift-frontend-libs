/**
 * Return project details from global window object.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettings = () => {
	return window?.['eightshift']?.[process.env.VERSION] ?? {};
};

/**
 * Returns project features config details.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettingsConfig = () => {
	return getSettings()?.config ?? {};
};

/**
 * Get project features config - output css variables globally.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettingsConfigOutputCssVariablesGlobally = () => {
	return getSettingsConfig()?.outputCssVariablesGlobally;
};

/**
 * Set project features config - output css variables globally.
 *
 * @access public
 *
 * @returns {object}
 */
export const setSettingsConfigOutputCssVariablesGlobally = (value) => {
	getSettingsConfig().outputCssVariablesGlobally = value;
};

/**
 * Returns global manifest details.
 *
 * @access public
 *
 * @returns  {object}
 */
export const getSettingsGlobal = () => {
	return getSettings()?.globalManifest ?? {};
};

/**
 * Returns all blocks manifest array.
 *
 * @access public
 *
 * @returns {array}
 */
export const getSettingsBlocks = () => {
	return getSettings()?.blocks ?? [];
};

/**
 * Returns one block manifest details.
 *
 * @param {string} blockName Block name to search.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettingsBlock = (blockName) => {
	return getSettingsBlocks().find((item) => item.blockName === blockName) ?? {};
};

/**
 * Returns all components manifest array.
 *
 * @access public
 *
 * @returns {array}
 */
export const getSettingsComponents = () => {
	return getSettings()?.components ?? [];
};

/**
 * Returns one component manifest details.
 *
 * @param {string} componentName Component name to search.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettingsComponent = (componentName) => {
	return getSettingsComponents().find((item) => item.componentName === componentName) ?? {};
};

/**
 * Returns CSS variables array.
 *
 * @access public
 *
 * @returns {array}
 */
export const getSettingsStyles = () => {
	return getSettings()?.styles ?? [];
};

/**
 * Returns wrapper manifest details.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettingsWrapper = () => {
	return getSettings()?.wrapper ?? {};
};

/**
 * Returns project namespace from global settings.
 *
 * @access public
 *
 * @returns {string}
 */
export const getSettingsNamespace = () => {
	return getSettingsGlobal()?.namespace ?? '';
};

/**
 * Returns block full name that contains namespace and block name.
 *
 * @access public
 *
 * @returns {string}
 */
export const getSettingsBlockFullName = (blockName) => {
	const namespace = getSettingsNamespace();
	const block = getSettingsBlock(blockName)?.blockName;

	return namespace && block ? `${namespace}/${block}` : '';
};

/**
 * Returns global settings global css variables object.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettingsGlobalCssVariables = () => {
	return getSettingsGlobal()?.globalVariables ?? {};
};

/**
 * Returns global settings global css one variable.
 *
 * @access public
 *
 * @returns {mixed}
 */
export const getSettingsGlobalCssVariable = (variable) => {
	return getSettingsGlobalCssVariables()[variable];
};
