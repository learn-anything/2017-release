const webpack = require('webpack');
const sassLintPlugin = require('sasslint-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const entry = isDev ? [
  'webpack-hot-middleware/client?reload=true&timeout=2000',
  'react-hot-loader/patch',
  './client/index.jsx'
] : './client/index.jsx';

const plugins = isDev ? [
  new sassLintPlugin({
    glob: 'client/**/*.sass',
    configFile: '.sass-lint.yml',
  }),
  new webpack.HotModuleReplacementPlugin(),
] : [];

const config = {
  entry,
  plugins,
  cache: isDev,
  devtool: isDev ? 'cheap-module-source-map' : 'none',

  output: {
    path: `${__dirname}/client/dist`,
    filename: 'bundle.js',
    libraryTarget: 'umd',
    publicPath: '/static',
  },

  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.jsx', '.js'],
  },

  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: 'markdown-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};

// List of available languages, will be modified when new languages are added.
const languages = ['en'];

module.exports = languages.map((lang) => {
  const newConfig = Object.assign({}, config);

  newConfig.plugins = [
    ...plugins,
    new I18nPlugin(require(`./client/languages/${lang}/index`)),
  ];

  newConfig.output = {
    path: `${__dirname}/client/dist`,
    filename: `${lang}.bundle.js`,
    libraryTarget: 'umd',
    publicPath: '/static',
  };

  return newConfig;
});
