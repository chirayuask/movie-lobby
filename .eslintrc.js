module.exports = {
  env: {
    es2022: true,
    node: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOption: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'space-before-function-paren': 'off',
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }]
  }
};
