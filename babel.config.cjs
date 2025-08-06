module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '16',
          browsers: ['> 1%', 'last 2 versions', 'not dead']
        },
        modules: false // 让 Rollup 处理模块
      }
    ]
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
}
