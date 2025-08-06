import MyButton from './components/Button/Button.vue'
import MyHeader from './components/Header/Header.vue'

// 组件列表
const components = [MyButton, MyHeader]

// 安装函数，用于全局组件注册
const install = (app) => {
  console.log(
    '[组件库] 开始执行 install 函数，注册组件：',
    components.map((c) => c.name)
  )
  if (!app) {
    console.warn('[组件库] 未提供 Vue 实例，无法注册组件')
    return
  }

  components.forEach((component) => {
    if (component?.name) {
      app.component(component.name, component)
      console.log(`[组件库] 正在注册组件：${component.name}`)
    } else {
      console.warn(`[组件库] 组件注册跳过：组件缺少 name 属性`)
    }
  })
}

// 自动安装，适用于 CDN 使用
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 默认导出，支持完整引入和按需引入
export default {
  install,
  MyButton,
  MyHeader
}
