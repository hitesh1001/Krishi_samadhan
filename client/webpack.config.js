const path = require('path');

module.exports = {
  // Other webpack configuration options...
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify")
    }
  }
};
