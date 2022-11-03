const { resolve } = require("path");
const HtmlWbpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const WorkBoxPlugin=require("workbox-webpack-plugin");
const webpack=require("webpack");
const yaml = require("yaml");
const json5 = require("json5");
const toml = require("toml");
console.log("地址",require.resolve("../src/index.js"));


// webpack 内置的模块联邦
const { ModuleFederationPlugin }=require("webpack").container

const ForksTsCheckerWebpackerPlugin=require("fork-ts-checker-webpack-plugin")


const config = {
  entry: resolve(__dirname, "../src/main.js")
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
  
    // another:resolve(__dirname,"../src/another-module.js"),
,
  // experiments:{
  //     outputModule:true
  // },
  output: {
    filename: "scripts/[name].js",
    path: resolve(__dirname, "../dist"),
    clean: true, //  清除 打包
    // library:{
    //   name:"mylib",
    //   type:"umd" //umd适应所有的  window   commonjs  module 这时候就不需要name属性
    // },
    //globalObject:"globalThis",// 全局的this
    // assetModuleFileName:"./images/[name][ext]"
  },
};
const plugins = [
  new HtmlWbpackPlugin({
    filename: "index.html",
    template: resolve(__dirname, "../index.html"),
  
    inject: "body", // script   js 位置   body\
    title: "webpack 5",

  }),
  new MiniCssExtractPlugin({
    filename: "css/[name][contenthash:5].css",
  }),
  new CleanWebpackPlugin(),
  // new WorkBoxPlugin.GenerateSW({
  //     clientsClaim:true,  // 快速启用serverwork
  //     skipWaiting:true,    // 不允许使用旧的severwork
  // }),
  // new webpack.ProvidePlugin({
  //   _:"lodash"
  // }),


  // new ModuleFederationPlugin({
  //     name:"nav",
  //     filename:"remoteEntry.js",
  //     remotes:{
  //       nav:"nav@http://localhost:3003/re,oteEntry.js"
  //     },
  //     exposes:{
  //       "./Header":"../src/page/home.js"
  //     },
  //     shared:{}
  // }),
  // new ForksTsCheckerWebpackerPlugin()
];

const moduleRule = {
  rules: [
    {
      test: /\.(png|jfif)$/,
      type: "asset/resource",
      generator: {
        filename: "images/[name][ext]",
      },
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024 * 1024,
        },
      },
    },
    {
      test: /\.(css|less)$/,
      use: [MiniCssExtractPlugin.loader,{
        loader:"css-loader",
        options:{
            modules:true
        }
      }, "less-loader","postcss-loader"],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
      type: "asset/resource",
      generator: {
        filename: "iconfont/[name][ext]",
      },
      // use: [
      //   {
      //     loader: 'file-loader',
      //     options: {
      //         //配置字体文件输出路径，已经文件命名规则
      //         name:'iconfont/[name].[ext]'
      //     },
      //   },
      // ],
    },
    {
      test: /\.(csv|tsv)$/,
      use: "csv-loader",
    },
    {
      test: /\.xml$/,
      use: "xml-loader",
    },
    {
      test: /\.toml$/,
      type: "json",
      parser: {
        parse: toml.parse,
      },
    },
    {
      test: /\.yaml$/,
      type: "json",
      parser: {
        parse: yaml.parse,
      },
    },
    {
      test: /\.json5$/,
      type: "json",
      parser: {
        parse: json5.parse,
      },
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: { version: 3 },
                  targets: {
                    chrome: "58",
                    ie: "7",
                  },
                },
              ],
            ],
            plugins: [["@babel/plugin-transform-runtime"]],
          },
        },
        // {
        //   loader:"thread-loader",// 打一些非常耗时的包    自身启动要耗时
        //   options:{
        //     workers:2
        //   }
        // }
      ],
    },
    {
      test:/\.ts$/,
      exclude:/node_modules/,
      use:[{loader:"ts-loader",options:{transpileOnl:true}}]// 缩短使用ts-loader时的构建时间  此选项会关闭类型检查   ForkTsCheckerWebpackPlugin   此插件会移至单独进行   加快ts类型检查和eslint插入速度
    },
    // {
    //   test:require.resolve("../src/index.js"),
    //   use:"imports-loader?wrapper=window"
    // }
    // {
    //   test:require.resolve("../src/global.js"),
    //   use:"exports-loader?type=commonjs&exports=file"
    //   }
  ],
};
// 优化
const optimization = {
  //usedExports:true,// tree-shaking
  splitChunks: {
    //chunks:"all" //  js 代码抽离  共用js代码
    // cacheGroups: {
    //   vendor: {
    //     test: /[\\/]node_modules[\\/]/,
    //     name: "vendors",
    //     chunks: "all",
    //   },
    // },
  },
};

module.exports = {
  ...config,
  plugins,
  module: moduleRule,
  // 第三方库
  // externalsType: "script",
  // externals: {
  //   jquery: ["地址", "$"],
  // },
  resolve:{
    extensions:[".ts",".js"]
  }
};
