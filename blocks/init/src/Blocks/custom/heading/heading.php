<?php

/**
 * Template for the Heading Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

echo Components::render('heading', $attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
