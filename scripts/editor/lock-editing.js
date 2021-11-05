/**
 * Given a block's client ID and an attribute key, locks post saving in Gutenberg.
 * A lock is created under the name undefined-lock-[blockClientId]-[attributeKey], 
 * meaning that a lock can be created for each attribute key of each block.
 * Multiple locks can be present and all of them have to be removed before saving is unlocked.
 * 
 * @param {string} blockClientId A block's client ID
 * @param {string} attributeKey The attribute key
 *
 * @returns {void}
 * 
 * Usage:
 * ```js
 * lockPostEditing(clientId, getAttrKey('headingContent', attributes, manifest), value); 
 * ```
 */
export const lockPostEditing = (blockClientId, attributeKey) => {
  wp.data.dispatch('core/editor').lockPostSaving(`undefined-lock-${blockClientId}-${attributeKey}`);
};

/**
 * Given a block's client ID and an attribute key, unlocks post saving in Gutenberg.
 * A lock is created under the name undefined-lock-[blockClientId]-[attributeKey],
 * meaning that a lock can be created for each attribute key of each block.
 * Multiple locks can be present and all of them have to be removed before saving is unlocked.
 *
 * @param {string} blockClientId A block's client ID
 * @param {string} attributeKey The attribute key
 * 
 * @returns {void}
 * 
 * Usage:
 * ```js
 * unlockPostEditing(clientId, getAttrKey('headingContent', attributes, manifest), value);
 * ```
 */

export const unlockPostEditing = (blockClientId, attributeKey) => {
  wp.data.dispatch('core/editor').unlockPostSaving(`undefined-lock-${blockClientId}-${attributeKey}`);
};

/**
 * Given a block's client ID, attribute key and new value, creates a lock, locks post saving in Gutenberg
 * if the value is undefined, null or an empty string and unlocks that attribute's lock otherwise.
 * 
 * A lock is created under the name undefined-lock-[blockClientId]-[attributeKey],
 * meaning that a lock can be created for each attribute key of each block.
 * Multiple locks can be present and all of them have to be removed before saving is unlocked.
 *
 * @param {string} blockClientId A block's client ID
 * @param {string} attributeKey The attribute key
 * 
 * @returns {void}
 * 
 * Usage:
 * ```js
 * onChange={(value) => {
 *  setAttributes({ [getAttrKey('headingContent', attributes, manifest)]: value });
 *  lockIfUndefined(clientId, getAttrKey('headingContent', attributes, manifest), value);
 * }}
 * ```
 */

export const lockIfUndefined = (blockClientId, attributeKey, value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    lockPostEditing(blockClientId, attributeKey);
    return;
  }
  unlockPostEditing(blockClientId, attributeKey);
};