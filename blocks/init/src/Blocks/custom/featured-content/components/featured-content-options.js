import React from 'react';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import {
	CustomSelect,
	icons,
	IconLabel,
	getAttrKey,
	IconToggle,
	checkAttr,
	getOption,
	unescapeHTML,
	getFetchWpApi,
	props,
	getOptions,
	InlineNotification,
	InlineNotificationType
} from '@eightshift/frontend-libs/scripts';
import { LayoutOptions } from './../../../components/layout/components/layout-options';
import manifest from '../manifest.json';
import { LoadMoreOptions } from '../../../components/load-more/components/load-more-options';

export const FeaturedContentOptions = ({ attributes, setAttributes }) => {
	const featuredContentPostType = checkAttr('featuredContentPostType', attributes, manifest);
	const featuredContentTaxonomy = checkAttr('featuredContentTaxonomy', attributes, manifest);
	const featuredContentTerms = checkAttr('featuredContentTerms', attributes, manifest) || [];
	const featuredContentUseCurrentTerm = checkAttr('featuredContentUseCurrentTerm', attributes, manifest);
	const featuredContentPosts = checkAttr('featuredContentPosts', attributes, manifest) || [];
	const featuredContentExcludeCurrentPost = checkAttr('featuredContentExcludeCurrentPost', attributes, manifest);
	const featuredContentRandomOrder = checkAttr('featuredContentRandomOrder', attributes, manifest);

	const postTypeOptions = getOption('featuredContentPostType', attributes, manifest);
	const taxonomyOptions = getOption('featuredContentTaxonomy', attributes, manifest);

	// Fetch all taxonomies based on the postType selected.
	const taxonomyOption = () => {
		const selectedType = postTypeOptions.filter((item) => item?.value === featuredContentPostType)[0] ?? {};

		const taxonomy = selectedType?.taxonomy;

		if (typeof taxonomy === 'undefined') {
			return [];
		}

		return taxonomyOptions.filter((item) => taxonomy.includes(item?.value)) ?? [];
	};

	// Set internal store for specific items.
	const [useSpecificPosts, setUseSpecificPosts] = useState(featuredContentPosts.length > 0);
	const [useSpecificTerms, setUseSpecificTerms] = useState(featuredContentTerms.length > 0);

	// Select post type api endpoint based on the selected post type.
	const getPostTypeEndpoint = postTypeOptions.filter((item) => item.value === featuredContentPostType)[0]?.api ?? [];

	// Select taxonomy api endpoint based on the selected taxonomy.
	const getTaxonomyEndpoint = taxonomyOptions.filter((item) => item.value === featuredContentTaxonomy)[0]?.api ?? [];


	return (
		<PanelBody title={__('Featured content', 'eightshift-frontend-libs')}>
			{(featuredContentUseCurrentTerm || featuredContentExcludeCurrentPost) &&
				<InlineNotification
					type={InlineNotificationType.WARNING}
					text={__('Note', 'eightshift-frontend-libs')}
					subtitle={__('Editor preview may not show an accurate list of items.')}
				/>
			}

			<LayoutOptions
				{...props('layout', attributes, {
					setAttributes,
					options: getOptions(attributes, manifest),
				})}
				showLayoutUse={false}
			/>

			<hr />

			{postTypeOptions.length > 0 &&
				<>
					<IconLabel icon={icons.multiple} label={__('Item source', 'eightshift-frontend-libs')} additionalClasses='es-mb-3' standalone />

					<CustomSelect
						label={__('Type', 'eightshift-frontend-libs')}
						value={featuredContentPostType}
						options={postTypeOptions}
						onChange={(value) => {
							setUseSpecificPosts(false);
							setUseSpecificTerms(false);

							setAttributes({
								[getAttrKey('featuredContentPostType', attributes, manifest)]: value,
								[getAttrKey('featuredContentTaxonomy', attributes, manifest)]: undefined,
								[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
								[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: false,
								[getAttrKey('featuredContentPosts', attributes, manifest)]: undefined,
							});
						}}
						additionalClasses='es-inline-input-label-40 es-mb-3!'
						isClearable={false}
						simpleValue
					/>

					{taxonomyOption().length > 0 &&
						<CustomSelect
							label={__('Taxonomy', 'eightshift-frontend-libs')}
							value={featuredContentTaxonomy}
							options={taxonomyOption()}
							onChange={(value) => {
								setUseSpecificPosts(false);
								setUseSpecificTerms(false);

								setAttributes({
									[getAttrKey('featuredContentTaxonomy', attributes, manifest)]: value,
									[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
									[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: false,
									[getAttrKey('featuredContentPosts', attributes, manifest)]: undefined,
								});
							}}
							additionalClasses='es-inline-input-label-40 es-mb-3!'
							isClearable
							simpleValue
						/>
					}

					<hr />

					{featuredContentTaxonomy &&
						<>
							<IconToggle
								icon={icons.itemSelect}
								label={__('Manually select taxonomies', 'eightshift-frontend-libs')}
								checked={useSpecificTerms}
								onChange={() => {
									setUseSpecificTerms(!useSpecificTerms);
									setAttributes({
										[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
										[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: false,
									});
								}}
							/>

							{useSpecificTerms &&
								<>
									<CustomSelect
										help={__('Newest 30 items are shown, others can be selected by searching. If blank, all items are shown.', 'eightshift-frontend-libs')}
										value={featuredContentTerms}
										multiple={true}
										reFetchOnSearch={true}
										loadOptions={getFetchWpApi(getTaxonomyEndpoint, { fields: 'id,name' })}
										onChange={(value) => {
											setAttributes({
												[getAttrKey('featuredContentTerms', attributes, manifest)]: value,
											});
										}}
									/>

									<hr />
								</>
							}

							{!useSpecificTerms &&
								<IconToggle
									icon={icons.checkCircle}
									label={__('Use current item\'s terms', 'eightshift-frontend-libs')}
									help={__('Best used with posts', 'eightshift-frontend-libs')}
									inlineHelp
									checked={featuredContentUseCurrentTerm}
									onChange={() => {
										setAttributes({
											[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: !featuredContentUseCurrentTerm,
											[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
										});
									}}
								/>
							}
						</>
					}

					{!featuredContentTaxonomy &&
						<>
							<IconToggle
								icon={icons.itemSelect}
								label={__('Manually select items', 'eightshift-frontend-libs')}
								checked={useSpecificPosts}
								onChange={() => {
									setUseSpecificPosts(!useSpecificPosts);
									setAttributes({
										[getAttrKey('featuredContentPosts', attributes, manifest)]: undefined,
									});
								}}
							/>

							{useSpecificPosts &&
								<>
									<CustomSelect
										help={__('Newest 30 items are shown, others can be selected by searching. If blank, all items are shown.', 'eightshift-frontend-libs')}
										value={featuredContentPosts}
										multiple={true}
										reFetchOnSearch={true}
										loadOptions={getFetchWpApi(getPostTypeEndpoint, { processLabel: ({ title: { rendered: renderedTitle } }) => unescapeHTML(renderedTitle) })}
										onChange={(value) => setAttributes({ [getAttrKey('featuredContentPosts', attributes, manifest)]: value })}
									/>

									<hr />
								</>
							}
						</>
					}
				</>
			}

			<IconToggle
				icon={icons.excludeItem}
				label={__('Exclude current', 'eightshift-frontend-libs')}
				help={__('Best used with posts', 'eightshift-frontend-libs')}
				checked={featuredContentExcludeCurrentPost}
				onChange={(value) => setAttributes({ [getAttrKey('featuredContentExcludeCurrentPost', attributes, manifest)]: value })}
				inlineHelp
			/>

			<IconToggle
				icon={icons.dice}
				label={__('Randomize order', 'eightshift-frontend-libs')}
				help={__('Not shown in editor preview', 'eightshift-frontend-libs')}
				checked={featuredContentRandomOrder}
				onChange={(value) => setAttributes({ [getAttrKey('featuredContentRandomOrder', attributes, manifest)]: value })}
				inlineHelp
			/>

			<hr />

			<LoadMoreOptions
				{...props('load-more', attributes, {
					setAttributes,
					options: getOptions(attributes, manifest),
				})}
				label={__('"Load more" button', 'eightshift-frontend-libs')}
			/>
		</PanelBody>
	);
};
