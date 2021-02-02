import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { PanelBody, SelectControl, Spinner, RangeControl, ToggleControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { attributes: reset, options } = manifest;

export const FeaturedPostsOptions = ({ attributes, setAttributes }) => {
	const {
		query: queryProps,
		query: {
			postType,
			posts,
		},
		showItems,
		itemsPerLine,
		excludeCurrentPost,
	} = attributes;

	// Fetch all post types.
	// Filter allowed post types defined in the block manifest.
	const postTypeOptions = useSelect((select) => {
		const { getPostTypes } = select('core');

		const items = getPostTypes() ?? [];

		const data = items.filter((element) => manifest.allowed.postTypes.find((item) => element.slug === item)) ?? [];

		return data.map((item) => {
			return {
				label: item.labels.name,
				value: item.slug,
				taxonomies: item.taxonomies,
			};
		}) ?? [];
	});

	// Fetch all posts based on the selected postType.
	const postsOptions = useSelect((select) => {
		const { getEntityRecords } = select('core');

		const termsList = getEntityRecords(
			'postType',
			postType,
			{
				per_page: -1,
			}
		) ?? [];

		return [
			{
				label: 'None',
				value: '',
			},
			...termsList.map((item) => {
				return {
					label: item.title.rendered,
					value: item.id,
				};
			}),
		];
	});

	return (
		<PanelBody title={__('Featured Post', 'eightshift-frontend-libs')}>

			{postTypeOptions[0] ?
				<SelectControl
					label={__('Post Type', 'eightshift-frontend-libs')}
					value={postType}
					options={postTypeOptions}
					onChange={(value) => {
						setAttributes({
							query: {
								postType: value,
								posts: [],
							},
						});
					}}
				/> :
				<Spinner />
			}

			{(postTypeOptions[0] && posts) ?
				<SelectControl
					label={__('Posts Items', 'eightshift-frontend-libs')}
					value={posts}
					multiple
					options={postsOptions}
					onChange={(value) => {
						setAttributes({
							query: {
								...queryProps,
								posts: value[0] ? value : [],
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

			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.itemsPerRow} />
						{__('Show items', 'eightshift-frontend-libs')}
					</Fragment>
				}
				help={__('Option to change the number of items to show in total.', 'eightshift-frontend-libs')}
				allowReset={true}
				value={showItems}
				onChange={(value) => setAttributes({ showItems: value })}
				step={1}
			/>

			<ToggleControl
				label={__('Exclude current post', 'eightshift-frontend-libs')}
				checked={excludeCurrentPost}
				help={__('This options can only be used in post single pages.', 'eightshift-frontend-libs')}
				onChange={(value) => setAttributes({ excludeCurrentPost: value })}
			/>

		</PanelBody>
	);
};
