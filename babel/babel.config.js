module.exports = {
	presets: [
		"@wordpress/default",
		"env"
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
};
