module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Manage Todo',
    },
  },
  pwa: {
    name: 'Todo manager',
    themeColor: '#8ACAFE',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

  manifestOptions: {
      display: 'standalone',
      background_color: '#8ACAFE'
  }

  }
}
