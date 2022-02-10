/*
 * @Author: Lqf
 * @Date: 2022-01-17 22:57:17
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-18 00:30:55
 * @Description: 我添加了修改
 */


class TxtWebpackPlugin {
  constructor(options) {
    console.log('options: ', options)

  }
  apply (compiler) {
    compiler.hooks.emit.tapAsync('TxtWebpackPlugin', (compilation, cb) => {
      const content = `这是一个测试的资源模块`
      const assetsName = Object.keys(compilation.assets)
      compilation.assets['lqf.txt'] = {
        source: function () {
          // return content
          return JSON.stringify(assetsName)
        },
        size: function () {
          return content.length
          // return 1 // 只影响描述信息
        }
      }
      cb()
    })
  }
}

module.exports = TxtWebpackPlugin