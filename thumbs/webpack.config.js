module.exports = {
  entry: './index.jsx',

  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    libraryTarget: 'umd',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
