module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8888,
    proxy: 'http://localhost:4000'
  }
}
