import gifsicleWasmUrl from '../codecs/gifsicle.wasm';
import mozjpegWasmUrl from '../codecs/mozjpeg_enc.wasm';
import optipngWasmUrl from '../codecs/optipng.wasm';
import pngquantWasmUrl from '../codecs/pngquant.wasm';

export const url = { gifsicleWasmUrl, mozjpegWasmUrl, optipngWasmUrl, pngquantWasmUrl };

/**
 * @param {ModuleFactory<EmscriptenWasm.Module>} moduleFactory 
 * @param {string} wasmUrl 
 * @returns {Promise}
 */
export function initWasmModule(moduleFactory, wasmUrl) {
	return new Promise((resolve) => {
		const module = moduleFactory({
			noInitialRun: true,
			locateFile(url) {
				if (url.endsWith('.wasm')) return wasmUrl;
				return url;
			},
			onRuntimeInitialized() {
				delete module.then;
				resolve(module);
			},
		});
	});
}