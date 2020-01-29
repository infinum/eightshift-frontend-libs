/**
 * Project Block Editor config used for Block Editor specific build to provide external sources.
 *
 * @since 2.0.0
 */

/**
 * Convert any string to camelcase.
 *
 * @param string str String to convert
 *
 * @since 2.0.0
 */
function toCamelcase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

/**
 * Return all global objects from window object.
 * Add all Block Editor external libs so you can use it like @wordpress/lib_name.
 *
 * @since 2.0.0
 */
function getExternals() {
  const ext = {};
  const wplib = [
    'components',
    'compose',
    'dispatch',
    'blocks',
    'element',
    'editor',
    'block-editor',
    'date',
    'data',
    'i18n',
    'keycodes',
    'viewport',
    'blob',
    'url',
    'api-fetch',
  ];
  wplib.forEach((name) => {
    ext[`@wp/${name}`] = `wp.${toCamelcase(name)}`;
    ext[`@wordpress/${name}`] = `wp.${toCamelcase(name)}`;
  });

  ext.ga = 'ga';
  ext.gtag = 'gtag';
  ext.jquery = 'jQuery';
  ext.react = 'React';
  ext['react-dom'] = 'ReactDOM';
  ext.backbone = 'Backbone';
  ext.lodash = 'lodash';
  ext.moment = 'moment';
  ext.tinyMCE = 'tinyMCE';
  ext.tinymce = 'tinymce';

  return ext;
}

module.exports = {
  externals: getExternals(),
};
