import gifsicle_enc from '../codecs/gifsicle.js';
import { initWasmModule, url } from './utils.js';

var gifsicleModule;
/**
 * @param {ArrayBuffer} data 
 * @returns {Promise<ArrayBuffer>}
 */
export function encodeGif(data, quality) {
	if (!gifsicleModule) gifsicleModule = initWasmModule(gifsicle_enc, url.gifsicleWasmUrl);
	return gifsicleModule.then(function(module) {
		var buf = new Uint8ClampedArray(data);
		var p = module._create_buffer(buf.length);
		module.HEAP8.set(buf, p);
		quality = 200 - Math.floor(quality / 100 * 170);
		var size = module._encode(p, buf.length, quality);
		var q = module._get_result_pointer();
		var resultView = new Uint8Array(module.HEAP8.buffer, q, size);
		var result = new Uint8Array(resultView);
		module._destroy_buffer(p);
		return result;
	});
}