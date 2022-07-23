const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const { makeDbConntection } = require("./Sequalize/sequalize");
var cors = require("cors");
const { Server } = require("socket.io");
const { writeMessage } = require("./controller/chat");

const fileupload = require("express-fileupload");
require("dotenv").config();
const port = process.env.PORT || 8080;
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());
app.use("/", routes);

const server = app.listen(port, () => {
  console.log(`Server listening to port localhost:${port}`);
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const reponses = [
  "Hello from Server",
  "Welcome from Server",
  "Sample message from Server",
  "New message from Server",
  "Different message from Server",
  "Thank you from Server",
];
io.on("connection", (socket) => {

    socket.on('join',(data)=>{
        socket.join(data.email)
        writeMessage(data);
        let random = Math.floor(Math.random() * reponses.length);
        io.sockets.in(data?.email).emit('new_msg', {msg: reponses[random]});
    })
});

app.post('/sendto',(req,res)=>{
    try{
        io.sockets.in(req?.body?.email).emit('new_msg', {msg: 'hello'});
    res.status(200).send({status:true});
    }catch(err){
        console.log(err);
        res.status(400).send({status:false});
    }
})

makeDbConntection();
