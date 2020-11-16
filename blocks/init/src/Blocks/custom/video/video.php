<?php

/**
 * Template for the Video Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

echo \wp_kses_post(Components::render('video', $attributes));
