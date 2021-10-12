// 给文件夹路径起别名，这样引用的时候就可以方便点
module.exports={
  configureWebpack:{
    resolve:{
      alias: {
        // 这里的@其实就是src文件夹路径的别名，cli2里不能直接@加下级路径，但是cli3可以
        "assets":"@/assets",
        "common":"@/common",
        "components":"@/components",
        "network":"@/network",
        "views":"@/views",
      }
    }
  }
}