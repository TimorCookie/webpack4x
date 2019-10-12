const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'), // 入口文件
    output: {
        filename: 'bundle.js',//打包后输出文件的文件名
        path: path.join(__dirname, '/dist'),//打包后的文件存放的地方
    },
    // devServer: {
    //     contentBase: "./dist", // 本地服务器所加载文件的目录
    //     port: "8088",   // 设置端口号为8088
    //     inline: true, // 文件修改后实时刷新
    //     historyApiFallback: true, //不跳转
    // },
    devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [            
                    {loader: 'style-loader'}, // 这里采用的是对象配置loader的写法
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'} // 使用postcss-loader
                ] 
            },
            {
                test: /\.(scss|.sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']// 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            },
            {
                test: /(\.jsx|\.js)$/,   
                use: {                    // 注意use选择如果有多项配置，可写成这种对象形式
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('timor出品，必属精品!'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.template.html')
        }),
        // new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin() // 热更新插件 
    ]

}