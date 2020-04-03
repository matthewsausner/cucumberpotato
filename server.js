const express = require('express')
const resize = require('./resize')

const server = express()

const port = process.env.PORT || 3000

server.get('/', (req, res) => {


	const widthString = 700
	const heightString = 700

	const format = req.query.format

	let width, height
	if (widthString) {
	  width = parseInt(widthString)
	}
	if (heightString) {
	  height = parseInt(heightString)
	}

    res.type('image/jpg')
	resize('girtv1.jpg', format, width, height).pipe(res)
})

server.listen(port, () => {
	console.log('server started')
})
