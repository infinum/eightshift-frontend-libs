<?php

/**
 * Template for the Featured Content view - Card content map from ID.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$items = $attributes['items'] ?? [];

$output = [];

if (!$items) {
	return $output;
}

foreach ($items as $item) {
	echo Helpers::render(
		'card',
		Helpers::props('card', [
				'cardIntroUse' => true,
				'cardIntroSize' => 'h6:medium',
				'cardIntroColor' => 'primary500',
				'cardIntroContent' => get_the_date('M d', $item),
				'cardHeadingSize' => 'h3:bold',
				'cardHeadingContent' => get_the_title($item),
				'cardParagraphContent' => get_the_excerpt($item),
				'cardButtonUrl' => get_the_permalink($item),
				'cardButtonContent' => __('Read', '%g_textdomain%'),
				'cardButtonVariant' => 'buttonOutline',
				'cardButtonIconUse' => false,
				'cardImageUrl' => get_the_post_thumbnail_url($item, 'large'),
		]),
		'components',
		true
	);
}
