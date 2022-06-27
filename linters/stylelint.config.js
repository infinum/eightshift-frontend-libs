module.exports = {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		indentation: 'tab',
		'comment-empty-line-before': [
			'always', {
				ignore: ['stylelint-commands', 'after-comment'],
			},
		],
		'max-empty-lines': 2,
		'max-line-length': 250,
		'rule-empty-line-before': [
			'always', {
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'alpha-value-notation': 'number',

		'color-hex-case': 'upper',
		'color-hex-length': 'long',
		'color-named': null,
		'color-no-invalid-hex': true,
		'color-function-notation': null,

		'font-family-name-quotes': 'always-unless-keyword',

		'font-weight-notation': 'named-where-possible',

		'function-calc-no-unspaced-operator': true,
		'function-comma-space-after': 'always',
		'function-comma-space-before': 'never',
		'function-linear-gradient-no-nonstandard-direction': true,
		'function-parentheses-newline-inside': 'never-multi-line',
		'function-parentheses-space-inside': 'never',
		'function-url-quotes': 'always',
		'function-whitespace-after': 'always',

		'number-leading-zero': 'always',
		'number-max-precision': 3,
		'number-no-trailing-zeros': true,
		'length-zero-no-unit': true,

		'string-no-newline': true,
		'unit-no-unknown': true,
		'string-quotes': 'single',

		'value-no-vendor-prefix': true,
		'value-list-comma-newline-before': 'never-multi-line',
		'value-list-comma-newline-after': null,
		'value-list-comma-space-before': 'never',
		'value-list-comma-space-after': 'always-single-line',
		'value-keyword-case': null,
		'value-list-max-empty-lines': 1,

		'property-no-vendor-prefix': true,

		'declaration-bang-space-after': 'never',
		'declaration-bang-space-before': 'always',
		'declaration-colon-space-before': 'never',
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-newline-after': null,
		'declaration-empty-line-before': null,
		'declaration-no-important': true,

		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-block-semicolon-newline-after': 'always',
		'declaration-block-semicolon-newline-before': 'never-multi-line',
		'declaration-block-semicolon-space-after': 'always-single-line',
		'declaration-block-semicolon-space-before': 'never',
		'declaration-block-single-line-max-declarations': 1,
		'declaration-block-trailing-semicolon': 'always',

		'block-closing-brace-newline-after': 'always',
		'block-closing-brace-newline-before': 'always',
		'block-no-empty': true,
		'block-opening-brace-newline-after': 'always',
		'block-opening-brace-newline-before': 'always-single-line',
		'block-opening-brace-space-before': 'always',

		'selector-combinator-space-after': 'always',
		'selector-combinator-space-before': 'always',
		'selector-max-specificity': '0,4,0',
		'selector-no-vendor-prefix': true,
		'selector-pseudo-element-colon-notation': 'double',

		'selector-list-comma-newline-after': 'always',
		'selector-list-comma-newline-before': 'never-multi-line',

		'media-feature-colon-space-after': 'always',
		'media-feature-colon-space-before': 'never',
		'media-feature-name-no-vendor-prefix': true,
		'media-feature-range-operator-space-after': 'always',
		'media-feature-range-operator-space-before': 'always',

		'at-rule-no-vendor-prefix': true,

		'comment-whitespace-inside': 'always',

		'max-nesting-depth': 3,
		'no-duplicate-selectors': true,
		'no-eol-whitespace': true,
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
		'no-descending-specificity': null
	},
};
