<?php
/**
 * Template for the Featured Posts view.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

$block_class = $attributes['blockClass'] ?? '';
$posts  = $attributes['posts'] ?? '';

?>

<div class="<?php echo esc_attr( "{$block_class}" ); ?>">
  <?php
  foreach( $posts as $post ) {
    ?>
    <h3><?php echo esc_html( $post->title->rendered ); ?></h3>
    <div><?php echo esc_html( $post->excerpt->rendered ); ?></div>
    <?php
  }
  ?>
</div>
