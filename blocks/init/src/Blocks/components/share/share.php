<?php

/**
 * Template for the Share Component view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$postUrl = $attributes['postUrl'] ?? \get_the_permalink();
$postTitle = $attributes['postTitle'] ?? \get_the_title();
$postImageUrl = $attributes['postImageUrl'] ?? \get_the_post_thumbnail_url(\get_the_ID(), 'large') ?? '';

$socialNetworks = [
	'twitter' => "https://twitter.com/intent/tweet?url={$postUrl}&text={$postTitle}",
	'linkedin' => "http://www.linkedin.com/shareArticle?mini=true&url={$postUrl}&title={$postTitle}",
	'facebook' => "https://www.facebook.com/sharer/sharer.php?u={$postUrl}",
	'pinterest' => "https://pinterest.com/pin/create/button/?url={$postUrl}&media={$postImageUrl}&description={$postTitle}",
];

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';


$shareClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$shareItemClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'item'),
	Components::selector($blockClass, $blockClass, 'item'),
	Components::selector($componentJsClass, $componentJsClass),
]);

$networkNames = array_column($manifest['socialOptions'], 'label', 'value');
?>
<div class="<?php echo \esc_attr($shareClass); ?>">
	<span><?php echo esc_html__('Share on', 'newboilerplate'); ?></span>

	<?php
	foreach ($socialNetworks as $name => $url) {
		?>
		<a
			href="<?php echo esc_url($url); ?>"
			data-share-url="<?php echo esc_attr($postUrl);?>"
			data-share-title="<?php echo esc_attr($postTitle);?>"
			class="<?php echo esc_attr($shareItemClass); ?>"
		>
			<?php echo esc_html($networkNames[$name]); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
		<?php
	}
	?>
</div>
