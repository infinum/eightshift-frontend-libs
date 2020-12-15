import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { PanelBody, SelectControl, Spinner } from '@wordpress/components';
import manifest from './../manifest.json';
import { AccordionOptions } from '../../../components/accordion/components/accordion-options';

export const FeaturedPostsOptions = ({ attributes, setAttributes }) => {
	const {
		query: queryProps,
		query: {
			postType,
			posts,
		},
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
				per_page: -1, // eslint-disable-line camelcase
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
		<PanelBody title={__('Featured Post', 'solplanet')}>

			{postTypeOptions[1] ?
				<SelectControl
					label={__('Post Type', 'solplanet')}
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

			{(postTypeOptions[1] && posts) ?
				<SelectControl
					label={__('Posts Items', 'solplanet')}
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

			<hr />
			
			<AccordionOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
