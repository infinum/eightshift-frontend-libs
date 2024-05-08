<?php

/**
 * Template for the Featured Content view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockName = $attributes['blockName'] ?? '';

$unique = Helpers::getUnique();

$featuredContentPostType = Helpers::checkAttr('featuredContentPostType', $attributes, $manifest);
$featuredContentTaxonomy = Helpers::checkAttr('featuredContentTaxonomy', $attributes, $manifest);
$featuredContentTerms = Helpers::checkAttr('featuredContentTerms', $attributes, $manifest);
$featuredContentPosts = Helpers::checkAttr('featuredContentPosts', $attributes, $manifest);
$featuredContentExcludeCurrentPost = Helpers::checkAttr('featuredContentExcludeCurrentPost', $attributes, $manifest);
$featuredContentUseCurrentTerm = Helpers::checkAttr('featuredContentUseCurrentTerm', $attributes, $manifest);
$featuredContentRandomOrder = Helpers::checkAttr('featuredContentRandomOrder', $attributes, $manifest);
$featuredContentLayoutTotalItems = Helpers::checkAttr('featuredContentLayoutTotalItems', $attributes, $manifest);
$featuredContentLoadMoreUse = Helpers::checkAttr('featuredContentLoadMoreUse', $attributes, $manifest);

if (!empty($featuredContentPostType)) {
	$featuredContentPostType = $featuredContentPostType['value'];
}

if (!empty($featuredContentTaxonomy)) {
	$featuredContentTaxonomy = $featuredContentTaxonomy['value'];
}

global $post;

$args = [
	'post_type' => $featuredContentPostType,
	'posts_per_page' => $featuredContentLayoutTotalItems,
	'fields' => 'ids',
	'order' => 'ASC',
];

if ($featuredContentTaxonomy) {
	$args['tax_query'][0] = [
		'taxonomy' => $featuredContentTaxonomy,
		'field' => 'id',
	];

	if ($featuredContentTerms) {
		$args['tax_query'][0]['terms'] = array_map(
			function ($item) {
				return $item['value'];
			},
			(array)$featuredContentTerms
		);
	} elseif ($featuredContentUseCurrentTerm && $post instanceof WP_Post) {
		$currentTerms = get_the_terms($post->ID, strval($featuredContentTaxonomy)); // @phpstan-ignore-line

		if ($currentTerms) {
			$args['tax_query'][0]['terms'] = wp_list_pluck($currentTerms, 'term_id'); // @phpstan-ignore-line
		}
	} else {
		$args['tax_query'][0]['operator'] = 'NOT IN'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
	}
}

$excludeList = [];

if ($featuredContentExcludeCurrentPost && $post instanceof WP_Post) {
	$excludeList[] = $post->ID;
}

if ($excludeList) {
	$args['post__not_in'] = $excludeList;
}

if ($featuredContentPosts) {
	$args['post__in'] = array_map(
		function ($item) {
			return $item['value'];
		},
		(array)$featuredContentPosts
	);
	$args['orderby'] = 'post__in';
}

if ($featuredContentRandomOrder) {
	$args['orderby'] = 'rand';
}

$mainQuery = new WP_Query($args);

if (!$mainQuery->have_posts()) {
	return;
}


wp_reset_postdata();

$loadMoreId = "{$blockName}-{$unique}";

?>

<div
	class="<?php echo esc_attr($blockClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
	aria-live="polite"
>
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique);

	$cards = Helpers::render(
		'cards',
		[
			'items' => $mainQuery->posts,
		],
		'blocks',
		false,
		"{$blockName}/partials"
	);

	echo Helpers::render(
		'layout',
		Helpers::props('layout', $attributes, [
			'blockClass' => $blockClass,
			'layoutItems' => $cards,
			'layoutLoadMoreId' => $loadMoreId,
		]),
		'',
		true
	);

	echo Helpers::render(
		'load-more',
		Helpers::props('loadMore', $attributes, [
			'loadMoreInitiaItems' => wp_json_encode($mainQuery->posts),
			'loadMoreQuery' => wp_json_encode($args),
			'loadMoreId' => $loadMoreId,
			'loadMoreType' => $blockName,
		]),
		'components',
		true
	);
	?>
</div>
