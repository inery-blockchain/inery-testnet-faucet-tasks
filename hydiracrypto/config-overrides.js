const webpack = require("webpack");
module.exports = function override(config) {
  config.ignoreWarnings = [/Failed to parse source map/];
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    https: require.resolve("https-browserify"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    buffer: require.resolve("buffer"),
    url: require.resolve("url"),
    stream: require.resolve("stream-browserify"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};
