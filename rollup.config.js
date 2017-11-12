import npm from 'rollup-plugin-node-resolve';

export default {
  input: `${__dirname}/d3.bundle.js`,

  output: {
    file: `${__dirname}/client/dist/d3.js`,
    format: 'umd',
    name: 'd3',
  },

  plugins: [npm({ jsnext: true })],
};
