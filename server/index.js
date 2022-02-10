/*
 * @Author: Lqf
 * @Date: 2022-01-21 23:55:32
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 23:56:39
 * @Description: 我添加了修改
 */

const express = require('express')

const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'Lqf',
    age: 18
  })
})

app.listen(9092, () => {
  console.log('已打开')
})