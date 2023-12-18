import React from 'react';
import { dispatch, select } from '@wordpress/data';
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	BlockTools,
	BlockInspector,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import { Popover, SlotFillProvider } from '@wordpress/components';
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
import '@wordpress/format-library';
import { useState, useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import ReactHtmlParser from 'react-html-parser';
import globalManifest from './../../blocks/init/src/Blocks/manifest.json';
import { getFullBlockName, getFullBlockNameVariation } from '../../scripts';

/**
 * Manually populate categories for blocks. This is generated in the PHP part of the real project.
 *
 * @access public
 *
 * @returns {void}
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
 * @access public
 *
 * @returns {void}
 */
export const storybookDefaultMocksColorPalette = () => {
	select('core/block-editor').getSettings().colors = globalManifest.globalVariables.colors;
};

/**
 * Loading WP build files.
 *
 * @access public
 *
 * @returns {void}
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
	window.wp.wordcount = require('@wordpress/wordcount/build-module');
	window.wp.icons = require('@wordpress/icons/build-module');
};

/**
 * Combine block details in one object.
 *
 * @param {object} manifest        - Block Manifest data.
 *
 * @access public
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * <Gutenberg props={blockDetails(manifest, globalManifest)} />
 * ```
 */
export const blockDetails = (manifest) => {
	return {
		...manifest,
		blockNameFull: getFullBlockName(globalManifest, manifest),
		attributes: manifest?.example?.attributes ?? manifest?.attributes,
		innerBlocks: getInnerBlocks(manifest?.example?.innerBlocks),
	};
};

/**
 * Combine block details in one object.
 *
 * @param {object} manifest        - Block Manifest data.
 *
 * @access public
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * <Gutenberg props={blockDetails(manifest, globalManifest)} />
 * ```
 */
export const componentDetails = (manifest) => {
	return {
		...manifest,
		attributes: manifest?.example?.attributes ?? manifest?.attributes,
	};
};

/**
 * Combine block details in one object.
 *
 * @param {object} manifest        - Block Manifest data.
 *
 * @access public
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * <Gutenberg props={blockDetails(manifest, globalManifest)} />
 * ```
 */
export const variationDetails = (manifest) => {
	return {
		...manifest,
		blockNameFull: getFullBlockNameVariation(globalManifest, manifest),
		attributes: manifest?.example?.attributes ?? manifest?.attributes,
		innerBlocks: getInnerBlocks(manifest?.example?.innerBlocks ?? manifest?.innerBlocks),
	};
};

/**
 * Load actual Block Editor and all the magic.
 *
 * @access public
 *
 * @param {object} props - All Props for blocks.
 *
 * @returns {component}
 *
 * Usage:
 * ```js
 * <Gutenberg props={blockDetails(manifest, globalManifest)} />
 * ```
 */
export const Gutenberg = ({ manifest, isVariation=false, additionalDescription }) => {
	const {
		blockNameFull,
		attributes,
		innerBlocks,
	} = isVariation ? variationDetails(manifest) : blockDetails(manifest);

	// Set default registered blocks.
	const [blocks, updateBlocks] = useState([]);

	useEffect(() => {
		select('core/blocks').getBlockTypes();

		const block = createBlock(blockNameFull, attributes, innerBlocks);
		blocks.push(block);
	});

	return (
		<div className="playground">
			<ShortcutProvider>
				<SlotFillProvider>
					<BlockEditorProvider
						value={blocks}
						onInput={updateBlocks}
						onChange={updateBlocks}
					>
						<div className="playground__sidebar">
							<BlockInspector />
						</div>
						<div className="playground__content">
							<GetStoryDescription
								data={isVariation ? variationDetails(manifest) : blockDetails(manifest)}
								additionalDescription={additionalDescription}
								isVariation={isVariation}
							/>
							<BlockTools>
								<div className="editor-styles-wrapper">
									<BlockEditorKeyboardShortcuts.Register />
									<WritingFlow>
										<ObserveTyping>
											<BlockList />
										</ObserveTyping>
									</WritingFlow>
								</div>
							</BlockTools>
						</div>
						<Popover.Slot />
					</BlockEditorProvider>
				</SlotFillProvider>
			</ShortcutProvider>
		</div>
	);
};

/**
 * Create Inner Blocks.
 *
 * @param {array} [innerBlocks=[]]      - Array of inner blocks.
 * @param {boolean} [isVariation=false] - Check if block is variation type.
 *
 * @access private
 *
 * @returns {object}
 */
export const getInnerBlocks = (innerBlocks = [], isVariation = false) => {
	return innerBlocks.map((blockItem) => {

		let blockInner;

		if (isVariation) {
			blockInner = createBlock(blockItem[0], blockItem[1], blockItem[2]);
		} else {
			blockInner = createBlock(blockItem.name);
		}

		// Set example attributes for inner block.
		blockInner.attributes = {
			...blockInner.attributes,
			...blockItem.attributes,
		};

		// Run recursive because of multiple nested blocks.
		blockInner.innerBlocks = getInnerBlocks(blockItem.innerBlocks, isVariation);

		return blockInner;
	});
};

/**
 * Item for nicely showing a property in a Storybook story.
 *
 * @param {object} props - SingleItemShowcase props.
 * @param {string|React.Component} props.title - Title of the card
 * @param {object?} [props.propsUsed] - List of highlighted props for this showcase. Should be in format of `{ 'propName': 'description', 'propName2': 'description2 , ...}`.
 * @param {string?} [props.demoContainerClass] - Class passed to the main container.
 * @param {array?} [props.additionalPanels] - Class passed to the main container.
 * @param {<React.component>} [props.children] - Main container contents - demo area.
 */
export const SingleItemShowcase = ({ title, propsUsed, demoContainerClass, additionalPanels, children }) => {
	return (
		<div
			className='es-display-flex es-flex-col es-rounded-1 es-shadow-sm es-border-cool-gray-100 es-text-3.25 es-w-80'
			style={{ '--wp-admin-theme-color': 'var(--es-admin-accent-color-default)' }}
		>
			<div className='es-px-4 es-py-2.5 es-border-b-cool-gray-100 es-bg-cool-gray-50'>
				<p className='es-m-0 es-p-0 es-text-3.5 es-font-weight-500'>{typeof title === 'string' ? ReactHtmlParser(title) : title}</p>
			</div>
			<div className={`es-p-4 ${demoContainerClass ?? ''}`}>
				{children}
			</div>

			{propsUsed &&
				<div className='es-p-4 es-border-t-cool-gray-100 es-mt-auto'>
					<p className='es-mt-0 es-mb-2 es-font-weight-500 es-text-3 es-color-cool-gray-500'>PROPS USED</p>

					<div className='es-v-spaced es-gap-1!'>
						{Object.entries(propsUsed).map(([propName, description], i, arr) => {
							return (
								<>
									<code className='es-m-0 es-color-eightshift-500'>{propName}</code>
									<p className={i < arr.length - 1 ? 'es-mt-0 es-mb-3' : 'es-m-0'}>{ReactHtmlParser(description)}</p>
								</>
							);
						})}
					</div>
				</div>
			}

			{additionalPanels && additionalPanels.map(({ title, content }, i) => {
				return (
					<div key={i} className='es-p-4 es-border-t-cool-gray-100'>
						{title &&
							<p className='es-mt-0 es-mb-2 es-font-weight-500 es-text-3 es-color-cool-gray-500'>{title.toUpperCase()}</p>
						}

						{content}
					</div>
				);
			})}
		</div>
	);
};

export const getStoryDescStyles = () => {
	return {
		doc: 'sbdocs es-border-b-cool-gray-100 es-mb-10 es-p-7 es-bg-cool-gray-50 es-line-h-1.5',
		docClean: 'sbdocs es-p-7 es-line-h-1.5',
		docHidden: 'sbdocs__hidden',
		h1: 'es-mt-0 es-font-weight-600 es-mb-2',
		h3: 'es-mt-6 es-font-weight-600 es-mb-2',
		p: 'es-text-4 es-mt-0 es-mb-2',
		ul: 'es-text-4 es-mt-0 es-mb-2',
		pSmall: 'es-text-3 es-mt-0 es-mb-2',
		ulSmall: 'es-text-3 es-mt-0 es-mb-2',
		code: 'es-border-cool-gray-100 es-text-3.5 es-p-2 es-bg-cool-gray-50 es-rounded-1.5 es-display-block es-mb-2',
		exp: 'es-text-3 es-m-0 es-color-cool-gray-400',
	}
};

export const GetStoryDescription = ({data, isVariation, additionalDescription}) => {
	const {
		title,
		name,
		description,
		blockName,
		components,
		nodeDependency,
		innerBlocksDependency,
	} = data;

	const style = getStoryDescStyles();

	const titleSuffix = isVariation ? 'variation' : 'block';
	const subTitleSuffix = isVariation ? 'Variation' : 'Block';
	const blockNameTitle = isVariation ? name : blockName;

	return (
		<div className={style.doc}>
			<h1 className={style.h1}>{title} {titleSuffix}</h1>
			<p className={style.p}>{description}</p>
			<p className={style.exp}>(&darr; Hover to expand)</p>

			<div className={style.docHidden}>
				{additionalDescription &&
					<>
						<h3 className={style.h3}>Note</h3>
						<div dangerouslySetInnerHTML={{__html: additionalDescription}} />
					</>
				}

				<h3 className={style.h3}>{subTitleSuffix} usage</h3>
				<p className={style.pSmall}>To use this {titleSuffix} in your project open a terminal and type in this command inside your projects root.</p>
				<code className={style.code}>
					<pre>wp boilerplate {isVariation ? 'use_variation' : 'use_block'} --name='{blockNameTitle}'</pre>
				</code>

				{innerBlocksDependency &&
					<>
						<h3 className={style.h3}>Inner blocks dependency</h3>
						<p className={style.pSmall}>This block uses some inner blocks dependencies, here is a list of block you should also copy in your project by using the following commands.</p>
						<code className={style.code}>
							{innerBlocksDependency.map((node, i) => <pre key={i}>{`wp boilerplate use_block --name='${node}'`}</pre>)}
						</code>
					</>
				}

				{components &&
					<>
						<h3 className={style.h3}>Components dependency</h3>
						<p className={style.pSmall}>This block has some components dependencies, here is a list of components you should also copy in your project by using the following commands.</p>
						<code className={style.code}>
							{Object.entries(components).map((node, i) => <pre key={i}>{`wp boilerplate use_component --name='${node[1]}'`}</pre>)}
						</code>
					</>
				}

				{nodeDependency &&
					<>
						<h3 className={style.h3}>JavaScript dependency</h3>
						<p className={style.pSmall}>This block uses some JavaScrip dependencies, here is a list of scripts you should install in your project by using the following commands.</p>
						<code className={style.code}>
							{nodeDependency.map((node, i) => <pre key={i}>{`npm install ${node}`}</pre>)}
						</code>
					</>
				}
			</div>
		</div>
	);
};

export const GetStoryComponentDescription = ({manifest, additionalDescription, children}) => {
	const {
		title,
		componentName,
		description,
		components,
	} = componentDetails(manifest);

	const style = getStoryDescStyles();

	return (
		<>
			<div className={style.doc}>
				<h1 className={style.h1}>{title} component</h1>
				<p className={style.p}>{description}</p>
				<p className={style.exp}>(&darr; Hover to expand)</p>

				<div className={style.docHidden}>
					{additionalDescription &&
						<>
							<h3 className={style.h3}>Note</h3>
							<div dangerouslySetInnerHTML={{__html: additionalDescription}} />
						</>
					}

					<h3 className={style.h3}>Component usage</h3>
					<p className={style.pSmall}>To use this component in your project open a terminal and type in this command inside your projects root.</p>
					<code className={style.code}>
						<pre>wp boilerplate use_component --name='{componentName}'</pre>
					</code>

					{components &&
						<>
							<h3 className={style.h3}>Components dependency</h3>
							<p className={style.pSmall}>This component has some components dependencies, here is a list of components you should also copy in your project by using the following commands.</p>
							<code className={style.code}>
								{Object.entries(components).map((node, i) => <pre key={i}>{`wp boilerplate use_component --name='${node[1]}'`}</pre>)}
							</code>
						</>
					}
				</div>
			</div>

			{children}
		</>
	);
};

export function reformatCode(str) {
	const allLines = str.split(/\n/g);
	while(allLines[0]?.replace(/\s/g, '').length === 0) {
		allLines.shift();
	}

	while(allLines[allLines.length - 1]?.replace(/\s/g, '').length === 0) {
		allLines.pop();
	}

	const relevantLines = str.split(/\n/g).filter((line) => line.replace(/\s/g, '').length > 0);
	const indents = relevantLines.map((line) => line.match(/^\s*/)?.[0]?.length ?? 0);
	const minIndent = Math.min(...indents);

	return allLines.map((line) => line.slice(minIndent)).join('\n');
}
