const express = require('express')
const resize = require('./resize')

const server = express()
const port = process.env.PORT || 3000;

server.get('/', (req, res) => {

	const widthString = req.query.width
	const heightString = req.query.height
	const format = req.query.format

	let width, height
	if (widthString) {
	  width = parseInt(widthString)
	}
	if (heightString) {
	  height = parseInt(heightString)
	}

    res.type('image/jpg')
	resize('rtj.jpg', format, width, height).pipe(res)
})

server.listen(port, () => {
	console.log('server started')
})