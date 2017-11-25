module.exports = {
  extends: 'airbnb-base',
  plugins: ['react', 'jsx-a11y', 'import'],

  env: {
    browser: true,
    jest: true,
  },
  globals: {
    gtag: true,
    __: true,
    laAuth: true,
  },

  rules: {
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'no-console': 'warn',
    'class-methods-use-this': 'off',
    'no-mixed-operators': ['error', { 'allowSamePrecedence': true }],
  },

  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },

  settings: {
    'import/resolver': {
      webpack: { config: 'webpack.config.js' },
    },
  },
};
