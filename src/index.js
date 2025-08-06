import MyButton from './components/Button/Button.vue'
import MyHeader from './components/Header/Header.vue'

// 组件注册列表
const components = [MyButton, MyHeader]

// 用于跟踪安装状态的 Symbol
const INSTALLED_KEY = Symbol('ComponentLibraryInstalled')

// 安装函数，用于全局注册所有组件
const install = (app) => {
  // 检查是否已在该应用实例上安装
  if (app.config.globalProperties[INSTALLED_KEY]) {
    return
  }

  // 标记为已安装
  app.config.globalProperties[INSTALLED_KEY] = true

  // 验证 Vue 实例是否存在
  if (!app) {
    throw new Error('需要 Vue 实例来注册组件')
  }

  // 跟踪已注册组件，防止重复注册
  const registeredComponents = new Set()

  components.forEach((component) => {
    // 跳过没有 name 属性的组件
    if (!component?.name) {
      return
    }

    // 跳过已注册的组件
    if (registeredComponents.has(component.name)) {
      return
    }

    // 注册组件
    app.component(component.name, component)
    registeredComponents.add(component.name)
  })
}

// 自动注册逻辑：支持 CDN 环境或按需引入
const autoInstall = (Vue) => {
  if (Vue && !Vue[INSTALLED_KEY]) {
    components.forEach((component) => {
      if (component.install) {
        component.install(Vue)
      }
    })
    Vue[INSTALLED_KEY] = true
  }
}

// CDN 使用时的自动注册
if (typeof window !== 'undefined' && window.Vue) {
  autoInstall(window.Vue)
}

// 默认导出，支持 app.use(Library) 全局注册
export default {
  install
}

// 命名导出，支持按需引入单个组件
export { MyButton, MyHeader }
