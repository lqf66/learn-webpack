
const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

const setMPA = () => {
  const entry = {}
  const HtmlWebpackPlugins = []

  const entryPath = glob.sync(join(__dirname, './src/*/index.js'))

  entryPath.map(item => {
    const entryName = item.match(/src\/(.*)\/index\.js/)[1]
    entry[entryName] = item
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: `./src/${entryName}/index.html`,
      filename: `html/${entryName}.html`,
      chunks: [entryName] // 代码组
    }))
  })

  return {
    entry,
    HtmlWebpackPlugins
  }
}

const { entry, HtmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  output: {
    path: resolve(__dirname, './mpa'),
    filename: 'js/[name].js'
  },
  mode: 'development',
  resolveLoader: {
    modules: ['./node_modules', './myLoaders']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     injectType: 'singletonStyleTag' // 将所有的style标签合并成一个
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader', 'less-loader'
        ]
        // use: ['my-style-loader', 'my-css-loader', 'my-less-loader']
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'my-loader-async',
            options: {
              name: 'Lqf'
            }
          },
          'my-loader'
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 样式抽取成独立的样式文件
    new MiniCssExtractPlugin({
      filename: 'style/index.css',
    }),
    ...HtmlWebpackPlugins,
  ]
}