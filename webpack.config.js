module.exports = {
  entry: './client/index.jsx',

  output: {
    path: `${__dirname}/client/dist`,
    filename: 'bundle.js',
    libraryTarget: 'umd',
    publicPath: '/static/',
  },

  resolve: {
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
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
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
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs2: 'react-router-dom',
      commonjs: 'react-router-dom',
      amd: 'react-router-dom',
    },
    'react-autosuggest': {
      root: 'Autosuggest',
      commonjs2: 'react-autosuggest',
      commonjs: 'react-autosuggest',
      amd: 'react-autosuggest',
    },
  },
};
