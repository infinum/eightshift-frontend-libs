<?php

/**
 * Template for the Featured Posts view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$featuredPostsQuery = Components::checkAttr('featuredPostsQuery', $attributes, $manifest);
$featuredPostsItemsPerLine = Components::checkAttr('featuredPostsItemsPerLine', $attributes, $manifest);
$featuredPostsShowItems = Components::checkAttr('featuredPostsShowItems', $attributes, $manifest);
$featuredPostsExcludeCurrentPost = Components::checkAttr('featuredPostsExcludeCurrentPost', $attributes, $manifest);
$featuredPostsServerSideRender = Components::checkAttr('featuredPostsServerSideRender', $attributes, $manifest);

global $post;

?>

<div
	class="<?php echo esc_attr($blockClass); ?>"
	data-items-per-line=<?php echo \esc_attr($featuredPostsItemsPerLine); ?>
>
	<?php
		$postType = $featuredPostsQuery['postType'] ?? '';
		$taxonomy = $featuredPostsQuery['taxonomy'] ?? '';
		$terms = $featuredPostsQuery['terms'] ?? [];
		$posts = $featuredPostsQuery['posts'] ?? [];

		$args = [
			'post_type' => $postType,
			'posts_per_page' => $featuredPostsShowItems,
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

		if ($featuredPostsExcludeCurrentPost) {
			$args['post__not_in'] = [$post->ID];
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

				if ($featuredPostsServerSideRender) {
					$cardProps['headingTag'] = 'div';
					$cardProps['paragraphTag'] = 'div';
				}
				?>

				<div class="<?php echo esc_attr("{$blockClass}__item"); ?>">
					<?php
					echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
