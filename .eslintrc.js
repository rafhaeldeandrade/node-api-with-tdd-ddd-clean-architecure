module.exports = {
  extends: ['standard-with-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
