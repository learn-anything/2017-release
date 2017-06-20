const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';
const entry = isDev ? [
  'webpack-hot-middleware/client?reload=true&timeout=2000',
  'react-hot-loader/patch',
  './client/index.jsx',
] : './client/index.jsx';

const plugins = isDev ? [new webpack.HotModuleReplacementPlugin()] : [];

module.exports = {
  entry,
  plugins,
  cache: isDev,

  output: {
    path: `${__dirname}/client/dist`,
    filename: 'bundle.js',
    libraryTarget: 'umd',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  module: {
    loaders: [
      /* {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, */
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'react-autosuggest': 'Autosuggest',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    'redux-thunk': 'ReduxThunk',
  },
};
