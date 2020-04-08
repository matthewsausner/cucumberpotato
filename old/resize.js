const fs = require('fs')
const sharp = require('sharp')

module.exports = function resize(path, width, height) {
	const readStream = fs.createReadStream(path)
	let transform = sharp()

	transform = transform.resize(width, height)

   return readStream.pipe(transform);
}
