module.exports = api => {
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage',
					corejs: '3',
					modules: false,
				},
			],
			['@babel/preset-react'],
		],
	};
};
