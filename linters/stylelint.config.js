module.exports = {
	rules: {
		indentation: 'tab',
		'comment-empty-line-before': [
			'always', {
				ignore: ['stylelint-commands', 'after-comment'],
			},
		],
		'declaration-colon-space-after': 'always',
		'max-empty-lines': 2,
		'max-line-length': 250,
		'rule-empty-line-before': [
			'always', {
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],


		'color-hex-case': 'upper',
		'color-hex-length': 'long',
		'color-named': 'never',
		'color-no-invalid-hex': true,

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
		'number-max-precision': 2,
		'number-no-trailing-zeros': true,
		'length-zero-no-unit': true,

		'string-no-newline': true,
		'unit-no-unknown': true,
		'string-quotes': 'single',

		'value-no-vendor-prefix': true,
		'value-list-comma-newline-before': 'never-multi-line',
		'value-list-comma-space-after': 'always-single-line',
		'value-list-comma-space-before': 'never',

		'property-no-vendor-prefix': true,

		'declaration-bang-space-after': 'never',
		'declaration-bang-space-before': 'always',
		'declaration-colon-space-before': 'never',
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
	},
};
