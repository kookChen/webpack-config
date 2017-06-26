/*!
 * @ Author CBH (cbhfcly@qq.com)
 * @ Date   2017-06-21
**/

const path = require('path'); // NodeJS中的Path对象，用于处理目录的对象，提高开发效率
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离成独立的css
const uglifyjsPlugin = require('uglifyjs-webpack-plugin'); // 压缩JS
const isProduction = process.env.NODE_ENV === 'production'; // 判断是否生产环境

module.exports = {
    // 入口
    entry: {
        // app: path.join(__dirname, 'src/main.js'),
        app: './src/main.js',
        vue:  ['vue', 'axios']
    },

    // 输出
    output: {
        path: path.join(__dirname, './dist/'), // 打包时会自动生成dist（__dirname 是指你的项目根目录; path.join方法会正确的使用分隔符，在不同系统下正确输出）
        path: path.resolve(__dirname, './dist/'), // path.resolve方法是将相对路径转为绝对路径
        filename: 'js/[name].[chunkhash].js', // 路径相对于output.path
        publicPath: '/' // 设置其它资源的根目录
    },

    // loader加载器配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: "css-loader",
                        options: {
                            minimize: false,
                            // sourceMap: isProduction
                        }
                    }
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        // 'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                // sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: isProduction
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, './node_modules/'),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.vue$/,
                exclude: path.join(__dirname, './node_modules/'),
                loader: 'vue-loader',
                options: {
                    extractCSS: true //（默认值为false） 提取CSS
                }
            }
        ]
    },

    plugins: [
        // 生成html文件
        new htmlWebpackPlugin({
            historyApiFallback: true,
            title: '是title配置项出现的地方啦', // 如果指定了template，这个title的设置就没什么用了
            template:  path.join(__dirname, 'src/index.html'), // 路径是相对于根目录
            filename: 'index.html', // 路径是相对于output.path（在 webpack-dev-server 中，则相对于 WDS 配置的 publicPath）
            inject: 'body', // true:把js插入到body底部  body:同ture的效果一样  head：插件到head标签最后面  false:不插入js，仅生成html
            hash: false, // true：会在插入的css、js最后面加上 ?xxxxxxx，也就是传统的版本号
            // minify: {
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace: true, // 删除空白符与换行符
            //     removeAttributeQuotes: true, // 移除属性的引号
            // },
            chunksSortMode: 'dependency' // 按照不同文件的依赖关系来排序
        }),

        // 提取公共js（是在有多个entry时使用的）
        new webpack.optimize.CommonsChunkPlugin({
            // names: ['vue', 'axios'],
            // filename: ['vue.js', 'axios.js'],
            name: 'vue',
            filename: 'vue.[hash].js',
            minChunks: Infinity  //公共模块最小被引用的次数
        }),

        // 单独使用style标签加载css并设置其路径
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css' // 路径是相对于output.path
        })
    ],

    resolve: {
        extensions: ['.js', '.vue', '.less', '.css', '.scss'], // 设置引入文件时可以省略的后缀
        alias: {
            'src': path.join(__dirname, 'src'),
            'components': path.join(__dirname, 'src/components')
        }
    },

    devtool: isProduction ?  '#source-map' : false, // 生成sourceMap的总开关（如果这里设置为false，即使js、css都设为true也不会生成）

}


if (process.env.NODE_ENV === 'development') {
    module.exports.devServer = {
        port: 333,
        contentBase: './dist',
        publicPath: '/', // 这个设置最好是与output里面的publicPath设置成一样的，不然像图片资源的路径会不对
        // proxy: {
        //     '/api/*': {
        //         target: 'http://new',
        //         pathRewrite: {'^/api' : ''},
        //         changeOrigin: true // 跨区域一定要设置这一条，不然没效果
        //     }
        // }
    }
}


if (isProduction) {
    // module.exports.devtool = '#source-map';

    module.exports.plugins = (module.exports.plugins || []).concat([
        // new uglifyjsPlugin({
        //     beautify: false, // 压缩输出（不美化代码）
        //     comments: false, // 删除所有的注释
        //     compress: {
        //       warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        //       drop_console: true, // 删除所有的 `console` 语句（兼容ie浏览器）
        //       collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        //       reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        //     },
        //     sourceMap: true, // 是否生成sourceMap
        // })

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ])
}
