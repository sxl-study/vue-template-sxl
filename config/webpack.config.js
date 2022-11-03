const {merge }=require("webpack-merge");
const dev=require("./webpack.dev");
const prod=require("./webpack.prod");
const commonConfig=require("./webpack.common");
module.exports=(env)=>{

    switch(true){
        case env.development:
            return merge(commonConfig,dev)
        case env.production:
            return merge(commonConfig,prod)
        default:
            return new Error("没有配置到环境")
    }
}