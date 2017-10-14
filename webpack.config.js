const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dev = process.env.NODE_ENV == "dev"

let cssLoaders = [
  { 
    loader: 'css-loader', 
    options: { 
      importLoaders: 1,
      minimize: !dev
    }
  }
]

if (!dev) {
  cssLoaders.push({
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('autoprefixer')({
          browers: ['last 2 versions', 'ie > 8']
        })
      ]
    }
  });
}

let config = {
  entry: {
    app: './assets/js/app.js'
  },
  watch: dev,
  output: {
    path: path.resolve('dist'),
    filename: dev ? '[name].js' : '[name].[chunkhash:8].js',
    publicPath: '/dist/'
  },
  devtool: dev ? "cheap-module-eval-source-map" : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use : ['babel-loader']
      },
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: cssLoaders
        })
      },
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [...cssLoaders, 'sass-loader']
        })
      }
    ]
  },
  plugins : [
    new ExtractTextPlugin({
      filename: dev ? '[name].css' : '[name].[contenthash:8].css',
      disable: dev
    })
  ]
}

if (!dev) {
  config.plugins.push(new UglifyJSPlugin({
    sourceMap: false
  }))

  config.plugins.push(new ManifestPlugin())

  config.plugins.push(new CleanWebpackPlugin(
    ['dist'], 
    {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    })
  )
}

module.exports = config