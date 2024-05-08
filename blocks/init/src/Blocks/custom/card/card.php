<?php

/**
 * Template for the Card Block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

echo Helpers::render('card', Helpers::props('card', $attributes));
