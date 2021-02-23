module.exports = {
    devServer: {
      disableHostCheck: true,
      public: 'alita-tweetstorm.org',
      proxy: 'http://localhost:3080'
    }
  }
