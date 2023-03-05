express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;
const path = require("path");

app.use("/static", express.static("static"));  // for serving static files.. /static is url  ...."static" is folder name
app.use(express.urlencoded());

users = {};
app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "views/first.html"));
  
});
// let name;
app.post('/', (req, res) => {
  console.log("A user enetered....post request received");
  name = req.body.name;
  console.log("User name is :"+name)
  // req.url = '/chat-window';
  // next();
  setTimeout(()=>{
    res.sendFile((__dirname) + "/views/index.html");

  },1000)
});

users ={};
io.on('connection',(socket) => {
  console.log("A user connected");
  socket.on('user-joined',(nameofuser)=>{
    users[socket.id] = nameofuser;
    socket.broadcast.emit('new-user-joined',nameofuser);
    console.log("A user joined connection received");
    console.log("socket id:"+socket.id);
  })

  socket.on('receive-msg',(message)=>{
    console.log("A message is send by"+users[socket.id]);
    socket.broadcast.emit('send-this-msg',users[socket.id],message);
  })
})


server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});




