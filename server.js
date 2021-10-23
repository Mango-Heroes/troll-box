const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const cors = require('cors');

const utils = require("./app/utils");
const User = require("./model/user");
const Message = require("./model/message");

require('dotenv').config();
const app = express();
const sessionMiddleware = session({
  secret: process.env.SECRET_KEY,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
  resave: true,
  saveUninitialized: false,
});
app.use(sessionMiddleware);
app.use(cors());

User.sync()
  .then(() => {
    console.log("User table");
  })
  .catch((err) => {
    console.log(err);
  });

Message.sync()
  .then(() => {
    console.log("Message table");
  })
  .catch((err) => {
    console.log(err);
  });

// App setup
const PORT = 5000;
const ADDR = "127.0.0.1";

const server = app.listen(PORT, ADDR, () => {
  console.log("Server running");
});

const io = socket(server, { cors: { origin: "*", methods: ["GET", "POST"], credentials: true } });
io.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

io.on("connection", async (socket) => {
  socket.join("trollbox");
  console.log("connect");
  socket.on("user_join", async (user) => {
    console.log(`User joined ${JSON.stringify(user)}`);
    user.sockId = socket.id;
    socket.request.session.user = user;
    await utils.user_online(io, User, user, true);
    await utils.fetch_history(io, socket.id, User, Message);
  });

  socket.on("new_message", async (message) => {
    message.type = "text";
    message.timestamp = Date.now();
    await Message.create(message);
    io.to("trollbox").emit("recv_message", {author: await User.findOne({ where: { id: message.userId } }), ...message});
  });

  socket.on("disconnect", async () => {
    console.log("disconnect");
    delete socket;
  });
});
