import { defineConfig } from 'rollup'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import filesize from 'rollup-plugin-filesize'
import { fileURLToPath } from 'url'
import path from 'path'

// 在 ES 模块中获取 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  // 入口文件 - 组件库的主入口
  input: 'src/index.js', // 你可能需要创建这个文件

  // 外部依赖，不打包到最终文件中
  external: ['vue', 'pinia'],

  output: [
    // ES Module 格式 (现代打包工具使用)
    {
      file: 'dist/justui.esm.js',
      format: 'esm',
      sourcemap: !isProduction
    },
    // CommonJS 格式 (Node.js 环境使用)
    {
      file: 'dist/justui.cjs.js',
      format: 'cjs',
      sourcemap: !isProduction,
      exports: 'named'
    },
    // UMD 格式 (浏览器直接使用)
    {
      file: 'dist/justui.umd.js',
      format: 'umd',
      name: 'justui',
      sourcemap: !isProduction,
      globals: {
        vue: 'Vue',
        pinia: 'Pinia'
      }
    }
  ],

  plugins: [
    // 路径別名
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    }),

    // Vue 单文件组件支持
    vue({
      target: 'browser',
      preprocessStyles: true,
      css: false // 不内联 CSS，让 postcss 处理
    }),

    // 解析第三方模块
    resolve({
      browser: true,
      preferBuiltins: false
    }),

    // CommonJS 转换
    commonjs(),

    // CSS 处理
    postcss({
      extract: 'style.css', // 提取 CSS 到单独文件
      minimize: isProduction,
      plugins: [
        // 你已经安装了 autoprefixer
        (await import('autoprefixer')).default()
      ]
    }),

    // 生产环境代码压缩
    isProduction &&
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      }),

    // 显示打包文件大小
    filesize()
  ].filter(Boolean),

  // 监听模式配置
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
})
