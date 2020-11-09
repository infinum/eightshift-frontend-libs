<?php

/**
 * Template for the Video Block view.
 *
 * @package EightshiftBoilerplate
 */

use SolplanetVendor\EightshiftLibs\Helpers\Components;

echo wp_kses_post(Components::render('video', $attributes));
