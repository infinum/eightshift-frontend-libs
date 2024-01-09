module.exports = {
	plugins: [
		'@stylistic/stylelint-plugin'
	],
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss'
	],
	rules: {
		// Stylistic rules.
		'@stylistic/indentation': 'tab',

		'@stylistic/max-empty-lines': 2,
		'@stylistic/max-line-length': 250,

		'@stylistic/color-hex-case': 'upper',

		'@stylistic/no-eol-whitespace': true,

		'@stylistic/media-feature-colon-space-after': 'always',
		'@stylistic/media-feature-colon-space-before': 'never',
		'@stylistic/media-feature-range-operator-space-after': 'always',
		'@stylistic/media-feature-range-operator-space-before': 'always',

		'@stylistic/selector-list-comma-newline-after': 'always',
		'@stylistic/selector-list-comma-newline-before': 'never-multi-line',

		'@stylistic/block-opening-brace-newline-after': 'always',
		'@stylistic/block-opening-brace-newline-before': 'always-single-line',
		'@stylistic/block-opening-brace-space-before': 'always',

		'@stylistic/declaration-block-semicolon-newline-after': 'always',
		'@stylistic/declaration-block-semicolon-newline-before': 'never-multi-line',
		'@stylistic/declaration-block-semicolon-space-after': 'always-single-line',
		'@stylistic/declaration-block-semicolon-space-before': 'never',

		'@stylistic/value-list-comma-newline-before': 'never-multi-line',
		'@stylistic/value-list-comma-newline-after': null,
		'@stylistic/value-list-comma-space-before': 'never',
		'@stylistic/value-list-comma-space-after': 'always-single-line',

		'@stylistic/value-list-max-empty-lines': 1,

		'@stylistic/selector-combinator-space-after': 'always',
		'@stylistic/selector-combinator-space-before': 'always',

		'@stylistic/declaration-bang-space-after': 'never',
		'@stylistic/declaration-bang-space-before': 'always',
		'@stylistic/declaration-colon-space-before': 'never',
		'@stylistic/declaration-colon-space-after': 'always-single-line',
		'@stylistic/declaration-colon-newline-after': null,

		'@stylistic/declaration-block-trailing-semicolon': 'always',

		'@stylistic/function-comma-space-after': 'always',
		'@stylistic/function-comma-space-before': 'never',

		'@stylistic/number-leading-zero': 'always',
		'@stylistic/number-no-trailing-zeros': true,

		'@stylistic/string-quotes': 'single',

		'@stylistic/block-closing-brace-newline-after': 'always',
		'@stylistic/block-closing-brace-newline-before': 'always',

		'@stylistic/function-parentheses-newline-inside': 'never-multi-line',
		'@stylistic/function-parentheses-space-inside': 'never',

		'@stylistic/function-whitespace-after': 'always',

		// Standard rules.
		'comment-empty-line-before': [
			'always', {
				ignore: ['stylelint-commands', 'after-comment'],
			},
		],

		'rule-empty-line-before': [
			'always', {
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'alpha-value-notation': 'number',

		'color-hex-length': 'long',
		'color-named': null,
		'color-no-invalid-hex': true,
		'color-function-notation': null,

		'font-family-name-quotes': 'always-unless-keyword',

		'font-weight-notation': 'named-where-possible',

		'function-calc-no-unspaced-operator': true,
		'function-linear-gradient-no-nonstandard-direction': true,
		'function-url-quotes': 'always',

		'number-max-precision': 5,
		'length-zero-no-unit': true,

		'string-no-newline': true,
		'unit-no-unknown': true,

		'value-no-vendor-prefix': true,
		'value-keyword-case': null,

		'property-no-vendor-prefix': true,

		'declaration-empty-line-before': null,
		'declaration-no-important': true,

		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-block-single-line-max-declarations': 1,
		"declaration-block-no-redundant-longhand-properties": [
			true,
			{
				"ignoreShorthands": [
					"grid-template"
				]
			}
		],

		'block-no-empty': true,

		'selector-max-specificity': '0,4,0',
		'selector-no-vendor-prefix': true,
		'selector-pseudo-element-colon-notation': 'double',

		'media-feature-name-no-vendor-prefix': true,

		'at-rule-no-vendor-prefix': true,

		'comment-whitespace-inside': 'always',

		'max-nesting-depth': 3,
		'no-duplicate-selectors': true,
		'no-unknown-animations': true,

		'keyframes-name-pattern': null,
		'scss/at-function-pattern': null,
		'scss/dollar-variable-pattern': null,
		'scss/at-import-partial-extension': null,
		'scss/no-global-function-names': null,
		'scss/dollar-variable-empty-line-before': null,
		'scss/at-if-closing-brace-newline-after': null,
		'scss/at-if-closing-brace-space-after': null,
		'scss/at-else-closing-brace-newline-after': null,
		'scss/at-else-closing-brace-space-after': null,
		'scss/at-if-no-null': null,
		'selector-class-pattern': null,
		'no-descending-specificity': null,

		'import-notation': null,
	},
};
