/**
 * Project Block Editor config used for Block Editor specific build to provide external sources.
 *
 */

/**
 * Return all global objects from window object.
 * Add all Block Editor external libs so you can use it like @wordpress/lib_name.
 *
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
		'date',
		'data',
		'i18n',
		'keycodes',
		'viewport',
		'blob',
		'url',
	];
	wplib.forEach((name) => {
		ext[`@wordpress/${name}`] = `wp.${name}`;
	});

	ext['@wordpress/block-editor'] = 'wp.blockEditor';
	ext['@wordpress/api-fetch'] = 'wp.apiFetch';

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
