require("dotenv").config();
import cors from "cors";
import routes from "./routes";

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT;
const Utils = require("./util/Mongouplod");
const DB = require("./config/config");


// const crypto = require("crypto");
// const randomId = () => crypto.randomBytes(8).toString("hex");

// const { InMemorySessionStore } = require("./util/sessionStore");
// const sessionStore = new InMemorySessionStore();

// const { InMemoryMessageStore } = require("./util/messageStore");
// const messageStore = new InMemoryMessageStore();

// middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//API
app.use("/", routes.chat);
app.use("/login", routes.login);
// app.use('/',auth,routes.chat(io))

//Mongo Connection Establish
DB.connectToDB();

//dummy Data
let usr1 = 121, usr2 = 212, prefix = 7757;

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on('chat message', async (msg) => {
    console.log(`message ${socket.id}: ` + msg);
    Utils.MongoUp(prefix, msg, usr1, usr2)
    io.emit('new message', {
      message: `"${socket.id}" ==>>> ` + msg
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} user disconnected`);
  });
});

//latest io code here to server

// io.use((socket, next) => {
//     next();
// });


// io.on("connection", async (socket) => {

//     console.log(`a user connected below: ${socket.id}`);

//     //Adding Connected users to the db
//     await Utils.UserDetails(socket.handshake.auth, socket.id, "adduser");

//     // One-to-One Chat

//     socket.on("privateMessage", async (data) => { 
//         console.log("data :", data);
//         const { userId, message } = data;
//         await Utils.MongoUp(userId.prefix, message, userId.senderId, userId.receiverId);
//         await Utils.UserDetails(userId, socket.id, "adduser");
//         console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++');
//         let recid = await Utils.UserDetails(userId,null, "findSocket");
//         const recipientSocket = io.sockets.sockets.get(recid);
//         if (recipientSocket) {
//             recipientSocket.emit("receivedPrivateMessage", {
//                 message: `"${socket.id}" ==>>> ` + message,
//             });
//         }
//         // socket.to(recipientSocket).to(socket.userID).emit("privateMessage", {
//         //     message: `"${socket.id}" ==>>> ` + message
//         // });
//     });

//     // Group Chat
//     socket.on("joinGroup", (groupName) => {
//         socket.join(groupName);
//         console.log(`User ${socket.id} joined the group: ${groupName}`);
//     });

//     socket.on("groupMessage", (data) => {
//         const { groupName, message } = data;
//         io.to(groupName).emit("receivedGroupMessage", {
//             senderId: socket.id,
//             message: message,
//         });
//     });

//     //Disconnect
//     socket.on("disconnect", async () => {
//         await Utils.UserDetails(null, socket.id);
//         console.log(`${socket.id} user disconnected`);
//     });
// });

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

//code getting typing........
// socket.on('typing', (data) => {
//   console.log(`Client ${socket.id} is typing...`);
//   io.emit('isTyping', {
//     message: `"${socket.id}" ==>>> is typing... `
//   });
//   // Emit a "stopTyping" event after a short delay to indicate that the user has stopped typing
//   setTimeout(() => {
//     socket.emit('stopTyping', { message: '' });
//   }, 2000);
// });

// io.on('connection', (socket) => {
//   console.log(`a user connected: ${socket.id}`);

//   // One-to-One Chat
//   socket.on('privateMessage', (data) => {
//     const { recipientId, message } = data;
//     const recipientSocket = io.sockets.sockets.get(recipientId);
//     if (recipientSocket) {
//       recipientSocket.emit('receivedPrivateMessage', {
//         senderId: socket.id,
//         message: message
//       });
//     }
//   });

//   // Group Chat
//   socket.on('joinGroup', (groupName) => {
//     socket.join(groupName);
//     console.log(`User ${socket.id} joined the group: ${groupName}`);
//   });

//   socket.on('groupMessage', (data) => {
//     const { groupName, message } = data;
//     io.to(groupName).emit('receivedGroupMessage', {
//       senderId: socket.id,
//       message: message
//     });
//   });

//   //Disconnect
//   socket.on('disconnect', () => {
//     console.log(`${socket.id} user disconnected`);
//   });
// });
