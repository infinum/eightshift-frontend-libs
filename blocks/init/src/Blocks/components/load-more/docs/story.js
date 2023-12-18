import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { LoadMoreEditor } from '../components/load-more-editor';
import { LoadMoreOptions } from '../components/load-more-options';
import { GetStoryComponentDescription, getStoryDescStyles, reformatCode } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/LoadMore',
};

const attributes = getExample('loadMore', manifest);
const style = getStoryDescStyles();

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<LoadMoreEditor {...props('loadMore', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<LoadMoreOptions
			{...props('loadMore', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);

export const usage = () => {
	return (
		<div className={style.docClean}>
			<h1 className={style.h1}>Dependency</h1>

			<p className={style.p}>Load more component must be implemented in some other component because it can't work by itself.
			It also depends on the PHP part of dynamic data that can be installed with this command:</p>

			<p className={style.code}>
				wp boilerplate create rest-route-load-more
			</p>

			<h3 className={style.h3}>How does it work?</h3>
			<p className={style.p}>This example will use featured content block as an example:</p>

			<ul className={style.ul}>
				<li>You have featured content block that must implement load more component.</li>
				<li>Container that will be used to provide new data got from load more must have `data-load-more-id` data attribute added.</li>
				<li>Load more and the container must have the same ID that will connect them. Load more component uses `loadMoreId` attribute for that.</li>
				<li>You must provide load more component `loadMoreQuery` attribute with encoded json string with all WP_Query args you want to use. In general this is the same query you use to provide the initial data.</li>
				<li>You must provide load more component `loadMoreType` attribute that will determine what map you will use in you dynamic data class to provide view output.</li>
				<li>You must provide load more component `loadMoreInitialItems` attribute that contains the array of IDs for the initial loaded data in the DOM.</li>
				<li>Optional load more component `loadMorePerPageOverride` attribute is used to load different number of items than they are initially set in the DOM.</li>
				<li>After all this items are connected and provided, when you click on the load more button it will make a request using JS on the admin ajax hook in your dynamic data class.</li>
				<li>Dynamic data will provide the query data that you will map to your component view and provide the data back to the dom via ajax.</li>
				<li>In your component you must have partial view component that will map ids from the dynamic data to the actual output.</li>
				<li>Keep in mind that you also must have `esBlocksLocalization` global variable provided with loadMoreRestUrl variable in your `EnqueueTheme` class.</li>
			</ul>

			<h3 className={style.h3}>EnqueueTheme</h3>

			<code className={style.code}>
				<pre>
					{reformatCode(`
						/**
						* Get script localizations
						*
						* @return array<string, mixed>
						*/
						protected function getLocalizations(): array
						{
							$namespace = Config::getProjectRoutesNamespace();
							$version = Config::getProjectRoutesVersion();

							return [
								'esBlocksLocalization' => [
									'loadMoreRestUrl' => \get_rest_url(null, "{$namespace}/{$version}/" . LoadMoreRoute::LOAD_MORE_ROUTE),
								],
							];
						}
					`)}
				</pre>
			</code>

			<h3 className={style.h3}>Featured Content block</h3>

			<code className={style.code}>
				<pre>
					{reformatCode(`
						$loadMoreId = "{$blockName}-{$unique}"; // ID that connects div output.

						<div data-load-more-id="<?php echo esc_attr($loadMoreId); ?>"></div> // Output DOM element.
					
						echo Components::render(
							'load-more',
							Components::props('loadMore', $attributes, [
								'loadMoreInitialItems' => wp_json_encode($mainQuery->posts), // Initial posts array.
								'loadMoreQuery' => wp_json_encode($args), // Original WP_Query.
								'loadMoreId' => $loadMoreId, // ID that connects div output.
								'loadMoreType' => $blockName, // Identifier for block.
							]),
							'',
							true
						);
					`)}
				</pre>
			</code>

			<h3 className={style.h3}>Featured content partial view</h3>

			<code className={style.code}>
				<pre>
					{reformatCode(`
					$items = $attributes['items'] ?? [];

					$output = [];
					
					if (!$items) {
						return $output;
					}
					
					foreach ($items as $item) {
						echo Components::render(
							'card',
							Components::props(
								'card',
								[
									'cardHeadingContent' => get_the_title($item),
									'cardParagraphContent' => get_the_excerpt($item),
									'cardButtonUrl' => get_the_permalink($item),
									'cardButtonContent' => __('View More', 'eightshift-boilerplate'),
									'cardImageUrl' => \get_the_post_thumbnail_url($item, 'large'),
								],
							),
							'',
							true
						);
					}
					`)}
				</pre>
			</code>

			<h3 className={style.h3}>Load more data class</h3>

			<code className={style.code}>
				<pre>
					{reformatCode(`
						/**
						 * Map load more data response with the component to provide to output.
						 *
						 * @param string $type Type of load more used, usually block name.
						 * @param array<int> $response Response of IDs.
						 *
						 * @return string
						 */
						public function getMappedData(string $type, array $response): string
						{
							switch ($type) {
								case 'featured-content':
									return Components::renderPartial(
										'block',
										$type,
										'cards',
										[
											'items' => $response,
										]
									);
								default:
									return '';
							}
						}
					`)}
				</pre>
			</code>
		</div>
	);
};
