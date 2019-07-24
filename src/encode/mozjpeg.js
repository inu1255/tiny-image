import mozjpeg_enc from '../codecs/mozjpeg_enc.js';
import { initWasmModule, url } from './utils.js';

export const DEFAULT_MOZJPEG_OPTIONS = {
	quality: 75,
	baseline: false,
	arithmetic: false,
	progressive: true,
	optimize_coding: true,
	smoothing: 0,
	color_space: 3,
	quant_table: 3,
	trellis_multipass: false,
	trellis_opt_zero: false,
	trellis_opt_table: false,
	trellis_loops: 1,
	auto_subsample: true,
	chroma_subsample: 2,
	separate_chroma_quality: false,
	chroma_quality: 75,
};
var mozjpegModule;
/**
 * 
 * @param {ImageData} data 
 * @param {MozjpegOptions} options 
 * @returns {Promise<ArrayBuffer>}
 */
export function encodeJpg(data, options) {
	if (!mozjpegModule)
		mozjpegModule = initWasmModule(mozjpeg_enc, url.mozjpegWasmUrl);
	return mozjpegModule.then(function(module) {
		const resultView = module.encode(data.data, data.width, data.height, Object.assign(DEFAULT_MOZJPEG_OPTIONS, options));
		const result = new Uint8Array(resultView);
		module.free_result();
		return result.buffer;
	});
}