const itiny = require("./dist/itiny.node.js");
const path = require("path");
const fs = require("fs");

itiny.url.gifsicleWasmUrl = __dirname + "/dist/gifsicle.wasm";
itiny.url.mozjpegWasmUrl = __dirname + "/dist/mozjpeg.wasm";
itiny.url.optipngWasmUrl = __dirname + "/dist/optipng.wasm";
itiny.url.pngquantWasmUrl = __dirname + "/dist/pngquant.wasm";
itiny.encodeFile = function(filename, ext, quality) {
	ext = ext || path.extname(filename);
	if (ext == "gif")
		return new Promise(function(resolve, reject) {
			fs.readFile(filename, function(err, data) {
				if (err) return reject(err);
				resolve(itiny.encode(data, ext, quality));
			});
		});
	return Promise.reject('not support type, you should shim ImageData');
};
module.exports = itiny;