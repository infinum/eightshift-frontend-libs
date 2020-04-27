/**
 * Manually populate categories for blocks. This is generated in the PHP part of the real project.
 */
export const storybookDefaultMocks = () => {
  wp.data.dispatch( 'core/blocks').setCategories([
    {
      slug: 'eightshift',
      title: 'Eightshift',
      icon: 'admin-settings',
    },
    {
      slug: 'common',
      title: 'Common',
    },
  ]
  );
}
