import HashHistory from "./hashHistory"

function createRoute(record, location) {
  const res = []
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched: res
  }
}


// 添加路由record
function addRouteRecord(route, pathList, pathMap, parent) {
  const path = parent ? `${parent.path}/${route.path}` : route.path
  const { component, childern = null } = route
  const record = {
    path,
    component,
    parent
  }
  // 如果不存在
  if (!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }
  // 如果存在children
  if (childern) {
    childern.forEach(childern => addRouteRecord(childern, pathList, pathMap, record))
  }
}


// 将传进来的routes数组转成一个Map结构的数据结构，key是path，value是对应的组件信息，
function createRouteMap(routes) {
  const pathList = []
  const pathMap = {}

  // 遍历传入的routes数组
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })

  console.log('pathList', pathList)
  console.log('pathMap', pathMap)

  // 将pathList和pathMap返回
  return {
    pathList,
    pathMap
  }
}

class VueRouter {
  constructor(options) {
    this.options = options
    // 默认为mode
    this.mode = options.mode || 'hash'
    // 判断为那种路由模式
    switch (this.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'hisotry':
        // this.history = new HTML5History(this, options.base)
        break
      case 'abstract':
        break
    }
  }
  
  // 初始化
  init(app) {
    console.log('初始化app', app)
    this.history.listen((route) => app._route = route)
    // 初始化时执行一次，保证刷新能渲染
    this.history.transitionTo(window.location.hash.slice(1))
  }

  // 根据hash变化获取对应的所有组件
  createRouteMatcher(location) {
    // 获取pathMap
    const { pathMap } = createRouteMap(this.options.routes)
    const record = pathMap[location]
    const local = { path: location }
    if (record) {
      return createRoute(record, local)
    }
    return createRoute(null, local)
  }
}


// eslint-disable-next-line no-unused-vars
let _Vue
VueRouter.install = (Vue) => {
  _Vue = Vue
  // 使用Vue.mixin混入每一个组件
  Vue.mixin({
    // 在每一个组件的beforeCreate生命周期去执行
    beforeCreate() {
       // 如果是根组件
      if (this.$options.router) {
        // this 是 根组件本身
        this._routerRoot = this
        // this.$options.router就是挂在根组件上的VueRouter实例
        this.$router = this.$options.router
        // 执行VueRouter实例上的init方法，初始化
        this.$router.init(this)
        // 相当于存在_routerRoot上，并且调用Vue的defineReactive方法进行响应式处理
        Vue.util.defineReactive(this, '_route', this.$router.history.current)
      } else {
        // 非根组件，也要把父组件的_routerRoot保存到自身身上
        this._routerRoot = this.$parent && this.$parent._routerRoot
        // 子组件也要挂上$router
        this.router = this._routerRoot.$router
      }
    }
  })

  // 访问$route相当于访问_route
  Object.defineProperty(Vue.prototype, '$route', {
    get() { return this._routerRoot._route }
  })
}

export default VueRouter