const myLink = {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render(h) {
    // 使用render的h函数渲染
    return h(
      'a',  // 标签名
      // 标签属性
      {
        domProps: {
          href: '#' + this.to,
        },
      },
      [this.$slots.default] // 插槽内容
    )
  }
}

export default myLink