import React from 'react';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody, Notice } from '@wordpress/components';
import {
	CustomSelect,
	icons,
	IconLabel,
	BlockIcon,
	getAttrKey,
	IconToggle,
	checkAttr,
	getOption,
	unescapeHTML,
	getFetchWpApi,
	props,
	getOptions
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

	const WarningInfo = () => {
		return (
			<>
				<Notice
					status={"warning"}
					isDismissible={false}
				>
					{__('This options can only be used in post single. Keep in mind by selecting this option the editor preview may not show the correct items!', 'eightshift-boilerplate')}
				</Notice>
				<br />
			</>
		);
	};

	return (
		<PanelBody title={__('Featured content', 'eightshift-boilerplate')}>
			{postTypeOptions.length > 0 &&
				<>
					<CustomSelect
						label={<IconLabel icon={icons.file} label={__('Filter by content type', 'eightshift-boilerplate')} />}
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
						isClearable={false}
						simpleValue={true}
					/>

					{taxonomyOption().length > 0 &&
						<CustomSelect
							label={<IconLabel icon={icons.editOptions} label={__('Filter by taxonomy', 'eightshift-boilerplate')} />}
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
							isClearable={true}
							simpleValue={true}
						/>
					}

					{featuredContentTaxonomy &&
						<>
							<IconToggle
								icon={icons.hoverBackgroundType}
								label={__('Select specific items', 'eightshift-boilerplate')}
								help={__('This options will allow you to manually select items to show.', 'eightshift-boilerplate')}
								checked={useSpecificTerms}
								onChange={() => {
									setUseSpecificTerms(!useSpecificTerms);
									setAttributes({
										[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
										[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: false,
									});
								}}
							/>

							{useSpecificTerms ?
								<CustomSelect
									label={<IconLabel icon={icons.clipboard}  label={__('Show only specific items', 'eightshift-boilerplate')} />}
									help={__('You will preview the latest 30 items, use the search option to find the item you are looking for. If nothing is selected, all items are shown.', 'eightshift-boilerplate')}
									value={featuredContentTerms}
									multiple={true}
									reFetchOnSearch={true}
									loadOptions={getFetchWpApi(getTaxonomyEndpoint, { fields: 'id,name' })}
									onChange={(value) => {
										setAttributes({
											[getAttrKey('featuredContentTerms', attributes, manifest)]: value,
										});
									}}
								/> :
								<>
									<IconToggle
										icon={icons.filterAlt}
										label={__('Use term of the current post', 'eightshift-boilerplate')}
										help={__('This option allows you to show items in the current post taxonomy. In order for this to work you must select value in the Filter by taxonomy option.', 'eightshift-boilerplate')}
										checked={featuredContentUseCurrentTerm}
										onChange={() => {
											setAttributes({
												[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: !featuredContentUseCurrentTerm,
												[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
											});
										}}
									/>
									{featuredContentUseCurrentTerm &&
										<WarningInfo />
									}
								</>
							}
						</>
					}

					{!featuredContentTaxonomy &&
						<>
							<IconToggle
								icon={icons.visible}
								label={__('Select specific items to show?', 'eightshift-boilerplate')}
								checked={useSpecificPosts}
								help={__('This option allows you to select individual items to show.', 'eightshift-boilerplate')}
								onChange={() => {
									setUseSpecificPosts(!useSpecificPosts);
									setAttributes({
										[getAttrKey('featuredContentPosts', attributes, manifest)]: undefined,
									});
								}}
							/>

							{useSpecificPosts &&
								<CustomSelect
									label={<IconLabel icon={<BlockIcon iconName='esf-select' />}  label={__('Show only specific items', 'eightshift-boilerplate')} />}
									help={__('You will preview the latest 30 items, use the search option to find the item you are looking for. If nothing is selected, all items are shown.', 'eightshift-boilerplate')}
									value={featuredContentPosts}
									multiple={true}
									reFetchOnSearch={true}
									loadOptions={getFetchWpApi(getPostTypeEndpoint, {processLabel: ({ title: { rendered: renderedTitle } }) => unescapeHTML(renderedTitle) })}
									onChange={(value) => {
										setAttributes({
											[getAttrKey('featuredContentPosts', attributes, manifest)]: value,
										});
									}}
								/>
							}
						</>
					}
				</>
			}

			<IconToggle
				icon={icons.none}
				label={__('Exclude current post', 'eightshift-boilerplate')}
				checked={featuredContentExcludeCurrentPost}
				help={__('Exclude current post from the featured content block items.', 'eightshift-boilerplate')}
				onChange={(value) => setAttributes({ [getAttrKey('featuredContentExcludeCurrentPost', attributes, manifest)]: value })}
			/>

			{featuredContentExcludeCurrentPost &&
				<WarningInfo />
			}

			<IconToggle
				icon={icons.rotateRight}
				label={__('Use random order', 'eightshift-boilerplate')}
				checked={featuredContentRandomOrder}
				help={__('Show posts in random order.', 'eightshift-boilerplate')}
				onChange={(value) => setAttributes({ [getAttrKey('featuredContentRandomOrder', attributes, manifest)]: value })}
			/>

			<LayoutOptions
				{...props('layout', attributes, {
					setAttributes,
					options: getOptions(attributes, manifest),
				})}
				showLayoutUse={false}
			/>

			<LoadMoreOptions
				{...props('load-more', attributes, {
					setAttributes,
					options: getOptions(attributes, manifest),
				})}
			/>
		</PanelBody>
	);
};
