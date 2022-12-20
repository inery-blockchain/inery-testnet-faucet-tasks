Add this dependencies in `package.json`
```json
"dependencies":{
    "browser-fs-access": "^0.31.0",
    "browserify": "^17.0.0",
    "buffer": "^6.0.3",
    "crypto-browserify": "^3.12.0",
    "node-util": "^0.0.1",
    "stream-http": "^3.2.0",
    "url": "^0.11.0",
    "https-browserify": "^1.0.0",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "node-polyfill-webpack-plugin": "^2.0.1"
}
```
Paste this code in `vue.config.js`
```js
const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    plugins:[
      new NodePolyfillPlugin()
    ]
  }
})
```