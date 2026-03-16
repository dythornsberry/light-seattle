import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

const sharedConfig = {
	plugins: { react, 'react-hooks': reactHooks, import: importPlugin },
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parserOptions: { ecmaFeatures: { jsx: true } },
		globals: { ...globals.browser, React: 'readonly', Intl: 'readonly' },
	},
	settings: {
		react: { version: 'detect' },
		'import/resolver': {
			node: { extensions: ['.js', '.jsx'] },
			alias: { map: [['@', './src']], extensions: ['.js', '.jsx'] },
		},
	},
	rules: {
		...react.configs.recommended.rules,
		...reactHooks.configs.recommended.rules,
		...importPlugin.flatConfigs.recommended.rules,

		// Non-critical rules - disabled since code works fine without them
		'react/prop-types': 'off',
		'react/no-unescaped-entities': 'off',
		'react/display-name': 'off',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-vars': 'off',
		'react/jsx-no-comment-textnodes': 'off',

		'no-unused-vars': 'off',
		'import/no-named-as-default': 'off',
		'import/no-named-as-default-member': 'off',

		// Critical rules that prevent runtime errors
		'no-undef': 'error',
		'import/no-self-import': 'error',

		// Disable expensive rules for performance
		'import/no-cycle': 'off',
	},
};

const usedUiFiles = [
	'src/components/ui/accordion.jsx',
	'src/components/ui/button.jsx',
	'src/components/ui/carousel.jsx',
	'src/components/ui/label.jsx',
	'src/components/ui/radio-group.jsx',
	'src/components/ui/toast.jsx',
	'src/components/ui/toaster.jsx',
	'src/components/ui/use-toast.js',
];

export default [
	{ ignores: ['node_modules/**', 'dist/**', 'build/**'] },
	{
		...sharedConfig,
		files: ['src/**/*.{js,jsx}', 'functions/**/*.js'],
		ignores: ['src/components/ui/**'],
	},
	{
		...sharedConfig,
		files: usedUiFiles,
	},
	{
		files: ['postcss.config.js', 'tailwind.config.js', 'vite.config.js'],
		languageOptions: { globals: globals.node },
	},
];
