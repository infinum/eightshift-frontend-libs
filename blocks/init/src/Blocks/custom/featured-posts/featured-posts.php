<?php

/**
 * Template for the Featured Posts view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass =  Components::checkAttr('blockClass', $attributes, $manifest);
$query =  Components::checkAttr('query', $attributes, $manifest);
$excludeCurrentPost =  Components::checkAttr('excludeCurrentPost', $attributes, $manifest);
$itemsPerLine =  Components::checkAttr('itemsPerLine', $attributes, $manifest);
$showItems =  Components::checkAttr('showItems', $attributes, $manifest);

global $post;

?>

<div class="<?php echo esc_attr($blockClass); ?>" data-items-per-line=<?php echo \esc_attr($itemsPerLine); ?>>
	<?php
		$postType = $query['postType'];
		$posts = $query['posts'];

		$args = [
			'post_type' => $postType,
			'posts_per_page' => $showItems,
		];

		if ($excludeCurrentPost) {
			$args['post__not_in'] = $posts->ID;
		}

		if ($posts) {
			$args['post__in'] = $posts;
		}

		$theQuery = new \WP_Query($args);

		if ($theQuery->have_posts()) {
			$i = 0;
			while ($theQuery->have_posts()) {
				$theQuery->the_post();

				$postId = get_the_ID();

				$image = \get_the_post_thumbnail_url($postId, 'large');

				echo \wp_kses_post(
					Components::render(
						'card',
						[
							'imageUrl' => $image,
							'imageUse' => $image ?? true,
							'introUse' => false,
							'headingContent' => \get_the_title($postId),
							'paragraphContent' => \get_the_excerpt($postId),
							'buttonContent' => __('Show More', 'EightshiftBoilerplate'),
							'buttonUrl' => \get_the_permalink($postId),
						]
					)
				);
				$i++;
			}
			\wp_reset_postdata();
		}
		?>
</div>
