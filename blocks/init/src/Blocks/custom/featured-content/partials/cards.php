<?php

/**
 * Template for the Featured Content view - Card content map from ID.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$items = $attributes['items'] ?? [];

$output = [];

if (!$items) {
	return $output;
}

foreach ($items as $item) {
	echo Components::render(
		'card',
		Components::props('card', [
				'cardIntroUse' => true,
				'cardIntroSize' => 'h6-medium',
				'cardIntroColor' => 'primary500',
				'cardIntroContent' => get_the_date('M d', $item),
				'cardHeadingSize' => 'h2-bold',
				'cardHeadingContent' => get_the_title($item),
				'cardParagraphContent' => get_the_excerpt($item),
				'cardButtonUrl' => get_the_permalink($item),
				'cardButtonContent' => __('Read', 'eightshift-frontend-libs'),
				'cardButtonVariant' => 'buttonOutline',
				'cardImageUrl' => get_the_post_thumbnail_url($item, 'large'),
				'blockSsr' => $attributes['blockSsr'],
		]),
		'',
		true
	);
}
