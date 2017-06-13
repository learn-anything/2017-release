module.exports = {
  extends: 'airbnb-base',
  plugins: ['react', 'jsx-a11y', 'import'],

  env: { browser: true },
  globals: { ga: true },

  rules: { 
    'react/jsx-uses-vars': 'error', 
    'linebreak-style': 'off', 
  },

  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
};
