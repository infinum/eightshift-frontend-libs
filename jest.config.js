module.exports = {
	verbose: true,
	transform: {
		'\\.js$': [
			'babel-jest',
			{
				configFile: './babel/babel.config.js',
			},
		],
	},
	setupFiles: ['./tests/setup-global.js'],
	testEnvironment: 'jsdom',
	transformIgnorePatterns: [
		'node_modules/(?!(' +
			'|chalk' +
			'|inquirer' +
			'|ansi-escapes' +
			'|chalk' +
			'|cli-cursor' +
			'|cli-width' +
			'|external-editor' +
			'|figures' +
			'|lodash' +
			'|mute-stream' +
			'|ora' +
			'|run-async' +
			'|rxjs' +
			'|string-width' +
			'|strip-ansi' +
			'|through' +
			'|wrap-ans' +
			'|escape-string-regexp' +
			'|is-unicode-supported' +
			'|restore-cursor' +
			'|wrap-ansi' +
			'|ansi-regex' +
			'|ansi-styles' +
			'|log-symbols' +
			'|is-interactive' +
			')/)',
	],
	moduleNameMapper: {
		chalk: 'chalk/source/index.js',
		'#ansi-styles': 'chalk/source/vendor/ansi-styles/index.js',
		'#supports-color': 'chalk/source/vendor/supports-color/index.js',
	},
};
