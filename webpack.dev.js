const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
	// 启用相应模式（development,production）下的webpack内置的优化
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		library: '[name]',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	devServer: {
		port: 9000,
		inline: true,
		hot: true,
		open: true,
		contentBase: 'example',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'example/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
});