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
import { LoadMoreOptions } from '../../../components/load-more/components/load-more-options';
import manifest from '../manifest.json';

export const FeaturedContentOptions = ({ attributes, setAttributes }) => {
	const featuredContentPostType = checkAttr('featuredContentPostType', attributes, manifest);
	const featuredContentTaxonomy = checkAttr('featuredContentTaxonomy', attributes, manifest, true);
	const featuredContentTerms = checkAttr('featuredContentTerms', attributes, manifest) ?? [];
	const featuredContentUseCurrentTerm = checkAttr('featuredContentUseCurrentTerm', attributes, manifest);
	const featuredContentPosts = checkAttr('featuredContentPosts', attributes, manifest) ?? [];
	const featuredContentExcludeCurrentPost = checkAttr('featuredContentExcludeCurrentPost', attributes, manifest);
	const featuredContentRandomOrder = checkAttr('featuredContentRandomOrder', attributes, manifest);

	const allGenericOption = { label: __('All', 'eightshift-frontend-libs'), value: '_all' };

	const postTypeOptions = getOption('featuredContentPostType', attributes, manifest);
	const taxonomyOptions = [
		allGenericOption,
		...getOption('featuredContentTaxonomy', attributes, manifest),
	];

	console.log({ featuredContentTaxonomy });

	// Set internal store for specific items.
	const [useSpecificPosts, setUseSpecificPosts] = useState(featuredContentPosts?.length > 0);
	const [useSpecificTerms, setUseSpecificTerms] = useState(featuredContentTerms?.length > 0);

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
					/>

					{featuredContentPostType?.taxonomies?.length > 0 &&
						<Select
							label={__('Taxonomy', 'eightshift-frontend-libs')}
							value={featuredContentTaxonomy ?? allGenericOption}
							options={taxonomyOptions}
							onChange={(value) => {
								setUseSpecificPosts(false);
								setUseSpecificTerms(false);

								setAttributes({
									[getAttrKey('featuredContentTaxonomy', attributes, manifest)]: value === allGenericOption ? undefined : value,
									[getAttrKey('featuredContentTerms', attributes, manifest)]: undefined,
									[getAttrKey('featuredContentUseCurrentTerm', attributes, manifest)]: false,
									[getAttrKey('featuredContentPosts', attributes, manifest)]: undefined,
								});
							}}

							// placeholder={__('All', 'eightshift-frontend-libs')}
							noBottomSpacing
						/>
					}
				</Control>

				{featuredContentTaxonomy &&
					<>
						{!featuredContentUseCurrentTerm &&
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
								reducedBottomSpacing={useSpecificTerms}
							/>
						}

						<AnimatedContentVisibility showIf={useSpecificTerms && !featuredContentUseCurrentTerm}>
							<AsyncMultiSelect
								key={featuredContentTaxonomy?.value}
								help={__('Newest 30 items are shown, others can be selected by searching. If blank, all items are shown.', 'eightshift-frontend-libs')}
								value={featuredContentTerms}
								loadOptions={getFetchWpApi(featuredContentTaxonomy?.api, {
									fields: 'id,name',
									processId: ({ id }) => id,
									processLabel: ({ name }) => unescapeHTML(name),
									noCache: true,
								})}
								onChange={(value) => setAttributes({ [getAttrKey('featuredContentTerms', attributes, manifest)]: value })}
								reFetchOnSearch
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
						{!featuredContentExcludeCurrentPost &&
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
								reducedBottomSpacing={useSpecificPosts}
							/>
						}

						<AnimatedContentVisibility showIf={useSpecificPosts && !featuredContentExcludeCurrentPost}>
							<AsyncMultiSelect
								key={featuredContentPostType.value}
								help={__('Newest 30 items are shown, others can be selected by searching. If blank, all items are shown.', 'eightshift-frontend-libs')}
								value={featuredContentPosts}
								loadOptions={getFetchWpApi(featuredContentPostType?.api, {
									processLabel: ({ title: { rendered } }) => unescapeHTML(rendered),
									noCache: true,
								})}
								onChange={(value) => setAttributes({ [getAttrKey('featuredContentPosts', attributes, manifest)]: value })}
								reFetchOnSearch
							/>
						</AnimatedContentVisibility>
					</>
				}

				{!useSpecificPosts &&
					<IconToggle
						icon={icons.excludeItemAlt}
						label={__('Exclude current', 'eightshift-frontend-libs')}
						help={__('Best used with posts', 'eightshift-frontend-libs')}
						checked={featuredContentExcludeCurrentPost}
						onChange={(value) => setAttributes({ [getAttrKey('featuredContentExcludeCurrentPost', attributes, manifest)]: value })}
						inlineHelp
					/>
				}

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
