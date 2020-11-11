<?php

/**
 * Template for the Card Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'card-simple';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$simpleLink = $attributes['simpleLink'] ?? '';
$link = $attributes['link'] ?? [];
$linkLabel = $link['label'] ?? '';
$linkUrl = $link['url'] ?? '';

$cardClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
	$link ? "{$componentClass}--use-hover" : '',
]);

$linkClass = Components::classnames([
	'btn',
	'btn__color--white-no-hover',
	'btn__size--big',
	'btn__size-width--default',
	"{$componentClass}__link",
]);

$headingUse = $attributes['heading']['use'] ?? true;
$subHeadingUse = $attributes['subHeading']['use'] ?? true;
$subParagraphUse = $attributes['subParagraph']['use'] ?? true;
$paragraphUse = $attributes['paragraph']['use'] ?? true;
$buttonUse = $attributes['button']['use'] ?? true;
$mediaUse = $attributes['media']['use'] ?? true;

?>

<div class="<?php echo \esc_attr($cardClass); ?>">
	<?php if ($simpleLink) { ?>
	<a href="<?php echo \esc_url($simpleLink); ?>" class="<?php echo \esc_attr("{$componentClass}__simple-link"); ?>">
	<?php } ?>

		<?php if ($headingUse || $subHeadingUse || $subParagraphUse) { ?>
			<div class="<?php echo \esc_attr("{$componentClass}__intro"); ?>">
				<?php
				echo \wp_kses_post(Components::render('heading', [
					'blockClass' => $componentClass,
					'heading' => $attributes['heading'] ?? [],
				]));

				echo \wp_kses_post(Components::render('heading', [
					'blockClass' => $componentClass,
					'selectorClass' => 'subheading',
					'heading' => $attributes['subHeading'] ?? [],
				]));

				echo \wp_kses_post(Components::render('paragraph', [
					'blockClass' => $componentClass,
					'selectorClass' => 'subparagraph',
					'paragraph' => $attributes['subParagraph'] ?? [],
				]));
				?>
			</div>
		<?php } ?>

		<?php if ($mediaUse) { ?>
			<div class="<?php echo \esc_attr("{$componentClass}__media"); ?>">
				<?php
				echo \wp_kses_post(Components::render('image', [
					'blockClass' => $componentClass,
					'media' => $attributes['media'] ?? [],
				]));
				?>
			</div>
		<?php } ?>

		<?php if ($paragraphUse || $buttonUse) { ?>
			<div class="<?php echo \esc_attr("{$componentClass}__outro"); ?>">
				<?php
				// If link is provided remove button and make a fake hover button that does nothing.
				if ($link && $linkLabel && $linkUrl && !$simpleLink) {
					?>
					<div class="<?php echo \esc_attr($linkClass); ?>">
						<?php echo \esc_html($linkLabel) ?>
					</div>
					<a class="<?php echo \esc_attr("{$componentClass}__link-overlay"); ?>" href="<?php echo \esc_url($linkUrl); ?>"></a>
					<?php
				} else {
					echo \wp_kses_post(Components::render('button', [
						'blockClass' => $componentClass,
						'button'  => $attributes['button'] ?? [],
					]));
				}

				echo \wp_kses_post(Components::render('paragraph', [
					'blockClass' => $componentClass,
					'paragraph' => $attributes['paragraph'] ?? [],
				]));
			?>
			</div>
		<?php } ?>

	<?php if ($simpleLink) { ?>
	</a>
	<?php } ?>
</div>
