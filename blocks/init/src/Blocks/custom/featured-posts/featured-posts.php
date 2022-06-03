<?php

/**
 * Template for the Featured Posts view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$unique = Components::getUnique();

$featuredPostsQuery = Components::checkAttr('featuredPostsQuery', $attributes, $manifest);
$featuredPostsItemsPerLine = Components::checkAttr('featuredPostsItemsPerLine', $attributes, $manifest);
$featuredPostsShowItems = Components::checkAttr('featuredPostsShowItems', $attributes, $manifest);
$featuredPostsExcludeCurrentPost = Components::checkAttr('featuredPostsExcludeCurrentPost', $attributes, $manifest);
$featuredPostsServerSideRender = Components::checkAttr('featuredPostsServerSideRender', $attributes, $manifest);

global $post;

?>

<ul
	class="<?php echo esc_attr($blockClass); ?>"
	data-items-per-line=<?php echo esc_attr($featuredPostsItemsPerLine); ?>
	data-id="<?php echo esc_attr($unique); ?>"
>
	<?php
		echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		$postType = $featuredPostsQuery['postType'] ?? '';
		$selectedTaxonomy = $featuredPostsQuery['taxonomy'] ?? '';
		$termList = $featuredPostsQuery['terms'] ?? [];
		$postList = $featuredPostsQuery['posts'] ?? [];

		$args = [
			'post_type' => $postType,
			'posts_per_page' => $featuredPostsShowItems,
		];

		if ($selectedTaxonomy) {
			$args['tax_query'][0] = [
				'taxonomy' => $selectedTaxonomy,
				'field' => 'id',
			];

			if ($termList) {
				$args['tax_query'][0]['terms'] = array_map(
					function ($item) {
						return $item['value'];
					},
					(array)$termList
				);
			} else {
				$args['tax_query'][0]['operator'] = 'NOT IN'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			}
		};

		if ($featuredPostsExcludeCurrentPost) {
			$args['post__not_in'] = [$post->ID];
		}

		if ($postList) {
			$args['post__in'] = array_map(
				function ($item) {
					return $item['value'];
				},
				(array)$postList
			);
			$args['orderby'] = 'post__in';
		}

		$mainQuery = new WP_Query($args);

		if ($mainQuery->have_posts()) {
			while ($mainQuery->have_posts()) { // @phpstan-ignore-line
				$mainQuery->the_post();

				$postId = get_the_ID();
				$image = get_the_post_thumbnail_url($postId, 'large');
				$excerpt = get_the_excerpt($postId);

				$cardProps = [
					'imageUrl' => $image,
					'imageUse' => $image !== false,
					'introUse' => false,
					'headingContent' => get_the_title($postId), // @phpstan-ignore-line
					'paragraphContent' => $excerpt,
					'paragraphUse' => !empty($excerpt),
					'buttonContent' => __('Read', 'eightshift-frontend-libs'),
					'buttonUrl' => get_the_permalink($postId), // @phpstan-ignore-line
					'buttonColor' => 'primary',
					'headingSize' => 'big',
				];

				if ($featuredPostsServerSideRender) {
					$cardProps['headingTag'] = 'div';
					$cardProps['paragraphTag'] = 'div';
				}
				?>

				<li class="<?php echo esc_attr("{$blockClass}__item"); ?>">
					<?php echo Components::render('card', $cardProps); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</li>
				<?php
			}
			wp_reset_postdata(); // @phpstan-ignore-line
		}
		?>
</ul>
