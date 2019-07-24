import optipng_enc from '../codecs/optipng.js';
import { initWasmModule, url } from './utils.js';

const DEFAULT_OPTIPNG_OPTIONS = {
	level: 2,
};
var OptiPngModule;
/**
 * @param {ArrayBuffer} data 
 * @param {OptipngOptions} options 
 * @returns {Promise<ArrayBuffer>}
 */
export function encodeOptiPng(data, options) {
	if (!OptiPngModule)
		OptiPngModule = initWasmModule(optipng_enc, url.optipngWasmUrl);
	return OptiPngModule.then(function(module) {
		const resultView = module.compress(data, Object.assign(DEFAULT_OPTIPNG_OPTIONS, options));
		const result = new Uint8Array(resultView);
		module.free_result();
		return result.buffer;
	});
}