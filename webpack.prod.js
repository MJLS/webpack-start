const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//babel-minify-webpack-plugin
const MinifyPlugin = require('babel-minify-webpack-plugin');
//Borrar DIST las llaves indican que solo nos interesa esa clase de todo el paquete
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//<1> Instalación de BABEL npm install --save-dev babel-loader @babel/core

module.exports = {
  mode: 'production',

  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  output: {
    //Evitamos la cache del cliente
    filename: 'main.[contentHash].js' //main.150f00f64931567835b1.js
  },
  module: {
    rules: [
      //BABEL
      {
        test: /\.js$/, //Evaluacion para todos los archivos js
        exclude: /node_modules/, //Excluye los módulos de node
        //loader: 'babel-loader' version antigua de como cargar los loader
        use: ['babel-loader']
      },
      {
        test: /style\.css$/,

        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.css$/,

        exclude: /style\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.html$/,

        use: [
          {
            loader: 'html-loader',

            options: {
              minimize: false
            }
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,

        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,

              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',

      filename: './index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[contentHash].css', //d7ffec04af2e0c3fcb5f.css
      ignoreOrder: false
    }),
    new MinifyPlugin(),
    new CleanWebpackPlugin()
  ]
};

//BABEL
// "_comentario_paqueteMin": "npm install babel-preset-minify --save-dev y lo usamos con presets: [minify]", (ofusca)
//npm install babel-minify-webpack-plugin --save-dev para (ofusca y comprime)
//npm install --save-dev @babel/preset-env //Para compatibilizar con ES5

//Eliminar DIST npm install --save-dev clean-webpack-plugin
