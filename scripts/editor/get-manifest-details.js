/**
 * Return project details from global window object.
 *
 * @returns {object}
 */
export const getProjectDetails = () => {
	return window?.['eightshift']?.[process.env.VERSION] ?? {};
};

/**
 * Returns project features config details.
 *
 * @returns {object}
 */
export const getConfig = () => {
	return getProjectDetails()?.config ?? {};
};

/**
 * Get project features config - output variables inline.
 *
 * @returns {object}
 */
export const getConfigOutputCssVariables = () => {
	return getConfig().outputVariablesInline;
};

/**
 * Set project features config - output variables inline.
 *
 * @returns {object}
 */
export const setConfigOutputCssVariables = (value) => {
	getConfig().outputVariablesInline = value;
};

/**
 * Returns global manifest details.
 *
 * @returns  {object}
 */
export const getGlobalManifest = () => {
	return getProjectDetails()?.globalManifest ?? {};
};

/**
 * Returns all blocks manifest array.
 *
 * @returns {array}
 */
export const getBlocksManifest = () => {
	return getProjectDetails()?.blocks ?? [];
};

/**
 * Returns one block manifest details.
 *
 * @param {string} blockName Block name to search.
 *
 * @returns {object}
 */
export const getBlockManifest = (blockName) => {
	return getBlocksManifest().filter((item) => item.blockName === blockName) ?? {};
};

/**
 * Returns all components manifest array.
 *
 * @returns {array}
 */
export const getComponentsManifest = () => {
	return getProjectDetails()?.components ?? [];
};

/**
 * Returns one component manifest details.
 *
 * @param {string} componentName Component name to search.
 *
 * @returns {object}
 */
export const getComponentManifest = (componentName) => {
	return getComponentsManifest().filter((item) => item.componentName === componentName) ?? {};
};

/**
 * Returns CSS variables array.
 *
 * @returns {array}
 */
export const getStyles = () => {
	return getProjectDetails()?.styles ?? [];
};

/**
 * Returns wrapper manifest details.
 *
 * @returns {object}
 */
export const getWrapperManifest = () => {
	return getProjectDetails()?.wrapper ?? {};
};

/**
 * Returns project namespace from global settings.
 *
 * @returns {string}
 */
export const getNamespace = () => {
	return getGlobalManifest()?.namespace ?? '';
};

/**
 * Returns block full name that contains namespace and block name.
 *
 * @returns {string}
 */
export const getBlockFullName = (blockName) => {
	const namespace = getNamespace();
	const block = getBlockManifest(blockName)?.blockName;

	return namespace && block ? `${namespace}/${block}` : '';
};
