import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { PanelBody, RangeControl, Icon, SelectControl, Spinner } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { attributes: reset, options } = manifest;

export const FeaturedCategoriesOptions = ({ attributes, setAttributes }) => {
	const {
		query: queryProps,
		query: {
			taxonomy,
			terms,
		},
		itemsPerLine,
	} = attributes;

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
			{
				label: __('All', 'eightshift-frontend-libs'),
				value: '',
			},
			...termsList.map((item) => {
				return {
					label: item.name,
					value: item.id,
				};
			}),
		];
	});

	return (
		<PanelBody title={__('Featured Categories', 'eightshift-frontend-libs')}>

			{taxonomyOptions[0] ?
				<SelectControl
					label={__('Categories', 'eightshift-frontend-libs')}
					value={taxonomy}
					options={taxonomyOptions}
					onChange={(value) => {
						setAttributes({
							query: {
								...queryProps,
								taxonomy: value,
								terms: [],
							},
						});
					}}
				/> :
				<Spinner />
			}

			{(taxonomyOptions[0] && taxonomy) ?
				<SelectControl
					label={__('Category Items', 'eightshift-frontend-libs')}
					value={terms}
					multiple
					options={termsOptions}
					onChange={(value) => {
						setAttributes({
							query: {
								...queryProps,
								terms: value[0] ? value : [],
							},
						});
					}}
				/> :
				<Spinner />
			}

			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.totalItems} />
						{__('Items per one row', 'eightshift-frontend-libs')}
					</Fragment>
				}
				help={__('Option to change the number of items showed in one row.', 'eightshift-frontend-libs')}
				allowReset={true}
				value={itemsPerLine}
				onChange={(value) => setAttributes({ itemsPerLine: value })}
				min={options.itemsPerLine.min}
				max={options.itemsPerLine.max}
				step={options.itemsPerLine.step}
				resetFallbackValue={reset.itemsPerLine.default}
			/>

		</PanelBody>
	);
};
