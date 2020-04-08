const express = require('express')
const resize = require('./resize')

const server = express()

const port = process.env.PORT || 3000

server.get('/', (req, res) => {

    res.type('image/jpg')
	resize('girtv1.jpg',  500, 500).pipe(res)
})

server.listen(port, () => {
	console.log('server started')
})
