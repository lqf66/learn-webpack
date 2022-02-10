/*
 * @Author: Lqf
 * @Date: 2022-01-13 23:01:43
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-13 23:02:46
 * @Description: 我添加了修改
 */

const less = require('less')
module.exports = function (source) {
  less.render(source, (error, { css }) => {
    this.callback(error, css)
  })
}