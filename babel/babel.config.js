module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				useBuiltIns: 'entry',
				corejs: '2',
				targets: {
					browsers: [
						'last 2 versions',
						'not ie < 11',
						'android >= 4.2',
					],
				},
			},
		],
	],
	plugins: [
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true,
			},
		],
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
		'@babel/plugin-syntax-dynamic-import',
		[
			'@babel/plugin-proposal-object-rest-spread',
			{
				useBuiltIns: true,
			},
		],
		// [
		// 	'@wordpress/babel-plugin-import-jsx-pragma', {
		// 		scopeVariable: 'createElement',
		// 		source: '@wordpress/element',
		// 		isDefault: false,
		// 	},
		// ],
		[
			'@babel/transform-react-jsx', {
				pragma: 'React.createElement',
			},
		],
		[
			'@babel/plugin-transform-runtime',
			{
				helpers: true,
				regenerator: false,
			},
		],
	],
};
