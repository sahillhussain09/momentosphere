const express = require("express");
const server = express();
const mongoose = require("mongoose");
const User = require("./routes/user");
const Post = require("./routes/post");
const cookieParser = require("cookie-parser");
require("dotenv").config()
const fileUploder = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const DB_URL = process.env.DB_URL;

const main = async () => {
  await mongoose.connect(DB_URL);
  console.log("databas connected to momentoSphere");
};
main().catch((err) => console.log(err));


// middelwares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(fileUploder({
  useTempFiles: true
}))
server.use(cors());

// rotes
server.use(User.router);
server.use(Post.router);

// Serve your frontend application (assuming it's in a "client" folder)
const frontendApp = path.join(__dirname, "frontend");
server.use(express.static(frontendApp));

//  Catch-all route for unmatched requests, send to frontend router
server.get("*", (req, res) => {
  res.sendFile(path.join(frontendApp, "index.html"));
})

server.listen(process.env.PORT, () => {
  console.log(`server running on this port number : ${process.env.PORT}`);
});
