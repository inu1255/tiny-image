import { encodeGif } from "./encode/gifsicle";
import { encodePngquant } from "./encode/pngquant";
import { encodeJpg } from "./encode/mozjpeg";
export { url } from "./encode/utils";

/**
 * @param {HTMLImageElement} img 
 */
export function readImageData(img) {
	var canvas = document.createElement('canvas');
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * 从URL中加载图片
 * @param {string} url 
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(url) {
	return new Promise(function(resolve, reject) {
		var img = document.createElement('img');
		img.src = url;
		img.onload = resolve.bind(this, img);
		img.onerror = reject;
	});
}

/**
 * 读取文件
 * @param {File} file
 * @param {"ArrayBuffer"|"Binary​String"|"DataURL"|"base64"|"utf8"} [encoding]
 */
export function readFile(file, encoding) {
	return new Promise(function(resolve, reject) {
		var reader = new FileReader();
		if (encoding && reader['readAs' + encoding])
			reader['readAs' + encoding](file);
		else
			reader.readAsText(file, encoding);
		reader.onload = function(e) {
			resolve(e.target.result);
		};
		reader.onerror = reject;
	});
};

/**
 * @param {File} file 
 * @param {'png'|'jpg'|'jpeg'|'gif'} type
 * @param {number} quality
 */
export function encode(file, type, quality) {
	if (quality == null) quality = 80;
	else quality = Math.floor(quality);
	if (file == "[object File]") {
		if (type === "gif")
			return readFile(file, 'ArrayBuffer').then(function(buf) {
				return encodeGif(buf, quality);
			});
		// if (type === "png")
		// 	return readFile(file, 'ArrayBuffer').then(encodeOptiPng).then(function(buf) {
		// 		return new Fileish([buf], file.name, { type });
		// 	});
		if (type === "png")
			return loadImage(URL.createObjectURL(file)).then(readImageData).then(function(image) {
				return encodePngquant(image, quality);
			});
		if (type === "jpg" || type === "jpeg")
			return loadImage(URL.createObjectURL(file)).then(readImageData).then(function(image) {
				return encodeJpg(image, { quality });
			});
		return Promise.reject('file type not support');
	}
	if (type === "gif")
		return encodeGif(file, quality);
	if (type === "png")
		return encodePngquant(file, quality);
	if (type === "jpg" || type === "jpeg")
		return encodeJpg(file, { quality });
	return Promise.reject('file type not support');
}