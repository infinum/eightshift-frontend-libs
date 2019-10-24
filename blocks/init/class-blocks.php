<?php
/**
 * Blocks class used to define configurations for blocks.
 *
 * @since   1.0.0
 * @package Eightshift_Boilerplate\Blocks
 */

declare( strict_types=1 );

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Libs\Blocks\Blocks as Lib_Blocks;

/**
 * Blocks class.
 */
class Blocks extends Lib_Blocks {

  /**
   * Register all the hooks
   *
   * @since 1.0.0
   *
   * @return void
   */
  public function register() {
    parent::register();

    add_filter( 'allowed_block_types', [ $this, 'get_all_blocks_list' ], 20 );
  }
}
