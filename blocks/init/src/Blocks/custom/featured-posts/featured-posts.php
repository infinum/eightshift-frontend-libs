<?php

/**
 * Template for the Featured Posts view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass =  Components::checkAttr('blockClass', $attributes, $manifest);
$blockJsClass =  Components::checkAttr('blockJsClass', $attributes, $manifest);
$query =  Components::checkAttr('query', $attributes, $manifest);
$excludeCurrentPost =  Components::checkAttr('excludeCurrentPost', $attributes, $manifest);
$postType =  Components::checkAttr('postType', $attributes, $manifest);
$posts =  Components::checkAttr('posts', $attributes, $manifest);

global $post;

?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php
		$postType = $query['postType'];
		$posts = $query['posts'];

		$args = [
			'post_type' => $postType,
			'posts_per_page' => 100,
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

				echo \wp_kses_post(
					Components::render(
						'card',
						[
							'imageUrl' => \get_the_post_thumbnail_url($postId, 'medium'),
							'headingContent' => \get_the_title($postId),
							'paragraphContent' => \get_the_excerpt($postId),
							'buttonContent' => __('Show More', 'eightshift-frontend-libs'),
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
