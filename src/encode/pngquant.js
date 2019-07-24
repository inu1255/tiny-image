import pngquant_enc from '../codecs/pngquant.js';
import { initWasmModule, url } from './utils.js';

var PngquantModule;
/**
 * @param {ImageData} image 
 * @returns {Promise<ArrayBuffer>}
 */
export function encodePngquant(image, quality) {
	if (!PngquantModule)
		PngquantModule = initWasmModule(pngquant_enc, url.pngquantWasmUrl);
	return PngquantModule.then(function(module) {
		var p = module._create_buffer(image.width, image.height);
		module.HEAP8.set(image.data, p);
		var mininum = Math.floor(Math.max(0, quality - 15));
		var target = Math.floor(quality);
		var size = module._encode(p, image.width, image.height, mininum, target);
		var q = module._get_result_pointer();
		var resultView = new Uint8Array(module.HEAP8.buffer, q, size);
		var result = new Uint8Array(resultView);
		module._destroy_buffer(p);
		return result;
	});
}