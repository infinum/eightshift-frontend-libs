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
$itemsPerLine = Components::checkAttr('itemsPerLine', $attributes, $manifest);
$showItems = Components::checkAttr('showItems', $attributes, $manifest);
$serverSideRender = Components::checkAttr('serverSideRender', $attributes, $manifest);

global $post;

?>

<div class="<?php echo esc_attr($blockClass); ?>" data-items-per-line=<?php echo \esc_attr($itemsPerLine); ?>>
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
			if ($terms) {
				$args['tax_query'][0] = [
					'taxonomy' => $taxonomy,
					'field' => 'id',
					'terms' => array_map(
						function ($item) {
							return $item['value'];
						},
						$terms
					),
				];
			} else {
				$args['tax_query'][0] = [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
					'taxonomy' => $taxonomy,
					'field' => 'id',
					'operator' => 'NOT IN'
				];
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
