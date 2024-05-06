module.exports = (api) => {
	api.cache(true);

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
