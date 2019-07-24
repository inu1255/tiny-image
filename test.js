const itiny = require("./index.js");
const fs = require("fs");

async function main() {
	console.time('gif');
	let buf = await itiny.encodeFile('_1.gif', 'gif', 75);
	fs.writeFileSync('_2.gif', buf);
	console.timeEnd('gif', buf.length);
}

main();