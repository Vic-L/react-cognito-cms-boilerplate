const webpack = require("webpack")
const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pathsToClean = ["dist"]
const cleanOptions = {}
const Dotenv = require('dotenv-webpack')

const PRIMARY_COLOR = '#E92430'
const SECONDARY_COLOR = 'mediumseagreen'
const ALTERNATIVE_COLOR = 'mediumseagreen'
const ERROR_COLOR = '#CD3C14'
const TRANSITION_TIMEOUT = '350'
const PRIMARY_FONT = 'Karla'
const SECONDARY_FONT = 'Montserrat'

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
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "resolve-url-loader"},
          {
            loader: "sass-loader",
            options: {
              data: 
                `$primary-color: ${PRIMARY_COLOR};` +
                `$secondary-color: ${SECONDARY_COLOR};` +
                `$alternative-color: ${ALTERNATIVE_COLOR};` +
                `$error-color: ${ERROR_COLOR};` +
                `$primary-font: ${PRIMARY_FONT};` + 
                `$secondary-font: ${SECONDARY_FONT};`
            }
          }
        ],
      },
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
    new webpack.DefinePlugin({
      PRIMARY_COLOR: JSON.stringify(PRIMARY_COLOR),
      SECONDARY_COLOR: JSON.stringify(SECONDARY_COLOR),
      ERROR_COLOR: JSON.stringify(ERROR_COLOR),
      TRANSITION_TIMEOUT: JSON.stringify(TRANSITION_TIMEOUT),
      PRIMARY_FONT: JSON.stringify(PRIMARY_FONT),
      SECONDARY_FONT: JSON.stringify(SECONDARY_FONT),
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
      _transitions: path.resolve(__dirname, "src/components/transitions/"),
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
      _screens: path.resolve(__dirname, "src/components/screens/"),
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
