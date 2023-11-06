<?php

/**
 * Social networks component.
 *
 * @package EightshiftBoilerplate
 */

 use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$socialNetworksUse = Components::checkAttr('socialNetworksUse', $attributes, $manifest);

if (!$socialNetworksUse) {
	return;
}

$socialNetworksNetworks = Components::checkAttr('socialNetworksNetworks', $attributes, $manifest);
$socialNetworksShareMode = Components::checkAttr('socialNetworksShareMode', $attributes, $manifest);

$networksToShow = [];

foreach ($socialNetworksNetworks as $network) {
	if ($network['enabled'] === false) {
		continue;
	}

	if (!$socialNetworksShareMode && !isset($manifest['networks'][$network['id']]['url'])) {
		continue;
	}

	if ($socialNetworksShareMode && !isset($manifest['networks'][$network['id']]['shareUrl'])) {
		continue;
	}

	$networksToShow[] = $network['id'];
}

if (empty($networksToShow)) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$componentJsClass = $manifest['componentJsClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$socialLinksClass = Components::classnames([
	$componentClass,
	$socialNetworksShareMode ? $componentJsClass : '',
	Components::selector($blockClass, $blockClass, $selectorClass),
	$additionalClass,
]);

$itemClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'link'),
	$socialNetworksShareMode ? "{$componentJsClass}-link" : '',
]);

?>
<div class="<?php echo esc_html($socialLinksClass); ?>">
	<?php
	if ($socialNetworksShareMode) {
		foreach ($networksToShow as $networkName) {
			$shareUrl = $manifest['networks'][$networkName]['shareUrl'] ?? '';
			$shareUrl = str_replace('POST_TITLE', get_the_title(), $shareUrl);
			$shareUrl = str_replace('POST_URL', get_the_permalink(), $shareUrl);
			$shareUrl = str_replace('POST_FEATURED_IMAGE', get_the_post_thumbnail_url(get_the_ID(), 'large'), $shareUrl);
			?>
			<button
				class="<?php echo esc_html($itemClass); ?>"
				data-network="<?php echo esc_attr($networkName); ?>"
				data-share-url="<?php echo esc_url($shareUrl); ?>" <?php ?>
				data-page-title="<?php echo esc_attr(get_the_title()); ?>"
				data-page-url="<?php echo esc_url(get_the_permalink()); ?>" <?php ?>
			>
				<?php
				// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
				echo $manifest['networks'][$networkName]['icon'] ?? '';
				?>
			</button>
		<?php }
	} else {
		foreach ($networksToShow as $networkName) {
			?>
			<a
				class="<?php echo esc_html($itemClass); ?>"
				href="<?php echo esc_url($manifest['networks'][$networkName]['url'] ?? ''); ?>" <?php ?>
				title="<?php echo esc_attr($manifest['networks'][$networkName]['title'] ?? ''); ?>" <?php ?>
				target="_blank"
				rel="noreferrer noopener"
			>
				<?php
				// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
				echo $manifest['networks'][$networkName]['icon'] ?? '';
				?>
			</a>
			<?php
		}
	}
	?>
</div>
