const { resolve }=require("path") ;
const CssMinimizerWebpackPlugin=require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin=require("terser-webpack-plugin");

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
        filename:"scripts/[name][contenthash:5].js",
        path:resolve(__dirname,"../dist"),
        clean:true, //  清除 打包
        publicPath:"http://127.0.0.1:8080/dist/"
        // assetModuleFileName:"./images/[name][ext]"
    }
}
// 优化
const optimization={
    minimizer:[
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin()
    ],
}
// 性能配置
const  performance={
    hints:false
}
module.exports={
        mode:"production",
        ...config,
        optimization,
        performance
    
}
