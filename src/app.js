const express = require("express");
const logger = require("morgan");

const app = express();

require("./database/connection");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Configurações
app.set("port", process.env.PORT || 4003);

app.use(express.json());
//morgan
app.use(logger("dev"));

app.use("/users", require("./routes/users.routes"));
app.use("/posts", require("./routes/posts.routes"));

module.exports = app;
