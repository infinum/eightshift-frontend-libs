import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { icons, checkAttr, getAttrKey, IconLabel, IconToggle, getOption, MultiSelect, Select, NumberPicker } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const FeaturedCategoriesOptions = ({ attributes, setAttributes }) => {
	const {
		featuredCategoriesQuery,
		featuredCategoriesQuery: {
			taxonomy,
			terms,
		},
	} = attributes;

	const featuredCategoriesItemsPerLine = checkAttr('featuredCategoriesItemsPerLine', attributes, manifest);
	const featuredCategoriesPickTaxonomyManually = checkAttr('featuredCategoriesPickTaxonomyManually', attributes, manifest);

	// Fetch all taxonomies.
	// Filter allowed taxonomies defined in the block manifest.
	const taxonomyOptions = useSelect((select) => {
		const { getTaxonomies } = select('core');

		const items = getTaxonomies() ?? [];

		const data = items.filter((element) => manifest.allowed.taxonomies.find((item) => element.slug === item)) ?? [];

		return data.map((item) => {
			return {
				label: item.labels.name,
				value: item.slug,
			};
		});
	});

	// Fetch all taxonomy terms based on the selected taxonomy.
	const termsOptions = useSelect((select) => {
		const { getEntityRecords } = select('core');

		const termsList = getEntityRecords(
			'taxonomy',
			taxonomy,
			{
				per_page: -1,
			}
		) ?? [];

		return [
			...termsList.map((item) => {
				return {
					label: item.name,
					value: item.id,
				};
			}),
		];
	});

	return (
		<PanelBody title={__('Featured categories', 'eightshift-frontend-libs')}>

			{taxonomyOptions[0] &&
				<>
					<IconLabel icon={icons.multiple} label={__('Item source', 'eightshift-frontend-libs')} additionalClasses='es-mb-3' standalone />
					<Select
						label={__('Taxonomy', 'eightshift-frontend-libs')}
						value={taxonomy}
						options={taxonomyOptions}
						onChange={(value) => {
							setAttributes({
								featuredCategoriesQuery: {
									...featuredCategoriesQuery,
									taxonomy: value,
									terms: [],
								},
							});
						}}
						isClearable={false}
						isSearchable={false}
						simpleValue
						additionalClasses='es-inline-input-label-40'
					/>
				</>
			}

			{taxonomyOptions[0] && taxonomy &&
				<>
					<hr />

					<IconToggle
						icon={icons.itemSelect}
						label={__('Manually select terms', 'eightshift-frontend-libs')}
						checked={featuredCategoriesPickTaxonomyManually}
						onChange={(value) => {
							setAttributes({ [getAttrKey('featuredCategoriesPickTaxonomyManually', attributes, manifest)]: value });

							if (value === false) {
								setAttributes({
									featuredCategoriesQuery: {
										...featuredCategoriesQuery,
										terms: [],
									},
								});
							}
						}}
					/>

					{featuredCategoriesPickTaxonomyManually &&
						<MultiSelect
							options={termsOptions}
							value={terms}
							multiple
							onChange={(value) => {
								setAttributes({
									featuredCategoriesQuery: {
										...featuredCategoriesQuery,
										terms: value[0] ? value : [],
									},
								});
							}}
							additionalClasses='-es-mt-3!'
						/>
					}

					{featuredCategoriesPickTaxonomyManually && <hr />}
				</>
			}

			<NumberPicker
				icon={icons.itemLimit}
				label={__('Items per row', 'eightshift-frontend-libs')}
				{...getOption('featuredCategoriesItemsPerLine', attributes, manifest)}
				value={featuredCategoriesItemsPerLine}
				onChange={(value) => setAttributes({ [getAttrKey('featuredCategoriesItemsPerLine', attributes, manifest)]: value })}
				noBottomSpacing
				inlineLabel
			/>
		</PanelBody>
	);
};
