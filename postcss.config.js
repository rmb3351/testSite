// 这是postcss-px-to-viewport的配置文件，用来对css类文件进行修改，把px单位修改为vw，做不同屏幕适配
module.exports = {
  plugins: {
    autoprefixer: {},
	  "postcss-px-to-viewport": {
			// 这设计稿的宽高都是以ip6为基准的
		  viewportWidth: 375,  // 视窗的宽度，对应的是我们设计稿的宽度.
		  viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度.(也可以不配置)
		  unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
		  viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
		  selectorBlackList: ['ignore', 'tab-bar'], // 指定不需要转换的类
		  minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
		  mediaQuery: false, // 允许在媒体查询中转换`px`
			exclude:[/TabBar/] //使用正则匹配（这里指带TabBar的文件名）来匹配文件，对应文件不适用适配
	  },
  }
}
