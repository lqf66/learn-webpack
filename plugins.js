/*
 * @Author: Lqf
 * @Date: 2022-01-17 22:37:30
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-17 23:03:35
 * @Description: 我添加了修改
 */

const webpack = require('webpack')
const config = require('./webpack.config')

const compiler = webpack(config)

Object.keys(compiler.hooks).forEach((hookName) => {
  compiler.hooks[hookName].tap('事件名称', (compilation) => {
    console.log('compilation: ', compilation)
    console.log(`run ---------> ${hookName}`)
  })
})

compiler.run()
