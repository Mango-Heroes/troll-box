const express = require("express");
const session = require("express-session");
const socket = require("socket.io");

const utils = require("./app/utils");
const User = require("./model/user");
const Message = require("./model/message");

const app = express();
const sessionMiddleware = session({
  secret: "cr0ssf1t_is_da_h3at!",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
  resave: true,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

User.sync({ force: true })
  .then(() => {
    console.log("User table");
  })
  .catch((err) => {
    console.log(err);
  });

Message.sync({ force: true })
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

const io = socket(server);
io.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

io.on("connection", async (socket) => {
  socket.join("trollbox");
  socket.on("user_join", async (user) => {
    user.sockId = socket.id;
    socket.request.session.user = user;
    await utils.user_online(io, User, user, true);
    await utils.fetch_history(io, Message);
  });

  socket.on("new_message", async (message) => {
    await Message.create(message);
    io.to("trollbox").emit("recv_message", message);
  });

  socket.on("user_leave", async (user) => {
    socket.disconnect();
    await utils.user_online(io, User, user, false);
  });

  socket.on("disconnect", async () => {
    const user = socket.request.session.user;
    await utils.user_online(io, User, user, false);
  });
});
