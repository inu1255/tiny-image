var box = document.querySelector('.box');
box.addEventListener('dragover', function(e) {
	box.style.borderColor = 'blue';
	e.preventDefault();
});

box.addEventListener('dragleave', function(e) {
	box.style.borderColor = '#ccc';
});

box.addEventListener('drop', function(e) {
	encode(e.dataTransfer.files[0]);
	e.preventDefault();
});

box.addEventListener('click', function(e) {
	pick('image').then(encode);
});


/**
 * 获取文件
 * @param {string} [accept] 'image/png'
 * @param {boolean} [multiple] 
 * @returns {Promise<File|FileList>}
 */
function pick(accept, multiple) {
	return new Promise(function(resolve, reject) {
		var input = document.createElement('input');
		input.type = 'file';
		input.multiple = multiple;
		input.accept = accept == "image" ? 'image/png|image/jpeg|image/gif' : accept;
		input.onchange = function(e) {
			resolve(multiple ? e.target.files : e.target.files[0]);
		};
		input.click();
	});
};

/**
 * @param {string} filename 
 */
function extname(filename) {
	var type = filename.split('.');
	return type[type.length - 1];
}

/**
 * 保存文件
 * @param {string|Blob} txt
 * @param {string} [name]
 */
function download(txt, name) {
	if (/^(blob|https?):/.test(txt)) {
		var a = document.createElement('a');
		a.href = txt;
		a.download = name || '未命名.txt';
		a.click();
		return;
	}
	if (txt == "[object Blob]")
		return download(URL.createObjectURL(txt), name);
	return download(new Blob([txt]), name);
};

function encode(file) {
	if (!file) return;
	var quality = 75;
	return itiny.encode(file, extname(file.name), quality).then(function(buf) {
		return download(new Blob([buf]), file.name);
	});
}