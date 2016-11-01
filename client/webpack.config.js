const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'dist')

const config = {
	debug: true,
	devServer: {
		stats: {
			colors: true
		},
		publicPath: '/dist' //模板、样式、脚本、图片等资源对应server上的路径
	},
	entry: {
		index: [path.resolve(SRC_PATH, 'index')]
	},
	output: {
		path: DIST_PATH, //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
		publicPath: './', //模板、样式、脚本、图片等资源对应的的路径
		filename: 'js/[name].js' //每个页面对应的主js的生成配置
			// chunkFilename: 'js/[id].chunk.js' //chunk生成的配置
	},
	resolve: {
		alias: {
			src: SRC_PATH,
			vue: 'vue/dist/vue.js',
			assets: path.resolve(SRC_PATH, 'css')
		},
		extensions: ['', '.js', '.vue']
	},
	vue : {
		loaders: {
			scss: ExtractTextPlugin.extract('vue-style-loader', 'css!sass')//'vue-style-loader!css!sass'
		}
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.s?css$/,
			loader: ExtractTextPlugin.extract('vue-style-loader', 'css!sass')//'vue-style-loader!css!sass'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(jpg|png)$/,
			loader: 'url?name=images/[name].[ext]&limit=51200'
		}, {
			test: /\.(eot|svg|ttf|woff(2)?)(\?[a-z0-9=\.]+)?$/,
			loader: 'url?name=fonts/[name].[ext]&limit=1000'
		}]
	},
	postcss: [autoprefixer({ browsers: ['> 1%', 'last 2 versions'] })],
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('lib', 'js/lib.js'),
		new ExtractTextPlugin('[name].css', {
			allChunks: false
		})
	]
}

//多文件入口，html模版生成
for (const name in config.entry) {
	if (name !== 'lib') {
		config.plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
			// favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
			title: name,
			chunks: ['lib', name], //需要引入的chunk，不配置就会引入所有页面的资源
			filename: './' + name + '.html', //生成的html存放路径，相对于path
			template: path.resolve(SRC_PATH, 'template/template.html'), //html模板路径
			inject: 'body', //js插入的位置，true/'head'/'body'/false
			hash: true, //为静态资源生成hash值
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			}
		}))
	}
}


if (process.env.NODE_ENV === 'development') {
	for (const name in config.entry) {
		if (name !== 'lib') {
			config.entry[name].unshift('webpack/hot/only-dev-server')
			config.entry[name].unshift('webpack-dev-server/client?http://localhost:3000')
		}
	}
	config.plugins.unshift(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development')
	}))
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
	config.devtool = 'source-map'
}


if (process.env.NODE_ENV === 'production') {
	config.plugins.unshift(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}))
	config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
		// except: ['exports', 'require', '*'] //排除关键字
	}))
}

module.exports = config
