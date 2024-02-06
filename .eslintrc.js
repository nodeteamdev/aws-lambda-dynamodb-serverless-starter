module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-import-module-exports': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'no-empty-function': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-extra-semi': 'off',
    'dot-notation': 'off',
  },
};
