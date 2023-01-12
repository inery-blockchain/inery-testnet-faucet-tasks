Paste this in `package.json` file
```json
"scripts":{
    "start":"react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
}
```
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
    "react-app-rewired": "^2.2.1",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
}
``` 
In root project directory make file `config-overrides.js` and paste this code
```js
const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
            https:require.resolve("https-browserify"),
            util:require.resolve("node-util"),
            crypto: require.resolve("crypto-browserify"),
            http: require.resolve("stream-http"),
            buffer: require.resolve("buffer"),
            url:require.resolve("url"),
            fs:require.resolve("browser-fs-access"),
            stream:require.resolve("stream-browserify")
    });
    config.resolve.fallback = fallback; 
    config.plugins = (config.plugins || []).concat([ 
        new webpack.ProvidePlugin({ 
         process: 'process/browser', 
       Buffer: ['buffer', 'Buffer'] 
     }) 
    ]) 
    return config; }
```
