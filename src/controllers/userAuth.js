const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserAuth = require("../models/userAuthenticationModel");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const verifyPassword = async (password, hash, res, objects) => {
    try {
      if (objects !== null) {
        const isPasswordValid = await bcrypt.compare(password, hash);
        console.log("async: ", objects);
        if (isPasswordValid) {
          res.json([true, objects]);
        } else {
          console.log(objects);
          res.json([false, null]);
        }
      } else {
        res.json(["email", null]);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  app.post("/api/user_auth/signup", function (req, res) {
    const body = req.body;

    hash = bcrypt.hashSync(body.password, salt);

    const signupObject = new UserAuth({
      userName: body.userName,
      email: body.email,
      password: hash,
    });

    UserAuth.findOne({ email: body.email })
      .then((objects) => {
        console.log(objects);
        if (objects === null) {
          signupObject
            .save()
            .then((savedNote) => savedNote.toJSON())
            .then((savedAndFormattedNote) => {
              //res.json(savedAndFormattedNote)
            })
            .catch((error) => next(error));
          res.json([true, signupObject]);
        } else {
          res.json(["name", null]);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });

  app.post("/api/user_auth/signin", function (req, res) {
    const body = req.body;
    UserAuth.findOne({ email: body.email })
      .then((objects) => {
        verifyPassword(body.password, objects.password, res, objects);
      })
      .catch((err) => {
        res.json(["name", null]);
      });
  });
};
