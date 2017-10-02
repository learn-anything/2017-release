module.exports = {
  extends: 'airbnb-base',
  plugins: ['react', 'jsx-a11y', 'import'],

  env: {
    browser: true,
    jest: true,
  },
  globals: {
    ga: true,
    __: true,
    laAuth: true,
  },

  rules: {
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'linebreak-style': 'off',
    'no-console': 'warn',
    'class-methods-use-this': 'off',
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
