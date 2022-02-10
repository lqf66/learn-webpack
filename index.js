/*
 * @Author: Lqf
 * @Date: 2022-01-22 14:15:29
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-28 16:17:48
 * @Description: 我添加了修改
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('babel-core')
let id = 1

/**
 * createAsset
 *  获取文件内容
 *  获取抽象语法树
 *  获取依赖关系
 *  esm -> cjs
 */
function createAsset(filename) {
  // 获取文件内容
  let source = fs.readFileSync(filename, {
    encoding: 'utf-8'
  })

  function initLoaders() {
    // init loader
    const loaders = config.module.rules

    const loaderContext = {
      addUser(user) {
        console.log('user=' + user)
      }
    }

    loaders.forEach(loader => {
      const { test, use } = loader
      if (test.test(filename)) {
        // 链式调用
        source = use.call(loaderContext, source)
      }
    })
  }

  initLoaders(source)

  // 获取抽象语法树 ast/正则
  const ast = parser.parse(source, {
    sourceType: 'module'
  })

  // console.log(ast)

  // 获取文件依赖
  const deps = []
  traverse(ast, {
    ImportDeclaration({ node }) {
      // console.log('node: ', node)
      deps.push(node.source.value)
    }
  })

  // esm -> cjs
  const { code } = transformFromAst(ast, null, {
    presets: ['env']
  })

  return {
    id: id++,
    code,
    deps,
    filename,
    mapping: {}
  }
}


/**
 * createGraph
 *  获取主文件
 *  递归处理子文件
 *  获取绝对地址
 */
function createGraph() {
  const mainAsset = createAsset('./example/main.js')
  // console.log('mainAsset: ', mainAsset)

  const queue = [mainAsset]

  for (const asset of queue) {
    // todo 如何避免无限递归
    asset.deps.forEach(relativePath => {
      // todo 处理 .js .json 尝试后缀自动添加
      const childPath = path.resolve('./example/', relativePath)
      const child = createAsset(childPath)
      // console.log('child: ', child)
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }
  return queue
}


function build(graph) {
  // console.log('graph: ', graph)

  function createModules(graph) {
    const modules = {}
    graph.forEach(asset => {
      // modules[asset.filename] = asset.code
      modules[asset.id] = [asset.code, asset.mapping]
    })
    // console.log('modules: ', modules)
    return modules
  }
  function createContext(modules) {
    const template = fs.readFileSync('./bundle.ejs', {
      encoding: 'utf-8'
    })
    // console.log('template: ', template)
    return ejs.render(template, { modules })
  }
  function emitFile(context) {
    fs.writeFileSync('./example/dist/bundle.js', context)
  }

  const modules = createModules(graph)
  // console.log('modules: ', modules)
  emitFile(createContext(modules))
}

const config = {
  module: {
    rules: [
      { test: /.json$/, use: jsonLoader }
    ]
  }
}

function jsonLoader(source) {
  console.log('--------json---loader-------')
  this.addUser('Lqf')
  return `export default  ${source}`
}

const graph = createGraph()
build(graph)
// console.log('graph: ', graph)