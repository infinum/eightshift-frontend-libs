<?php
/**
 * Helpers for components
 *
 * @package Eightshift_Libs\Blocks\Helpers
 */

declare( strict_types=1 );

namespace Eightshift_Libs\Blocks\Helpers;

/**
 * Helpers for components
 *
 * @since 4.0.0
 */
class Components {

  /**
   * Makes sure the output is string. Useful for converting an array of components into a string.
   *
   * @param  array|string $array_or_string Variable we need to convert into a string.
   * @return string
   */
  public static function ensure_string( $array_or_string ) : string {
    $output = '';

    if ( is_array( $array_or_string ) ) {
      $output = implode( '', $array_or_string );
    } elseif ( is_string( $array_or_string ) ) {
      $output = $array_or_string;
    }

    return $output;
  }

  /**
   * Converts an array of classes into a string which can be echoed.
   *
   * @param  array $classes Array of classes.
   * @return string
   */
  public static function classnames( array $classes ) : string {
    return trim( implode( ' ', $classes ) );
  }

  /**
   * Renders a components and (optionally) passes some attributes to it.
   *
   * @param  string $component  Component's name or full path (ending with .php).
   * @param  array  $attributes Array of attributes that's implicitly passed to component.
   * @return string
   *
   * @throws \Exception When we're unable to find the component by $component.
   */
  public static function render( string $component, array $attributes = [] ) {

    // Detect if user passed component name or path.
    if ( strpos( $component, '.php' ) !== false ) {
      $template = locate_template( $component );
    } else {
      $template = locate_template( "src/blocks/components/$component/$component.php" );
    }

    if ( empty( $template ) ) {
      throw new \Exception( "Unable to locate component: \"{$component}\"" );
    }
    ob_start();
    require $template;
    return ob_get_clean();
  }
}
