class VueRouter {
  constructor(options) {
    console.log('options', options)
  }
  init(app) {
    console.log('app', app)
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
      // 非根组件，也要把父组件的_routerRoot保存到自身身上
      } else {
        // 非根组件，也要把父组件的_routerRoot保存到自身身上
        this._routerRoot = this.$parent && this.$parent._routerRoot
        // 子组件也要挂上$router
        this.router = this._routerRoot.$router
      }
    }
  })
}