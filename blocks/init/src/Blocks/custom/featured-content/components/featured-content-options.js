import React from 'react';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import {
	icons,
	getAttrKey,
	IconToggle,
	checkAttr,
	getOption,
	unescapeHTML,
	getFetchWpApi,
	props,
	getOptions,
	Notification,
	Section,
	Select,
	AsyncMultiSelect,
	Control,
	AnimatedContentVisibility
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
			<AnimatedContentVisibility showIf={featuredContentUseCurrentTerm || featuredContentExcludeCurrentPost}>
				<Notification
					type='warning'
					text={__('Note', 'eightshift-frontend-libs')}
					subtitle={__('Editor preview may not show an accurate list of items.')}
				/>
			</AnimatedContentVisibility>

			<Section icon={icons.layoutAlt3} label={__('Layout', 'eightshift-frontend-libs')}>
				<LayoutOptions
					{...props('layout', attributes, {
						setAttributes,
						options: getOptions(attributes, manifest),
					})}
					noLabel
					noUseToggle
					noExpandButton
				/>
			</Section>

			<Section showIf={postTypeOptions.length > 0} icon={icons.filter} label={__('Item source', 'eightshift-frontend-libs')} noBottomSpacing>
				<Control additionalClasses='es-fifty-fifty-h'>
					<Select
						label={__('Kind', 'eightshift-frontend-libs')}
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
						noBottomSpacing
						simpleValue
					/>

					{taxonomyOption().length > 0 &&
						<Select
							label={__('Taxonomy', 'eightshift-frontend-libs')}
							value={featuredContentTaxonomy}
							options={
								[
									{
										label: __('All', 'eightshift-frontend-libs'),
										// value: null,
									},
									...taxonomyOption(),
								]
							}
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
							// clearable
							simpleValue
							noBottomSpacing
						/>
					}
				</Control>

				{featuredContentTaxonomy &&
					<>
						<IconToggle
							icon={icons.itemSelect}
							label={__('Select terms to show', 'eightshift-frontend-libs')}
							checked={useSpecificTerms}
							onChange={() => {
								setUseSpecificTerms(!useSpecificTerms);
								setAttributes({
									[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
									[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: false,
								});
							}}
						/>

						<AnimatedContentVisibility showIf={useSpecificTerms}>
							<AsyncMultiSelect
								help={__('Newest 30 items are shown, others can be selected by searching. If blank, all items are shown.', 'eightshift-frontend-libs')}
								value={featuredContentTerms}
								loadOptions={getFetchWpApi(getTaxonomyEndpoint, { fields: 'id,name' })}
								onChange={(value) => {
									setAttributes({
										[getAttrKey('featuredContentTerms', attributes, manifest)]: value,
									});
								}}
								reFetchOnSearch
								multiple
							/>
						</AnimatedContentVisibility>

						{!useSpecificTerms &&
							<IconToggle
								icon={icons.checkCircle}
								label={__("Use current item's terms", 'eightshift-frontend-libs')}
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
							label={__('Select items to show', 'eightshift-frontend-libs')}
							checked={useSpecificPosts}
							onChange={() => {
								setUseSpecificPosts(!useSpecificPosts);
								setAttributes({
									[getAttrKey('featuredContentPosts', attributes, manifest)]: undefined,
								});
							}}
						/>

						<AnimatedContentVisibility showIf={useSpecificPosts}>
							<AsyncMultiSelect
								help={__('Newest 30 items are shown, others can be selected by searching. If blank, all items are shown.', 'eightshift-frontend-libs')}
								value={featuredContentPosts}
								loadOptions={getFetchWpApi(getPostTypeEndpoint, { processLabel: ({ title: { rendered: renderedTitle } }) => unescapeHTML(renderedTitle) })}
								onChange={(value) => setAttributes({ [getAttrKey('featuredContentPosts', attributes, manifest)]: value })}
								reFetchOnSearch
								multiple
							/>
						</AnimatedContentVisibility>
					</>
				}

				<IconToggle
					icon={icons.excludeItemAlt}
					label={__('Exclude current', 'eightshift-frontend-libs')}
					help={__('Best used with posts', 'eightshift-frontend-libs')}
					checked={featuredContentExcludeCurrentPost}
					onChange={(value) => setAttributes({ [getAttrKey('featuredContentExcludeCurrentPost', attributes, manifest)]: value })}
					inlineHelp
				/>

				<IconToggle
					icon={icons.dice}
					label={__('Randomize order', 'eightshift-frontend-libs')}
					checked={featuredContentRandomOrder}
					onChange={(value) => setAttributes({ [getAttrKey('featuredContentRandomOrder', attributes, manifest)]: value })}
				/>
			</Section>

			<Section label={__('Other', 'eightshift-frontend-libs')} icon={icons.moreH} noBottomSpacing>
				<LoadMoreOptions
					{...props('load-more', attributes, {
						setAttributes,
						options: getOptions(attributes, manifest),
					})}
					label={__('"Load more" button', 'eightshift-frontend-libs')}
					noBottomSpacing
				/>
			</Section>
		</PanelBody>
	);
};
