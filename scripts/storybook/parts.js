import { dispatch, select } from '@wordpress/data';

/**
 * Manually populate categories for blocks. This is generated in the PHP part of the real project.
 */
export const storybookDefaultMocksCategories = () => {
	dispatch('core/blocks').setCategories([
		{
			slug: 'eightshift',
			title: 'Eightshift',
			icon: 'admin-settings',
		},
		{
			slug: 'common',
			title: 'Common',
		},
	]);
};

/**
 * Manually populate blocks color palette. This is generated in the PHP part of the real project.
 *
 * @param {object} blocksGlobalManifest Full path to global blocks manifest.
 */
export const storybookDefaultMocksColorPalette = (blocksGlobalManifest) => {
	select('core/block-editor').getSettings().colors = blocksGlobalManifest.globalVariables.colors;
};

/**
 * Loading WP build files.
 */
export const storybookWindowObjects = () => {
	window.wp.a11y = require('@wordpress/a11y/build-module');
	window.wp.apiFetch = require('@wordpress/api-fetch/build-module');
	window.wp.autop = require('@wordpress/autop/build-module');
	window.wp.blob = require('@wordpress/blob/build-module');
	window.wp.blockEditor = require('@wordpress/block-editor/build-module');
	window.wp.blockLibrary = require('@wordpress/block-library/build-module');
	window.wp.blockSerializationDefaultParser = require('@wordpress/block-serialization-default-parser/build-module');
	window.wp.blocks = require('@wordpress/blocks/build-module');
	window.wp.components = require('@wordpress/components/build-module');
	window.wp.compose = require('@wordpress/compose/build-module');
	window.wp.coreData = require('@wordpress/core-data/build-module');
	window.wp.data = require('@wordpress/data/build-module');
	window.wp.dataControls = require('@wordpress/data-controls/build-module');
	window.wp.date = require('@wordpress/date/build-module');
	window.wp.deprecated = require('@wordpress/deprecated/build-module');
	window.wp.dom = require('@wordpress/dom/build-module');
	window.wp.domReady = require('@wordpress/dom-ready/build-module');
	window.wp.editPost = require('@wordpress/edit-post/build-module');
	window.wp.editor = require('@wordpress/editor/build-module');
	window.wp.element = require('@wordpress/element/build-module');
	window.wp.escapeHtml = require('@wordpress/escape-html/build-module');
	window.wp.formatLibrary = require('@wordpress/format-library/build-module');
	window.wp.hooks = require('@wordpress/hooks/build-module');
	window.wp.htmlEntities = require('@wordpress/html-entities/build-module');
	window.wp.i18n = require('@wordpress/i18n/build-module');
	window.wp.isShallowEqual = require('@wordpress/is-shallow-equal');
	window.wp.keyboardShortcuts = require('@wordpress/keyboard-shortcuts/build-module');
	window.wp.keycodes = require('@wordpress/keycodes/build-module');
	window.wp.mediaUtils = require('@wordpress/media-utils/build-module');
	window.wp.notices = require('@wordpress/notices/build-module');
	window.wp.plugins = require('@wordpress/plugins/build-module');
	window.wp.primitives = require('@wordpress/primitives/build-module');
	window.wp.priorityQueue = require('@wordpress/priority-queue/build-module');
	window.wp.reduxRoutine = require('@wordpress/redux-routine/build-module');
	window.wp.richText = require('@wordpress/rich-text/build-module');
	window.wp.serverSideRender = require('@wordpress/server-side-render/build-module');
	window.wp.shortcode = require('@wordpress/shortcode/build-module');
	window.wp.tokenList = require('@wordpress/token-list/build-module');
	window.wp.url = require('@wordpress/url/build-module');
	window.wp.viewport = require('@wordpress/viewport/build-module');
	window.wp.warning = require('@wordpress/warning/build-module');
	window.wp.wordcount = require('@wordpress/wordcount/build-module');
	window.wp.icons = require('@wordpress/icons/build-module');
};

/**
 * Loading styles for block editor.
 */
export const storybookWpStyles = () => {
	require('@wordpress/editor/build-style/style-rtl.css');
	require('@wordpress/editor/build-style/style.css');
	require('@wordpress/components/build-style/style.css');
	require('@wordpress/block-editor/build-style/style.css');
	require('@wordpress/format-library/build-style/style.css');
	require('@eightshift/frontend-libs/styles/storybook.scss');
};
