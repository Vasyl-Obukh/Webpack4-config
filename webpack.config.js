const path               = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const ExtractTextPlugin  = require("extract-text-webpack-plugin");

let conf = {
  entry: {
    index: ['./src/js/index.js'/* , './src/sass/style.sass' */]
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'index.js',
    publicPath: 'dist/js'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      /* {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          //fallback: 'style-loader'
        })
      } */
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          //fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: './dist/index.html'
    }),
    new ExtractTextPlugin("./css/style.css")
  ]
};


module.exports = (env, options) => {
  let production = options.mode ==='production';
  conf.devtool = production ? false/* 'source-map' */ : 'eval-sourcemap';
  return conf;
}