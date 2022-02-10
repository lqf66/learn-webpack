/*
 * @Author: Lqf
 * @Date: 2022-01-13 23:03:57
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-13 23:18:41
 * @Description: 我添加了修改
 */

module.exports = function (source) {
  return `
    const tag = document.createElement('style')
    tag.innerHTML = ${source}
    document.head.appendChild(tag)
  `
}