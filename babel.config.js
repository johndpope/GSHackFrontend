module.exports = {
  "presets": [
    [
      "@vue/app",
      {
        "useBuiltIns": "entry"
      }
    ]
  ],
  "plugins": [
    ["component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    "syntax-dynamic-import"
  ]
}
