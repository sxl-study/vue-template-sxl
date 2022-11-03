const { resolve }=require("path") ;
const { BundleAnalyzerPlugin } =require("webpack-bundle-analyzer")
const config={
   
    entry:{
        //  方案1   代码抽离
        // index:{
        //     import :resolve(__dirname,"../src/index.js"),  index   引入了lodash
        //     dependOn:"shared"
        // },
        // another:{
        //     import :resolve(__dirname,"../src/another-module.js"),  another-module 引入了lodash
        //     dependOn:"shared"
        // },
        // shared:"lib/lodash"
        index:resolve(__dirname,"../src/index.js"),
        // another:resolve(__dirname,"../src/another-module.js"),
    },
    output:{
        filename:"scripts/[name].js",
        path:resolve(__dirname,"../dist"),
        clean:true, //  清除 打包
        
        // assetModuleFileName:"./images/[name][ext]"
    }
}
const devServer={
    static:"./dist",
    port:3000,
    hot:true,       //  hmr     修改内容后自动切换页面
    liveReload:true,// 热加载   帮助自动加载页面
   //open:true,
    compress:true,// 是否压缩保证服务器到浏览器Content-Encoding:gzip
    headers:{
        "X-Access-Token":"abc123"
    },
    proxy:{
        "/api":{
            target:"http://localhost:8081",
            originPath:true,
            srcure:true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    // https:true

    // historyApiFallback:true
   // host:"0.0.0.0",   // 局域网访问    http://192.168.0.109:3000/
    client:{
        overlay:false
    },
    devMiddleware:{
       writeToDisk:true
    }
}
// const plugins=[
//     new BundleAnalyzerPlugin()
// ]

module.exports={
    mode:"development",
    ...config,
    devtool:"inline-source-map",
    devServer,
    // plugins
}
