/*
 * @Author: Lqf
 * @Date: 2022-01-11 21:39:38
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-22 00:01:02
 * @Description: 我添加了修改
 */

// import '@babel/polyfill'

import './style/index.css'
import './style/index.less'
import { a } from './a.js'
import pic from './images/pic.jpeg' // file-loader url-loader

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const img = new Image()
img.src = pic
console.log('pic: ', pic)

const tag = document.querySelector('#index')
tag.append(img)


console.log('hello webpack' + a)

const arr = [new Promise(() => { }), new Promise(() => { })]
arr.map(item => {
  console.log(item)
})

import { info } from './api/index'

info()

class App extends Component {
  render () {
    return <div>hello react</div>
  }
}

ReactDOM.render(
  App,
  document.querySelector('#index')
)