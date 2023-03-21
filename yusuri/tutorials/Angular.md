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
    "webpack-cli": "^4.10.0"
}
```
Add this in `tsconfig.json`
```json
{  
"compilerOptions":{
    "paths":{
        "https":["none_modules/https-browserify"],
        "http":["node_modules/stream-http"],
        "util":["node_modules/node-util"],
        "fs":["node_modules/browser-fs-access"],
        "stream":["node_modules/stream-browserify"],
        "url":["node_modules/url"],
        "crypto":["node_modules/crypto-browserify"],
        "buffer":["node_modules/buffer"]
        }
    }
}
```
Add this in `polyfills.ts`
```js
(window as any)['global'] = window;
(window as any).process={cwd:()=>"/"};
```
