const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = [merge(common, {
	mode: 'production',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].min.js',
		library: '[name]',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	optimization: {
		minimize: true
	}
}), merge(common, {
	mode: 'production',
	target: "node",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].node.js',
		library: '[name]',
		libraryTarget: 'commonjs-module',
		umdNamedDefine: true
	}
})];