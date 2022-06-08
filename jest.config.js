module.exports = {
	verbose: true,
	transform: {
		"\\.js$": [
			"babel-jest",
			{
				configFile: "./babel/babel.config.js"
			}
		]
	},
	setupFiles: [
		"./tests/setup-global.js"
	],
}
