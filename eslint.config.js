import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

const ignorePatterns = [
  'eslint.config.js',
  '**/*.config.js',
  '**/*.config.cjs',
  '**/*.config.mjs',
  'node_modules/',
  'dist/',
  'build/',
  'public/',
  '*.config.js',
];

export default tseslint.config(
  {
    ignores: ignorePatterns,
  },

  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      '@@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      'prettier/prettier': 'error',
    },
  },

  {
    files: ['**/*.tsx', '**/*.jsx'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-key': 'error',
      'react/prop-types': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
    },
  },

  {
    files: ['**/*.js'],
    ignores: ignorePatterns,
    extends: [js.configs.recommended],
    rules: {
      'no-unused-vars': 'warn',
    },
  },
);
