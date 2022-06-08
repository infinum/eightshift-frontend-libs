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
		Components::props(
			'card',
			[
				'cardHeadingContent' => get_the_title($item),
				'cardParagraphContent' => get_the_excerpt($item),
				'cardButtonUrl' => get_the_permalink($item),
				'cardButtonContent' => __('View More', 'eightshift-boilerplate'),
				'cardImageUrl' => get_the_post_thumbnail_url($item, 'large'),
				'blockSsr' => $attributes['blockSsr'],
			],
		),
		'',
		true
	);
}
