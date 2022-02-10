/*
 * @Author: Lqf
 * @Date: 2022-01-11 21:43:50
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-22 00:20:04
 * @Description: 我添加了修改
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { VueLoaderPlugin } = require('vue-loader')
const TxtWebpackPlugin = require('./myPlugins/txt-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: resolve(__dirname, './build'),
    filename: 'js/[name].js'
  },
  mode: 'development',
  devServer: {
    contentBase: './build',
    open: true,
    port: 8081,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9092'
      }
    }
  },
  resolveLoader: {
    modules: ['./node_modules', './myLoaders']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          // use: ['my-style-loader', 'my-css-loader', 'my-less-loader']
          // {
          //   loader: 'style-loader',
          //   options: {
          //     injectType: 'singletonStyleTag' // 将所有的style标签合并成一个
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader', 'less-loader'
        ]
      },
      // {
      //   // 处理静态资源文件
      //   test: /\.(png|jpe?g|gif|webp)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       // name 资源名称 ext 模块后缀
      //       name: '[name]_[hash].[ext]',
      //       // 图片资源的引入位置
      //       outputPath: 'images',
      //       // 图片资源的引入位置(css引入)
      //       publicPath: '../images'
      //     }
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            // file-loader加强版本
            loader: 'url-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images',
              publicPath: '../images',
              // 小于2048,才会转化成base64
              limit: 3 * 1024
            },
          },
          // 图片压缩,必须在file-loader之前使用,内含optionalDependencies必须使用c npm
          'image-webpack-loader'
        ]
      },
      {
        // 处理一个字体文件,字体也可以用url-loader进行base64处理
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'font',
            publicPath: '../font'
          }
        }
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'my-loader-async',
      //       options: {
      //         name: 'Lqf'
      //       }
      //     },
      //     'my-loader'
      //   ]
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      // {
      //   test: /\.vue$/,
      //   use: {
      //     loader: 'vue-loader'
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      filename: 'html/index.html',
      chunks: ['index'] // 代码组
    }),
    new HtmlWebpackPlugin({
      template: './src/public/login.html',
      filename: 'html/login.html',
      chunks: ['login'] // 代码组
    }),
    // 样式抽取成独立的样式文件
    new MiniCssExtractPlugin({
      filename: 'style/index.css',
    }),
    // new VueLoaderPlugin() // 必须引入
    new TxtWebpackPlugin({ name: 'Lqf' }),
  ]
}