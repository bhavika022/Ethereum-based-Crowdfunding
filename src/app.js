const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const config = require("./utils/config");
const dbInterface = require("./controllers/dbInterface");
const userAuth = require("./controllers/userAuth");
const reqMiddleware = require("./middlewares/requestLogger");
const url = config.MONGODB_URI;

const startServer = async () => {
  const app = express();
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((result) => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
    });
  app.use(reqMiddleware.requestLogger);
  app.use(fileUpload());
  dbInterface(app);
  userAuth(app);
  app.listen(config.PORT, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Server is running on Port:", config.PORT);
  });
};

startServer();
