var webpack = require('webpack');


var config = {
  entry: {
    app: ['webpack/hot/dev-server', './app/main.js']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: require.resolve("cytoscape"),
        loader: "imports?require=>false,define=>false"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    })
  ]
};

module.exports = config;