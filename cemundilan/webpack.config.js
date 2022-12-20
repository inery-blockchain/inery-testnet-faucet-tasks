const path=require("path");
module.exports={
    mode:"production",
    entry: {
        ineryjs_api: './dist/ineryjs-api.js',
        ineryjs_jsonrpc: './dist/rpc-web.js',
        ineryjs_jssig: './dist/ineryjs-jssig.js',
        ineryjs_rpcerror: './dist/ineryjs-rpcerror.js'
    },
    output: {
        filename: x => x.chunk.name.replace('_', '-') + '.min.js',
        library: '[name]',
        path: path.resolve(__dirname, 'dist-web'),
    },
    resolve:{
        extensions: ['.js'],
        fallback:{
            https:require.resolve("https-browserify"),
            util:require.resolve("node-util"),
            crypto: require.resolve("crypto-browserify"),
            http: require.resolve("stream-http"),
            buffer: require.resolve("buffer"),
            url:require.resolve("url"),
            fs:require.resolve("browser-fs-access"),
            stream:require.resolve("stream-browserify")
        }
    } 
}