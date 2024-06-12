import globals from 'globals';

import stylisticJs from '@stylistic/eslint-plugin-js';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const settingArgs = {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.es2021,
      ...globals.browser
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  plugins: {
    prettier: eslintPluginPrettier,
    '@stylistic/js': stylisticJs
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@stylistic/js/linebreak-style': 0,
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        ignoreRestSiblings: false
      }
    ],
    'react/no-unknown-property': 0,
    'comma-dangle': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-shadow': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/jsx-no-bind': 0,
    'object-curly-newline': 0,
    'react/button-has-type': 0,
    'react/self-closing-comp': 0,
    'import/no-absolute-path': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-named-as-default': 0,
    'tailwindcss/classnames-order': 0,
    'tailwindcss/no-custom-classname': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-named-as-default-member': 0,
    'tailwindcss/no-contradicting-classname': 0
  }
};

export default settingArgs;
