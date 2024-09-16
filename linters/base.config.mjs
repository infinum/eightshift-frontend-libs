// import react from 'eslint-plugin-react';
// import reactHooks from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin-js';
import globals from 'globals';

export default [
	{
		ignores: ['**/dist/', 'public/', 'node_modules/', 'vendor/', 'vendor-prefixed/'],
	},
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				wp: true,
				...globals.serviceworker,
				...globals.browser,
			},
		},
		plugins: {
			// react,
			// 'react-hooks': reactHooks,
			'@stylistic/js': stylistic,
		},
		rules: {
			'newline-before-return': 'error',
			'no-constant-binary-expression': 'error',
			'no-implicit-coercion': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-nested-ternary': 'error',
			'no-underscore-dangle': ['error', { allowAfterThis: true }],
			'no-void': 'error',
			'@stylistic/js/semi': 'error',
			'max-len': [
				'error',
				{
					code: 180,
					comments: 500,
					ignorePattern: '^import .*',
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreTrailingComments: true,
				},
			],
			'padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: '*',
					next: ['return', 'if', 'switch', 'for', 'while', 'try', 'throw'],
				},
				{
					blankLine: 'any',
					prev: ['const', 'let', 'var', 'import'],
					next: ['const', 'let', 'var', 'import'],
				},
			],
			// React-specific.
			// Note: React rules are temporarily disabled until the plugin gets full compatibility with ESLint 9.
			// 'consistent-return': 'warn',
			// 'no-param-reassign': 'warn',
			// 'react-hooks/rules-of-hooks': 'error',
			// // 'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useSafeLayoutEffect|useUpdateEffect)' }],
			// 'react/prop-types': ['error', { skipUndeclared: true }],
			// 'react/react-in-jsx-scope': 'off',
			// 'react/self-closing-comp': ['warn', { component: true, html: true }],
			// 'react/no-unknown-property': ['error', { ignore: ['css'] }],
		},
		// settings: {
		// 	react: {
		// 		version: '18',
		// 	},
		// },
	},
];
