const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const pathsToClean = ['dist'];
const cleanOptions = {};

const PRIMARY_COLOR = '#E92430';
const SECONDARY_COLOR = 'mediumseagreen';
const ALTERNATIVE_COLOR = 'mediumseagreen';
const ERROR_COLOR = '#CD3C14';
const TRANSITION_TIMEOUT = '350';
const PRIMARY_FONT = 'Lato';
const SECONDARY_FONT = 'Montserrat';
const FONT_ASSETS_ENDPOINT = 'https://github.com/InteractiveObject/pakify/raw/master/fonts';
const mode = (() => {
  switch (process.env.NODE_ENV) {
    case 'prod':
    return 'production';
    case 'stg':
    return 'production';
    case 'dev':
    return 'development';
    default:
    return 'development'; // or 'none?'
  }
})();

module.exports = {
  entry: [
    './src/index.js',
  ],
  mode,
  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    publicPath: process.env.NODE_ENV === 'production' ? 
      `${process.env.assetsPublicPathHostName}/assets/` : 
      '/assets/',
    filename: process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js'
  },
  module: {
    rules: [
      // custom javascripts
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      // custom stylesheets
      {
        test: /\.sass$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              data:
                `$primary-color: ${PRIMARY_COLOR};` +
                `$secondary-color: ${SECONDARY_COLOR};` +
                `$alternative-color: ${ALTERNATIVE_COLOR};` +
                `$error-color: ${ERROR_COLOR};` +
                `$primary-font: ${PRIMARY_FONT};` +
                `$secondary-font: ${SECONDARY_FONT};` +
                `$font-assets-endpoint: '${FONT_ASSETS_ENDPOINT}';`
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
      template: process.env.NODE_ENV === 'production' ?
        './src/index.production.html' :
        './src/index.html',
      filename: '../index.html'
    }),

    // add variables below to `globals` in eslintrc
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
    new Dotenv({
      path: `./.env.${process.env.ENV_FILE_SUFFIX}`
    }),
    new CompressionPlugin({
      exclude: process.env.NODE_ENV === 'production' ? undefined : /.*/,
      filename: '[path]'
    })
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: './src'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: process.env.NODE_ENV === 'production' ? undefined : /.*/,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },

  resolve: {
    alias: {
      _components: path.resolve(__dirname, 'src/components/'),
      _transitions: path.resolve(__dirname, 'src/components/transitions/'),
      _authentications: path.resolve(__dirname, 'src/components/authentications/'),
      _sidebar: path.resolve(__dirname, 'src/components/sidebar/'),
      _cards: path.resolve(__dirname, 'src/components/cards/'),
      _elements: path.resolve(__dirname, 'src/components/elements/'),
      _charts: path.resolve(__dirname, 'src/components/charts/'),
      _hocs: path.resolve(__dirname, 'src/components/hocs/'),
      _screens: path.resolve(__dirname, 'src/components/screens/'),
      _src: path.resolve(__dirname, 'src/'),
      _images: path.resolve(__dirname, 'src/images/'),
      _stylesheets: path.resolve(__dirname, 'src/stylesheets/'),
      _utils: path.resolve(__dirname, 'src/utils/'),
      _services: path.resolve(__dirname, 'src/services/'),
      _apollo: path.resolve(__dirname, 'src/apollo/'),
      _queries: path.resolve(__dirname, 'src/apollo/queries/'),
      _mutations: path.resolve(__dirname, 'src/apollo/mutations/'),
    }
  },
};
