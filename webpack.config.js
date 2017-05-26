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
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'react-autosuggest': 'Autosuggest',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    'redux-thunk': 'ReduxThunk',
  },
};
