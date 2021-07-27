import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { PanelBody, RangeControl } from '@wordpress/components';
import { CustomSelect, icons, checkAttr, getAttrKey, IconLabel, BlockIcon } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const FeaturedCategoriesOptions = ({ attributes, setAttributes }) => {
	const {
		options: manifestOptions
	} = manifest;

	const {
		featuredCategoriesQuery,
		featuredCategoriesQuery: {
			taxonomy,
			terms,
		},
	} = attributes;

	const featuredCategoriesItemsPerLine = checkAttr('featuredCategoriesItemsPerLine', attributes, manifest);

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
		<PanelBody title={__('Featured categories', 'newboilerplate')}>

			{taxonomyOptions[0] &&
				<CustomSelect
					label={<IconLabel icon={<BlockIcon iconName='es-lists' />} label={__('Taxonomy type', 'newboilerplate')} />}
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
				/>
			}

			{taxonomyOptions[0] && taxonomy &&
				<CustomSelect
					label={<IconLabel icon={icons.visible} label={sprintf(__('Show only these %s', 'newboilerplate'), taxonomy.toLowerCase().replace('category', 'categories'))} />}
					help={__('If blank, all are shown', 'newboilerplate')}
					options={termsOptions}
					value={terms}
					multiple={true}
					onChange={(value) => {
						setAttributes({
							featuredCategoriesQuery: {
								...featuredCategoriesQuery,
								terms: value[0] ? value : [],
							},
						});
					}}
				/>
			}

			<hr />

			<RangeControl
				label={<IconLabel icon={icons.itemsPerRow} label={__('Items per row', 'newboilerplate')} />}
				value={featuredCategoriesItemsPerLine}
				onChange={(value) => setAttributes({ [getAttrKey('featuredCategoriesItemsPerLine', attributes, manifest)]: value })}
				min={manifestOptions.featuredCategoriesItemsPerLine.min}
				max={manifestOptions.featuredCategoriesItemsPerLine.max}
				step={manifestOptions.featuredCategoriesItemsPerLine.step}
			/>
		</PanelBody>
	);
};
