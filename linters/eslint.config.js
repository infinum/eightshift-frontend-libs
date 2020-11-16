module.exports = {
	root: true,
	parser: 'babel-eslint',
	ignorePatterns: [
		'node_modules/*',
		'vendor/*',
		'setup/*',
		'tests/*',
	],
	extends: [
		'wordpress',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:jest/recommended',
		'@infinumjs',
	],
	env: {
		browser: true,
		es6: true,
		node: true,
		mocha: true,
		'jest/globals': true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 6,
		ecmaFeatures: {
			arrowFunctions: true,
			blockBindings: true,
			classes: true,
			defaultParams: true,
			destructuring: true,
			forOf: true,
			generators: false,
			modules: true,
			objectLiteralComputedProperties: true,
			objectLiteralDuplicateProperties: false,
			objectLiteralShorthandMethods: true,
			objectLiteralShorthandProperties: true,
			spread: true,
			superInFunctions: true,
			templateStrings: true,
			jsx: true,
		},
	},
	globals: {
		wp: true,
		wpApiSettings: true,
		window: true,
		document: true,
		$: true,
	},
	plugins: [
		'react',
		'jsx-a11y',
		'jest',
	],
	settings: {
		'import/core-modules': [
			'@wordpress/components',
			'@wordpress/compose',
			'@wordpress/blocks',
			'@wordpress/element',
			'@wordpress/editor',
			'@wordpress/date',
			'@wordpress/data',
			'@wordpress/i18n',
			'@wordpress/keycodes',
			'@wordpress/viewport',
			'@wordpress/blob',
			'@wordpress/url',
			'@wordpress/apiFetch',
			'react',
			'react-dom',
			'tinyMCE',
			'tinymce',
			'backbone',
			'lodash',
			'moment',
			'ga',
			'gtag',
			'jquery',
		],
		react: {
			pragma: 'wp',
			version: 'detect',
		},
	},

	rules: {
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
				
			},
		],
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'space-before-function-paren': 0,
		allowImportExportEverywhere: 0,
		yoda: [
			'error',
			'never',
			{
				exceptRange: true,
			},
		],
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/prefer-default-export': 0,
		'object-curly-spacing': [2, 'always'],
		'no-duplicate-imports': 2,
		'no-mixed-operators': 1,
		'no-unsafe-negation': 1,
		'no-useless-computed-key': 2,
		'no-useless-return': 2,
		'arrow-body-style': 0,
		'jsx-a11y/no-autofocus': 0,
		'jsx-a11y/media-has-caption': 0,
		'jsx-a11y/no-noninteractive-tabindex': 0,
		'jsx-a11y/role-has-required-aria-props': 0,
		'jsx-a11y/label-has-associated-control': [
			'error', {
				required: {
					some: [
						'nesting',
						'id',
					],
				},
			},
		],
		'jsx-a11y/label-has-for': [
			'error', {
				required: {
					some: [
						'nesting',
						'id',
					],
				},
			},
		],
		'jsx-quotes': 1,
		'react/display-name': 0,
		'react/jsx-curly-spacing': [
			2,
			{
				when: 'never',
				children: true,
			},
		],
		'react/jsx-equals-spacing': [
			2,
			'never',
		],
		'react/jsx-key': 2,
		'react/jsx-tag-spacing': 2,
		'react/no-children-prop': 0,
		'react/no-find-dom-node': 1,
		'react/prop-types': 0,
		'no-restricted-syntax': [
			2,
			{
				selector: 'ImportDeclaration[source.value=/^@wordpress\\u002F.+\\u002F/]',
				message: 'Path access on WordPress dependencies is not allowed.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^blocks$/]',
				message: 'Use @wordpress/blocks as import path instead.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^components$/]',
				message: 'Use @wordpress/components as import path instead.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^date$/]',
				message: 'Use @wordpress/date as import path instead.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^editor$/]',
				message: 'Use @wordpress/editor as import path instead.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^element$/]',
				message: 'Use @wordpress/element as import path instead.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^i18n$/]',
				message: 'Use @wordpress/i18n as import path instead.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^data$/]',
				message: 'Use @wordpress/data as import path instead.',
			},
			{
				selector: 'ImportDeclaration[source.value=/^utils$/]',
				message: 'Use @wordpress/utils as import path instead.',
			},
			{
				selector: 'CallExpression[callee.name=/^__|_n|_x$/]:not([arguments.0.type=/^Literal|BinaryExpression$/])',
				message: 'Translate function arguments must be string literals.',
			},
			{
				selector: 'CallExpression[callee.name=/^_n|_x$/]:not([arguments.1.type=/^Literal|BinaryExpression$/])',
				message: 'Translate function arguments must be string literals.',
			},
			{
				selector: 'CallExpression[callee.name=_nx]:not([arguments.2.type=/^Literal|BinaryExpression$/])',
				message: 'Translate function arguments must be string literals.',
			},
		],

		/**
		* Possible errors
		*/

		'comma-dangle': [
			'error', 'always-multiline',
		],
		'no-cond-assign': [
			2, 'always',
		],
		'no-console': 1,
		'no-constant-condition': 1,
		'no-control-regex': 1,
		'no-debugger': 1,
		'no-dupe-args': 1,
		'no-dupe-keys': 1,
		'no-duplicate-case': 2,
		'no-empty': 1,
		'no-empty-character-class': 1,
		'no-ex-assign': 2,
		'no-extra-boolean-cast': 1,
		'no-extra-parens': [
			2, 'functions',
		],
		'no-extra-semi': 2,
		'no-func-assign': 2,
		'no-inner-declarations': 2,
		'no-invalid-regexp': 2,
		'no-irregular-whitespace': 2,
		'no-negated-in-lhs': 1,
		'no-obj-calls': 2,
		'no-prototype-builtins': 0,
		'no-regex-spaces': 2,
		'no-sparse-arrays': 2,
		'no-unexpected-multiline': 2,
		'no-unreachable': 2,
		'use-isnan': 2,
		'valid-jsdoc': 0,
		'valid-typeof': 1,

		/**
		* Best practices
		*/

		'accessor-pairs': 1,
		'array-callback-return': 2,
		'block-scoped-var': 2,
		complexity: 0,
		'consistent-return': 1,
		curly: [
			2, 'all',
		],
		'default-case': 2,
		'dot-location': [
			1, 'property',
		],
		'dot-notation': [
			2, {
				allowKeywords: true,
				allowPattern: '^[a-z](_[a-z])$', //
			},
		],
		eqeqeq: 2,
		'guard-for-in': 2,
		'no-alert': 1,
		'no-caller': 2,
		'no-case-declarations': 2,
		'no-div-regex': 2,
		'no-else-return': 2,
		'no-empty-function': 1,
		'no-empty-pattern': 2,
		'no-eq-null': 2,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-extra-bind': 2,
		'no-extra-label': 0,
		'no-fallthrough': 1,
		'no-floating-decimal': 2,
		'no-implicit-coercion': [
			2, {
				number: true,
				boolean: false,
			},
		],
		'no-implicit-globals': 0,
		'no-implied-eval': 2,
		'no-invalid-this': 0,
		'no-iterator': 2,
		'no-labels': 2,
		'no-lone-blocks': 2,
		'no-loop-func': 2,
		'no-magic-numbers': 0,
		'no-multi-spaces': 2,
		'no-multi-str': 2,
		'no-native-reassign': 2,
		'no-new': 2,
		'no-new-func': 2,
		'no-new-wrappers': 2,
		'no-octal': 2,
		'no-octal-escape': 2,
		'no-param-reassign': [
			2, {
				props: false,
			},
		],
		'no-proto': 2,
		'no-redeclare': 2,
		'no-return-assign': 2,
		'no-script-url': 2,
		'no-self-assign': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-throw-literal': 2,
		'no-unmodified-loop-condition': 1,
		'no-unused-expressions': 2,
		'no-unused-labels': 2,
		'no-useless-call': 2,
		'no-useless-concat': 1,
		'no-void': 2,
		'no-warning-comments': 0,
		'no-with': 2,
		radix: 2,
		'vars-on-top': 0,
		'wrap-iife': [
			2, 'inside',
		],

		/**
		* Strict Mode
		*/

		strict: 1,

		/**
		* Variables
		*/

		'init-declarations': 0,
		'no-catch-shadow': 2,
		'no-delete-var': 2,
		'no-label-var': 0,
		'no-restricted-globals': 0,
		'no-shadow': [
			1, {
				hoist: 'all',
			},
		],
		'no-shadow-restricted-names': 2,
		'no-undef': 2,
		'no-undef-init': 2,
		'no-undefined': 2,
		'no-unused-vars': [
			1, {
				vars: 'local',
				args: 'after-used',
			},
		],
		'no-use-before-define': 2,

		/**
		* Stylistic Issues
		*/

		'array-bracket-spacing': [
			2, 'never',
		],
		'block-spacing': 2,
		'brace-style': [
			2,
			'1tbs', {
				allowSingleLine: false,
			},
		],
		camelcase: [
			2, {
				properties: 'always',
			},
		],
		'comma-spacing': [
			2, {
				before: false,
				after: true,
			},
		],
		'comma-style': 2,
		'computed-property-spacing': [
			2, 'never',
		],
		'consistent-this': [
			1, 'self',
		],
		'eol-last': 2,
		'func-names': 0,
		'func-style': 0,
		'id-blacklist': 0,
		'id-length': 0,
		'id-match': 0,
		'key-spacing': [
			2, {
				beforeColon: false,
				afterColon: true,
			},
		],
		'keyword-spacing': 2,
		'linebreak-style': 0,
		'lines-around-comment': [
			2, {
				beforeBlockComment: true,
				beforeLineComment: true,
			},
		],
		'max-depth': 0,
		'max-len': 0,
		'max-nested-callbacks': 0,
		'max-params': 0,
		'max-statements': 0,
		'new-cap': [
			2, {
				newIsCap: true,
			},
		],
		'new-parens': 2,
		'newline-after-var': 0,
		'newline-before-return': 0,
		'newline-per-chained-call': 0,
		'no-array-constructor': 2,
		'no-bitwise': 2,
		'no-continue': 0,
		'no-inline-comments': 0,
		'no-lonely-if': 2,
		'no-mixed-spaces-and-tabs': 2,
		'no-multiple-empty-lines': 0,
		'no-negated-condition': 0,
		'no-nested-ternary': 2,
		'no-new-object': 2,
		'no-plusplus': 0,
		'no-spaced-func': 2,
		'no-ternary': 0,
		'no-trailing-spaces': [
			2, {
				skipBlankLines: true,
			},
		],
		'no-underscore-dangle': 0,
		'no-unneeded-ternary': 2,
		'no-whitespace-before-property': 2,
		'one-var': [
			2, 'never',
		],
		'one-var-declaration-per-line': 0,
		'operator-assignment': [
			2, 'always',
		],
		'operator-linebreak': [
			2, 'after',
		],
		'padded-blocks': 0,
		'quote-props': [
			2, 'as-needed',
		],
		quotes: [
			2, 'single',
		],
		'require-jsdoc': 0,
		semi: [
			2, 'always',
		],
		'semi-spacing': [
			2, {
				before: false,
				after: true,
			},
		],
		'sort-imports': 0,
		'sort-vars': 0,
		'space-before-blocks': 2,
		'space-in-parens': [
			2, 'never',
		],
		'space-infix-ops': [
			2, {
				int32Hint: false,
			},
		],
		'space-unary-ops': 1,
		'spaced-comment': [
			2, 'always', { markers: ['='] },
		],
		'wrap-regex': 2,

		/**
		* ECMAScript 6
		*/

		'arrow-parens': [
			2, 'always',
		],
		'arrow-spacing': [
			2, {
				before: true,
				after: true,
			},
		],
		'constructor-super': 1,
		'generator-star-spacing': 0,
		'no-class-assign': 2,
		'no-confusing-arrow': 1,
		'no-const-assign': 2,
		'no-dupe-class-members': 2,
		'no-new-symbol': 2,
		'no-this-before-super': 2,
		'no-useless-constructor': 1,
		'no-var': 1,
		'object-shorthand': 1,
		'prefer-arrow-callback': 0,
		'prefer-const': 1,
		'prefer-reflect': 0,
		'prefer-rest-params': 1,
		'prefer-spread': 2,
		'prefer-template': 1,
		'require-yield': 1,
		'template-curly-spacing': [
			1, 'never',
		],
		'yield-star-spacing': [1, 'before'],
		'class-methods-use-this': 0,
		'import/named': 2,
	},
};
