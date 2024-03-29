module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },
  overrides: [
    {
      files: ['**/*{.js,.jsx}'],
      rules: {
        'no-unused-vars': [
          2,
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    {
      files: ['**/*{.ts,.tsx}'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: ['tsconfig.json'],
          },
        },
      },
      rules: {
        'import/dynamic-import-chunkname': [
          'error',
          {
            importFunctions: ['dynamicImport'],
            webpackChunknameFormat: '[a-z0-57-9-/_]+',
          },
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-deprecated': 'error',
        'import/no-duplicates': ['error', { considerQueryString: true }],
        'import/no-dynamic-require': 'error',
        'import/no-useless-path-segments': [
          'error',
          {
            noUselessIndex: true,
          },
        ],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
            warnOnUnassignedImports: true,
          },
        ],
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-unused-vars': [
          2,
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    {
      files: ['**/*.config.js', '**/*.{test,spec}{.js,.jsx,.ts,.tsx}'],
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['scripts/**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
