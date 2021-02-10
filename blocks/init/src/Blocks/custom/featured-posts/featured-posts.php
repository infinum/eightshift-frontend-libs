<?php

/**
 * Template for the Featured Posts view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = Components::checkAttr('blockClass', $attributes, $manifest);
$query = Components::checkAttr('query', $attributes, $manifest);
$excludeCurrentPost = Components::checkAttr('excludeCurrentPost', $attributes, $manifest);
$showItems = Components::checkAttr('showItems', $attributes, $manifest);
$serverSideRender = Components::checkAttr('serverSideRender', $attributes, $manifest);
$itemsPerLine = [
	'large' => Components::checkAttr('itemsPerLineLarge', $attributes, $manifest),
	'desktop' => Components::checkAttr('itemsPerLineDesktop', $attributes, $manifest),
	'tablet' => Components::checkAttr('itemsPerLineTablet', $attributes, $manifest),
	'mobile' => Components::checkAttr('itemsPerLineMobile', $attributes, $manifest),
];

global $post;

$featuredPostClass = Components::classnames([
	$blockClass,
	Components::responsiveSelectors($itemsPerLine, 'items-per-line', $blockClass),
]);

?>

<div class="<?php echo esc_attr($featuredPostClass); ?>">
	<?php
		$postType = $query['postType'];
		$taxonomy = $query['taxonomy'];
		$terms = $query['terms'];
		$posts = $query['posts'];

		$args = [
			'post_type' => $postType,
			'posts_per_page' => $showItems,
		];

		if ($taxonomy) {
			$args['tax_query'][0] = [
				'taxonomy' => $taxonomy,
				'field' => 'id',
			];
							
			if ($terms) {
				$args['tax_query'][0]['terms'] = array_map(
					function ($item) {
						return $item['value'];
					},
					$terms
				);
			} else {
				$args['tax_query'][0]['operator'] = 'NOT IN'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			}
		};

		if ($excludeCurrentPost) {
			$args['post__not_in'] = [ $post->ID ];
		}

		if ($posts) {
			$args['post__in'] = array_map(
				function ($item) {
					return $item['value'];
				},
				$posts
			);
			$args['orderby'] = 'post__in';
		}

		$theQuery = new \WP_Query($args);

		if ($theQuery->have_posts()) {
			while ($theQuery->have_posts()) {
				$theQuery->the_post();

				$postId = get_the_ID();

				$image = \get_the_post_thumbnail_url($postId, 'large');

				$cardProps = [
					'imageUrl' => $image,
					'imageUse' => $image ?? true,
					'introUse' => false,
					'headingContent' => \get_the_title($postId),
					'paragraphContent' => \get_the_excerpt($postId),
					'buttonContent' => __('Show More', 'eightshift-frontend-libs'),
					'buttonUrl' => \get_the_permalink($postId),
				];

				if ($serverSideRender) {
					$cardProps['headingTag'] = 'div';
					$cardProps['paragraphTag'] = 'div';
				}
				?>

				<div class="<?php echo esc_attr("{$blockClass}__item"); ?>">
					<?php
					echo Components::render( // phpcs:ignore
						'card',
						$cardProps
					);
					?>
				</div>
				<?php
			}
			\wp_reset_postdata();
		}
		?>
</div>
