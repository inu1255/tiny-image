const path = require('path');

module.exports = {
	entry: {
		itiny: './src/index.js',
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [{
				test: /\.(bmp|gif|jpe?g|png)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			{
				test: /\/codecs\/.*\.js$/,
				loader: 'exports-loader'
			},
			{
				test: /\/codecs\/.*\.wasm$/,
				type: 'javascript/auto',
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, 'node_modules').concat([/\/codecs\//]),
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: [
						["@babel/preset-env", {
							"targets": {
								"browsers": "> 5%"
							}
						}]
					],
					plugins: ['@babel/plugin-proposal-class-properties']
				},
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader',
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!postcss-loader!less-loader',
			},
		],
	}
};