const _ = require('lodash');

/**
 * Project Block Editor config used for Block Editor specific build to provide external sources.
 *
 * @since 2.0.0
 */

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
    ext[`@wp/${name}`] = `wp.${_.camelCase(name)}`;
    ext[`@wordpress/${name}`] = `wp.${_.camelCase(name)}`;
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
