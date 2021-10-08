// 如果浏览器url上没有#，则自动补充/#/
function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}

// function createRoute(record, location) {
//   const res = []
//   if (record) {
//     while (record) {
//       res.unshift(record)
//       record = record.parent
//     }
//   }
//   return {
//     ...location,
//     matched: res
//   }
// }

// 监听浏览器url中hash值的变化，并切换对应的组件
class HashHistory {
  constructor(router) {
    // 保存传入的VueRouter实例
    this.router = router
    // 自动填充/#/
    ensureSlash()
    // 监听hash变化
    this.setupHashListener()

  }

  // 跳转路由触发的函数, 每次hash变化都会触发
  transition(location) {
    console.log('location', location)
  }

  // 监听hash变化
  setupHashListener() {
    window.addEventListener('hashchange', () => {
      // 传入当前url的hash, 并触发跳转
      this.transition(window.location.hash.slice(1))
    })
  }

}

export default HashHistory