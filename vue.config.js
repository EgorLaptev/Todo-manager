module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Manage Todo',
    },
  },
  pwa: {
    name: 'Todo manager',
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
        display: 'standalone',
        background_color: '#FFFFFF'
    }
  },
  devServer: {
    proxy: 'https://my.todos.gq'
  },
  outputDir: '../../../public/assets/app',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/assets/app/'
    : '/',
  indexPath: process.env.NODE_ENV === 'production'
    ? '../../views/app.blade.php'
    : 'index.html'
}
