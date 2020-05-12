const http = require('http');
const fileSystem = require('fs');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const uri = require('./config/keys').mongoURI;
const sharp = require('sharp')
const ss = require('socket.io-stream');
const path = require('path');
const app = express();
const api = express();

api.get('/track', (req, res, err) => {
  // generate file path
  const filePath = path.resolve(__dirname, './private', './track.wav');
  // get file size info
  const stat = fileSystem.statSync(filePath);

  // set response header info
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  });
  //create read stream
  const readStream = fileSystem.createReadStream(filePath);
  // attach this stream with response stream
  readStream.pipe(res);
});

//register api calls
app.use('/api/v1/', api);

// send react app on / GET
app.use(express.static(path.resolve(__dirname, './public/build/')));
app.use(express.static(path.resolve(__dirname, './public/assets/')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/build/', './index.html'));
});

const server = http.createServer(app);
const io = require('socket.io').listen(server, {
  log: false,
  agent: false,
  origins: '*:*',
  transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

io.on('connection', client => {

  const stream = ss.createStream();

  client.on('track', () => {
    const filePath = path.resolve(__dirname, './private', './track.wav');
    const stat = fileSystem.statSync(filePath);
    const readStream = fileSystem.createReadStream(filePath);
    // pipe stream with response stream
    readStream.pipe(stream);

    ss(client).emit('track-stream', stream, { stat });
  });

  client.on('image', () => {
    const filePath = path.resolve(__dirname, './private', './image.jpg');
    const stat = fileSystem.statSync(filePath);
    const readStream = fileSystem.createReadStream(filePath);
    let transform = sharp();
    transform = transform.resize(400, 400);
    readStream.pipe(transform);
    // pipe stream with response stream
    readStream.pipe(stream);
    ss(client).emit('image-stream', stream, { stat });
  });

  client.on('disconnect', () => {});
});

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log('MongoDB Connected');
//   })
//   .catch(err => {
//     console.log(err);
//     console.log('\x1b[31m\x1b[1m MongoDB Not Connected');
//   });

// const db = mongoose.connection;
// // define Schema
// var EmailSchema = mongoose.Schema({
//   text: String
// });

// compile schema to model
// var Email = mongoose.model('Email', EmailSchema, 'emails');

// db.on('error', console.error.bind(console, 'connection error:'));

// app.post('/email', (req, res, err) => {

//     var email1 = new Email({ text: 'test@email.com' });
//     // save model to database
//     email1.save(function (err, email) {
//       if (err) return console.error(err);
//       console.log(email.text + " saved lil bitch");
//     });
//     // a document instance
// });

server.listen(process.env.PORT || '3001', function () {
  console.log('Server app listening on port 3000');
});
