<?php

/**
 * Template for the Jumbotron Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass                = $attributes['blockClass'] ?? '';
$heading                   = $attributes['heading'] ?? '';
$paragraph                 = $attributes['paragraph'] ?? '';
$media                     = $attributes['media'] ?? [];
$contentHorizontalPosition = $attributes['contentHorizontalPosition'] ?? '';
$contentVerticalPosition   = $attributes['contentVerticalPosition'] ?? '';
$mediaHorizontalPosition   = $attributes['mediaHorizontalPosition'] ?? '';

?>

<div class="<?php echo esc_attr("{$blockClass}"); ?>">

	<?php if (! empty($media)) { ?>
		<div class="<?php echo esc_attr(" {$blockClass}__media {$blockClass}__media--horizontal-{$mediaHorizontalPosition}"); ?>">
			<?php
			echo wp_kses_post(
				Components::render(
					'image',
					[
					'blockClass' => $blockClass,
					'media'      => $attributes['media'] ?? [],
					'size'       => 'full',
					]
				)
			);
			?>
		</div>
	<?php } ?>

	<div class="
		<?php
			echo esc_attr("
				{$blockClass}__content
				{$blockClass}__content--vertical-{$contentVerticalPosition}
				{$blockClass}__content--horizontal-{$contentHorizontalPosition}
			");
			?>">
		<div class="<?php echo esc_attr("{$blockClass}__content-wrap"); ?>">
			<?php if (! empty($heading)) { ?>
				<div class="<?php echo esc_attr("{$blockClass}__heading"); ?>">
					<?php echo wp_kses_post($heading); ?>
				</div>
			<?php } ?>

			<?php if (! empty($paragraph)) { ?>
				<div class="<?php echo esc_attr("{$blockClass}__paragraph"); ?>">
					<?php echo wp_kses_post($paragraph); ?>
				</div>
			<?php } ?>
		</div>
	</div>

</div>
