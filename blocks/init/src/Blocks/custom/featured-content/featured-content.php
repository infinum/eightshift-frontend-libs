<?php

/**
 * Template for the Featured Content view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockName = $attributes['blockName'] ?? '';

$unique = Components::getUnique();

$featuredContentPostType = Components::checkAttr('featuredContentPostType', $attributes, $manifest);
$featuredContentTaxonomy = Components::checkAttr('featuredContentTaxonomy', $attributes, $manifest);
$featuredContentTerms = Components::checkAttr('featuredContentTerms', $attributes, $manifest);
$featuredContentPosts = Components::checkAttr('featuredContentPosts', $attributes, $manifest);
$featuredContentExcludeCurrentPost = Components::checkAttr('featuredContentExcludeCurrentPost', $attributes, $manifest);
$featuredContentUseCurrentTerm = Components::checkAttr('featuredContentUseCurrentTerm', $attributes, $manifest);
$featuredContentServerSideRender = Components::checkAttr('featuredContentServerSideRender', $attributes, $manifest);
$featuredContentRandomOrder = Components::checkAttr('featuredContentRandomOrder', $attributes, $manifest);
$featuredContentLayoutTotalItems = Components::checkAttr('featuredContentLayoutTotalItems', $attributes, $manifest);
$featuredContentLoadMoreUse = Components::checkAttr('featuredContentLoadMoreUse', $attributes, $manifest);

global $post;

$args = [
	'post_type' => $featuredContentPostType,
	'posts_per_page' => $featuredContentLayoutTotalItems,
	'fields' => 'ids',
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
	} elseif ($featuredContentUseCurrentTerm && $post instanceof WP_Post && !$featuredContentServerSideRender) {
		$currentTerms = get_the_terms($post->ID, $featuredContentTaxonomy);

		if ($currentTerms) {
			$args['tax_query'][0]['terms'] = [$currentTerms[0]->term_id]; // @phpstan-ignore-line
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

$loadMoreId = "{$blockName}-{$unique}";

$args['blockName'] = $blockName;

?>

<div
	class="<?php echo esc_attr($blockClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
>
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique);

	$cards = Components::render(
		'featured-content-card.php',
		[
			'ids' => $mainQuery->posts,
			'ssr' => $featuredContentServerSideRender,
		],
		__DIR__ . '/content'
	);

	echo Components::render(
		'layout',
		Components::props('layout', $attributes, [
			'blockClass' => $blockClass,
			'layoutItems' => $cards,
			'layoutLoadMoreId' => $loadMoreId,
			'blockSsr' => $featuredContentServerSideRender,
		]),
		'',
		true
	);

	echo Components::render(
		'load-more',
		Components::props('load-more', [
			'loadMoreQuery' => http_build_query($args),
			'loadMoreId' => $loadMoreId,
			'loadMoreBlockName' => $blockName,
		])
	);
	?>
</div>
