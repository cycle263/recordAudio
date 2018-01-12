export default {
  entry : 'src/index.js',
  outputPath : `./dist/`,
  env : {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        [
          "import", {
            "libraryName": "antd",
            "style": "css"
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        [
          "import", {
            "libraryName": "antd",
            "style": "css"
          }
        ]
      ]
    }
  }
}
