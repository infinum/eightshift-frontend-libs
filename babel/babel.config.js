module.exports = {
	presets: [
		"@wordpress/default",
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		[
			'@babel/plugin-proposal-object-rest-spread',
			{
				useBuiltIns: true,
			},
		],
		[
			"@babel/plugin-proposal-class-properties",
			{
				"loose": true
			}
		]
	],
	env: {
		test: {
			presets: [
				[
					'@babel/preset-env', {modules: 'commonjs'}
				]
			],
			plugins: [
				'@babel/plugin-transform-modules-commonjs'
			]
		}
	}
};
