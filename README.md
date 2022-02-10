<!--
 * @Author: Lqf
 * @Date: 2022-01-14 00:02:19
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-22 00:21:12
 * @Description: 我添加了修改
-->

Webpack配置(注意代码层级)
 - entry/output
 - mode
 - resolveLoader loader文件夹
 - plugins
   - CleanWebpackPlugin
   - HtmlWebpackPlugin
   - MiniCssExtractPlugin
   - 自定义plugin
 - rules (loader)
   - style-loader
   - css-loader
   - less-loader
   - postcss-loader
     - autoprefixer
     - cssnano
     - overrideBrowserslist
   - file-loader 处理静态文件
     - publicPath
   - url-loader
   - image-webpack-loader
   - mpa
     - setMPA 多页面配置,代码结构需要相匹配
     - glob
    - babel
      - @babel/preset-env
      - @babel/preset-react
    - vue-loader/vue-template-compiler
    - 自定义loader
