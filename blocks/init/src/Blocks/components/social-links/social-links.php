<?php

/**
 * Social Links
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$socialLinksUse = Components::checkAttr('socialLinksUse', $attributes, $manifest);
if (!$socialLinksUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$socialLinks = Components::checkAttr('socialLinks', $attributes, $manifest);

$socialLinksClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);
?>
<ul class="<?php echo \esc_html($socialLinksClass); ?>">
	<?php foreach ($socialLinks as $socialLink) { ?>
		<?php
		$href = $socialLink['href'] ?? '';
		$icon = $socialLink['icon'] ?? '';
		$title = $socialLink['title'] ?? '';

		if (empty($href) || empty($icon) || ! isset($icons[$icon])) {
			continue;
		}
		?>
		<li class="<?php echo \esc_html("{$componentClass}__item"); ?>">
			<a class="<?php echo \esc_html("{$componentClass}__link"); ?>" href="<?php echo esc_url($href); ?>" title="<?php echo esc_attr($title); ?>" target="_blank" rel="nofollow noopener">
				<?php echo \wp_kses_post($manifest['icons'][$icon]); ?>
			</a>
		</li>
	<?php } ?>
</ul>
