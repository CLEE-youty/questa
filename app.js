const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.get('/' , (req, res) => {
   res.sendFile(__dirname + '/public/index.html')
});

// 静的資材パス指定
app.use(express.static('static'))

io.on('connection', socket => {
  console.log('socket connected');
  // クライアント→サーバーに対してメッセージを送信
  socket.on('message', msg => {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });
});


http.listen(PORT, () => {
  console.log('server listening. Port:' + PORT);
});