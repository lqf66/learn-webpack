/*
 * @Author: Lqf
 * @Date: 2022-01-21 23:58:38
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-22 00:01:29
 * @Description: 我添加了修改
 */

import axios from 'axios'

export const info = axios.get('/api/info', (res) => {
  console.log(res)
})

