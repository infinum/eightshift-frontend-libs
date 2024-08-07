import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import {
	checkAttr,
	getAttrKey,
	IconToggle,
	getOption,
	Select,
	NumberPicker,
	getFetchWpApi,
	AsyncMultiSelect,
	Section,
	unescapeHTML,
} from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
import manifest from './../manifest.json';

export const FeaturedCategoriesOptions = ({ attributes, setAttributes }) => {
	const featuredCategoriesItemsPerLine = checkAttr('featuredCategoriesItemsPerLine', attributes, manifest);
	const featuredCategoriesPickTaxonomyManually = checkAttr('featuredCategoriesPickTaxonomyManually', attributes, manifest);

	const featuredCategoriesTaxonomy = checkAttr('featuredCategoriesTaxonomy', attributes, manifest);
	const featuredCategoriesManualTerms = checkAttr('featuredCategoriesManualTerms', attributes, manifest);

	return (
		<PanelBody title={__('Featured categories', '%g_textdomain%')}>
			<NumberPicker
				icon={icons.itemLimit}
				label={__('Items per row', '%g_textdomain%')}
				{...getOption('featuredCategoriesItemsPerLine', attributes, manifest)}
				value={featuredCategoriesItemsPerLine}
				onChange={(value) => setAttributes({ [getAttrKey('featuredCategoriesItemsPerLine', attributes, manifest)]: value })}
				inlineLabel
			/>

			<Section icon={icons.filter} label={__('Item source', '%g_textdomain%')}>
				<Select
					label={__('Taxonomy', '%g_textdomain%')}
					value={featuredCategoriesTaxonomy}
					options={manifest.allowed.taxonomies}
					onChange={(value) => setAttributes({ [getAttrKey('featuredCategoriesTaxonomy', attributes, manifest)]: value })}
					noBottomSpacing={!featuredCategoriesTaxonomy}
				/>
			</Section>

			<Section showIf={featuredCategoriesTaxonomy} noBottomSpacing>
				<IconToggle
					icon={icons.itemSelect}
					label={__('Manually select terms', '%g_textdomain%')}
					checked={featuredCategoriesPickTaxonomyManually}
					onChange={(value) => {
						let attributesToUpdate = { [getAttrKey('featuredCategoriesPickTaxonomyManually', attributes, manifest)]: value };

						if (value === false) {
							attributesToUpdate = {
								...attributesToUpdate,
								[getAttrKey('featuredCategoriesPickTaxonomyManually', attributes, manifest)]: value
							};
						}

						setAttributes(attributesToUpdate);
					}}
					reducedBottomSpacing={featuredCategoriesPickTaxonomyManually}
					noBottomSpacing={!featuredCategoriesPickTaxonomyManually}
				/>

				{featuredCategoriesPickTaxonomyManually &&
					<AsyncMultiSelect
						key={featuredCategoriesTaxonomy}
						loadOptions={getFetchWpApi(featuredCategoriesTaxonomy?.restName, {
							fields: 'id,name',
							processId: ({ id }) => id,
							processLabel: ({ name }) => unescapeHTML(name),
						})}
						value={featuredCategoriesManualTerms}
						onChange={(value) => setAttributes({ [getAttrKey('featuredCategoriesManualTerms', attributes, manifest)]: value })}
						noBottomSpacing
					/>
				}
			</Section>
		</PanelBody>
	);
};
