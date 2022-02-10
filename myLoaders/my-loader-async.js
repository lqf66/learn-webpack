/*
 * @Author: Lqf
 * @Date: 2022-01-13 00:00:56
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-16 19:39:00
 * @Description: 我添加了修改
 */

/**
 * loader必须是函数,并且不能是箭头函数
 * loader必须有返回值 string or buffer
 * loader可以通过API获取配置
 */

const loaderUtils = require('loader-utils')
module.exports = function (source) {
  // console.log('source: ', this.query)
  // return source.replace('hello', this.query.name)
  // const options = loaderUtils.getOptions(this) // 官方推荐插件
  // return source.replace('hello', options.name)

  const info = source.replace('hello', this.query.name)
  // this.callback(null, info)

  const callback = this.async()
  setTimeout(() => {
    callback(null, info)
  }, 500)
}