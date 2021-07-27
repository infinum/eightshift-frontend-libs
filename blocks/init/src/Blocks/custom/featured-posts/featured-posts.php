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

<div
	class="<?php echo esc_attr($blockClass); ?>"
	data-items-per-line=<?php echo \esc_attr($featuredPostsItemsPerLine); ?>
	data-id="<?php echo \esc_attr($unique); ?>"
>
	<?php
		echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		$postType = $featuredPostsQuery['postType'] ?? ''; // @phpstan-ignore-line
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
						return $item['value']; // @phpstan-ignore-line
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
					return $item['value']; // @phpstan-ignore-line
				},
				(array)$postList
			);
			$args['orderby'] = 'post__in';
		}

		$mainQuery = new \WP_Query($args);

		if ($mainQuery->have_posts()) {
			while ($mainQuery->have_posts()) {
				$mainQuery->the_post();

				$postId = \get_the_ID();
				$image = \get_the_post_thumbnail_url($postId, 'large');
				$excerpt = \get_the_excerpt($postId);

				$cardProps = [
					'imageUrl' => $image,
					'imageUse' => $image ?? true,
					'introUse' => false,
					'headingContent' => \get_the_title($postId),
					'paragraphContent' => $excerpt,
					'paragraphUse' => !empty($excerpt),
					'buttonContent' => __('Read', 'eightshift-frontend-libs'),
					'buttonUrl' => \get_the_permalink($postId),
					'buttonColor' => 'primary',
					'headingSize' => 'big',
				];

				if ($featuredPostsServerSideRender) {
					$cardProps['headingTag'] = 'div';
					$cardProps['paragraphTag'] = 'div';
				}
				?>

				<div class="<?php echo esc_attr("{$blockClass}__item"); ?>">
					<?php echo Components::render('card', $cardProps); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
				<?php
			}
			\wp_reset_postdata();
		}
		?>
</div>
