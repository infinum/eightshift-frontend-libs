module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'entry',
				corejs: '3',
				modules: false,
			}
		],
		[
			"@babel/preset-react"
		],
	],
	plugins: [
		"@babel/plugin-syntax-dynamic-import"
	],
};
