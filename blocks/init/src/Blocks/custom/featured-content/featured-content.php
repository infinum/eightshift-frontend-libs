<?php

/**
 * Template for the Featured Content view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

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

global $post;

$args = [
	'post_type' => $featuredContentPostType,
	'posts_per_page' => $featuredContentLayoutTotalItems,
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

?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique);

	$output = [];

	while ($mainQuery->have_posts()) {
		$mainQuery->the_post();

		$postId = get_the_ID();

		$output[] = Components::render(
			'card-article',
			Components::props(
				'cardArticle',
				[
					'cardArticleHeadingTypographyContent' => get_the_title($postId),
					'cardArticleMediaUse' => true,
					'blockSsr' => $featuredContentServerSideRender,
				],
			),
			'',
			true
		);
	}
	
	wp_reset_postdata();

	echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'layout',
		Components::props('layout', $attributes, [
			'blockClass' => $blockClass,
			'layoutItems' => $output,
			'blockSsr' => $featuredContentServerSideRender,
		]),
		'',
		true
	);
	?>
</div>
