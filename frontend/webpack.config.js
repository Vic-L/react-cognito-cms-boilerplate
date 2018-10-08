const webpack = require("webpack")
const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pathsToClean = ["dist"]
const cleanOptions = {}
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: [
    './src/index.js',
  ],
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, "dist", "assets"),
    publicPath: process.env.NODE_ENV === 'production' ? process.env.assetsPublicPathHostName + '/assets/' : '/assets/',
    filename: process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js'
  },
  module: {
    rules: [
      // custom javascripts
      {
        test: /\.js$/,
        use: ["babel-loader", "haml-jsx-loader"],
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
      },
      // custom stylesheets
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"]
      },

      // font-awesome
      // {
      //   test: /(font-awesome)+.scss?$/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // },
      
      //** foundation; should not be using foundation js
      // {
      //   test: /(foundation)+.*\.js$/,
      //   use: "babel-loader",
      //   exclude: path.join(__dirname, "src"),
      //   include: /node_modules/,
      // },
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin({
      inject: true,
      template: process.env.NODE_ENV === 'production' ? "./src/index.production.html" : "./src/index.html",
      filename: "../index.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`
    }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: './src'
  },
  
  resolve: {
    alias: {
      _components: path.resolve(__dirname, "src/components/"),
      _animationWrappers: path.resolve(__dirname, "src/components/animationWrappers/"),
      _miscellaneous: path.resolve(__dirname, "src/components/miscellaneous/"),
      _authentications: path.resolve(__dirname, "src/components/authentications/"),
      _inputs: path.resolve(__dirname, "src/components/inputs/"),
      _buttons: path.resolve(__dirname, "src/components/buttons/"),
      _sidebar: path.resolve(__dirname, "src/components/sidebar/"),
      _tables: path.resolve(__dirname, "src/components/tables/"),
      _cards: path.resolve(__dirname, "src/components/cards/"),
      _charts: path.resolve(__dirname, "src/components/charts/"),
      _hocs: path.resolve(__dirname, "src/components/hocs/"),
      _contentLoaders: path.resolve(__dirname, "src/components/contentLoaders/"),
      _src: path.resolve(__dirname, "src/"),
      _images: path.resolve(__dirname, "src/images/"),
      _stylesheets: path.resolve(__dirname, "src/stylesheets/"),
      _utils: path.resolve(__dirname, "src/utils/"),
      _services: path.resolve(__dirname, "src/services/"),
      _selectors: path.resolve(__dirname, "src/selectors/"),
      _reducers: path.resolve(__dirname, "src/reducers/"),
    }
  },
}
